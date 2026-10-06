/**
 * 浏览器端图片处理公共库（不依赖任何第三方服务）。
 * 所有函数都在本机内存里操作，绝不上传文件。
 */

export interface LoadedImage {
	file: File;
	bitmap: ImageBitmap;
	width: number;
	height: number;
}

export function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export async function loadImage(file: File): Promise<LoadedImage> {
	const bitmap = await createImageBitmap(file);
	return { file, bitmap, width: bitmap.width, height: bitmap.height };
}

export function isImage(file: File): boolean {
	return file.type.startsWith("image/");
}

/** 把图片画到 canvas，返回 blob；mime 不传则用原格式（透明图会退化为 PNG） */
export async function encode(
	img: LoadedImage,
	opts: {
		mime?: string;
		quality?: number;
		width?: number;
		height?: number;
		background?: string | null;
		maxBytes?: number;
	},
): Promise<Blob> {
	const width = Math.max(1, Math.round(opts.width ?? img.width));
	const height = Math.max(1, Math.round(opts.height ?? img.height));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("当前浏览器不支持 Canvas");
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	if (opts.background) {
		ctx.fillStyle = opts.background;
		ctx.fillRect(0, 0, width, height);
	}
	ctx.drawImage(img.bitmap, 0, 0, width, height);

	const mime = opts.mime || (supportsType("image/webp") && img.file.type === "image/webp" ? "image/webp" : img.file.type || "image/png");
	const quality = opts.quality ?? 0.82;

	let blob = await toBlob(canvas, mime, quality);
	// 指定了体积上限时，逐步降质重试（最多 5 次）
	if (opts.maxBytes && blob.size > opts.maxBytes && mime !== "image/png") {
		let q = quality;
		for (let i = 0; i < 5 && blob.size > opts.maxBytes && q > 0.35; i++) {
			q -= 0.12;
			blob = await toBlob(canvas, mime, q);
		}
	}
	return blob;
}

function toBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob((b) => (b ? resolve(b) : reject(new Error(`导出 ${mime} 失败`))), mime, quality);
	});
}

export function supportsType(mime: string): boolean {
	const c = document.createElement("canvas");
	c.width = c.height = 1;
	return c.toDataURL(mime).startsWith(`data:${mime}`);
}

export function download(blob: Blob, filename: string): void {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function replaceExt(name: string, ext: string): string {
	return name.replace(/\.[^.]+$/, "") + "." + ext.replace(/^\./, "");
}

export function extFor(mime: string): string {
	if (mime === "image/jpeg") return "jpg";
	if (mime === "image/webp") return "webp";
	if (mime === "image/avif") return "avif";
	return "png";
}

/** 简易拖拽区绑定：返回选中/拖入的文件列表回调 */
export function bindDropZone(zone: HTMLElement, input: HTMLInputElement, onFiles: (files: File[]) => void): void {
	zone.addEventListener("click", () => input.click());
	input.addEventListener("change", () => {
		if (input.files) onFiles([...input.files]);
		input.value = "";
	});
	for (const evt of ["dragenter", "dragover"]) {
		zone.addEventListener(evt, (e) => {
			e.preventDefault();
			zone.classList.add("dropzone--over");
		});
	}
	for (const evt of ["dragleave", "drop"]) {
		zone.addEventListener(evt, (e) => {
			e.preventDefault();
			zone.classList.remove("dropzone--over");
		});
	}
	zone.addEventListener("drop", (e) => {
		const dt = (e as DragEvent).dataTransfer;
		if (dt?.files?.length) onFiles([...dt.files]);
	});
}


/** 统一的文件行：缩略图 + 文件名 + 尺寸/结果 + 操作按钮容器 */
export interface RowParts {
	name: string;
	sizeText: string;
	thumbUrl?: string;
	note?: string;
	noteKind?: "ok" | "warn";
}

export function renderRow(parts: RowParts): HTMLLIElement {
	const li = document.createElement("li");
	const thumb = parts.thumbUrl
		? `<img class="thumb" src="${parts.thumbUrl}" alt="" />`
		: '<div class="thumb"></div>';
	li.innerHTML = `${thumb}
		<div class="meta">
			<div class="fname">${escapeHtml(parts.name)}</div>
			<div class="fsize">${parts.sizeText}</div>
			${parts.note ? `<div class="${parts.noteKind === "warn" ? "note-warn" : "note-ok"}">${escapeHtml(parts.note)}</div>` : ""}
		</div>
		<div class="ops"></div>`;
	return li;
}

export function opButton(
	label: string,
	kind: "primary" | "icon" | "danger" = "primary",
	onClick?: () => void,
): HTMLButtonElement {
	const b = document.createElement("button");
	b.textContent = label;
	b.className = kind === "primary" ? "btn-primary" : kind === "danger" ? "btn-icon danger" : "btn-icon";
	if (onClick) b.addEventListener("click", onClick);
	return b;
}

export function escapeHtml(s: string): string {
	return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);
}

/** 主按钮忙碌态：内嵌 spinner + 进度文案（本地处理很快，不放大进度条） */
export function setBusy(btn: HTMLButtonElement, text: string): void {
	if (!btn.dataset.idle) btn.dataset.idle = btn.textContent ?? "";
	btn.disabled = true;
	btn.innerHTML = `<span class="spinner"></span><span>${escapeHtml(text)}</span>`;
}

export function clearBusy(btn: HTMLButtonElement): void {
	btn.disabled = false;
	if (btn.dataset.idle) btn.textContent = btn.dataset.idle;
}
