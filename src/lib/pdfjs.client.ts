/**
 * PDF 渲染库（pdf.js）：只在真正需要「把 PDF 画成图」的工具里按需加载。
 * 合并 / 拆分这类只操作页面对象的工具用 pdf-lib 就够了，不碰这里。
 */
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

type PdfJs = typeof import("pdfjs-dist");

let pdfjsPromise: Promise<PdfJs> | null = null;

export function loadPdfJs(): Promise<PdfJs> {
	if (!pdfjsPromise) {
		pdfjsPromise = import("pdfjs-dist").then((mod) => {
			// worker 由 Vite 打包成站内资源，不走 CDN（离线也能用）
			mod.GlobalWorkerOptions.workerSrc = workerUrl;
			return mod;
		});
	}
	return pdfjsPromise;
}

export interface OpenedPdf {
	numPages: number;
	/** pdf.js 的 PDFDocumentProxy */
	doc: any;
}

export async function openPdf(bytes: ArrayBuffer): Promise<OpenedPdf> {
	const pdfjs = await loadPdfJs();
	// 传副本：pdf.js 会接管这块内存，原 buffer 留给我们自己用
	const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes.slice(0)) }).promise;
	return { numPages: doc.numPages, doc };
}

/** 把某一页渲染到 canvas（scale 越大越清晰、越慢） */
export async function renderPageToCanvas(open: OpenedPdf, pageNumber: number, scale: number): Promise<HTMLCanvasElement> {
	const page = await open.doc.getPage(pageNumber);
	const viewport = page.getViewport({ scale });
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.floor(viewport.width));
	canvas.height = Math.max(1, Math.floor(viewport.height));
	const ctx = canvas.getContext("2d")!;
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	await page.render({ canvasContext: ctx, canvas, viewport } as any).promise;
	page.cleanup();
	return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
	return new Promise((resolve, reject) =>
		canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("导出图片失败"))), mime, quality),
	);
}

/** 把 "1-3,5,8-10" 解析成 [1,2,3,5,8,9,10]（超出范围的会被裁掉） */
export function parsePageRanges(input: string, max: number): number[] {
	const out = new Set<number>();
	for (const part of input.split(/[,，\s]+/)) {
		if (!part) continue;
		const m = /^(\d+)\s*[-–~]\s*(\d+)$/.exec(part);
		if (m) {
			const a = Number(m[1]);
			const b = Number(m[2]);
			for (let i = Math.min(a, b); i <= Math.max(a, b); i++) if (i >= 1 && i <= max) out.add(i);
		} else if (/^\d+$/.test(part)) {
			const n = Number(part);
			if (n >= 1 && n <= max) out.add(n);
		}
	}
	return [...out].sort((a, b) => a - b);
}
