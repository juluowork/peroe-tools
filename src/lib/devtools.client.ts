/**
 * 开发类工具的共享小工具：纯文本进出，没有文件上传。
 */

export function downloadText(name: string, text: string, mime = "text/plain") {
	const blob = new Blob([text], { type: `${mime};charset=utf-8` });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function copyText(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		// 老浏览器 / 无权限时的兜底
		try {
			const ta = document.createElement("textarea");
			ta.value = text;
			ta.style.position = "fixed";
			ta.style.opacity = "0";
		document.body.appendChild(ta);
			ta.select();
			const ok = document.execCommand("copy");
			ta.remove();
			return ok;
		} catch {
			return false;
		}
	}
}

export function bindCopy(btn: HTMLButtonElement, getText: () => string, copied: string, idle: string) {
	btn.addEventListener("click", async () => {
		const ok = await copyText(getText());
		btn.textContent = ok ? copied : idle;
		setTimeout(() => (btn.textContent = idle), 1400);
	});
}

export function bytesToHex(buf: ArrayBuffer): string {
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function formatCount(n: number): string {
	return n.toLocaleString("en-US");
}

/** UTF-8 安全的 Base64 编码 */
export function toBase64(text: string, urlSafe = false): string {
	const bytes = new TextEncoder().encode(text);
	let bin = "";
	for (const b of bytes) bin += String.fromCharCode(b);
	let b64 = btoa(bin);
	if (urlSafe) b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	return b64;
}

/** UTF-8 安全的 Base64 解码（非法输入抛错） */
export function fromBase64(b64: string): string {
	let s = b64.trim().replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
	while (s.length % 4) s += "=";
	const bin = atob(s);
	const bytes = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
	return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

/**
 * MD5（RFC 1321）。
 * WebCrypto 不提供 MD5，但校验老系统、刷新缓存、对接老接口时又常要它，所以内置一份。
 * ⚠️ 这里踩过一个坑：用稀疏数组装 32 位字时，**空洞位置读出的是 undefined**，
 * 参与 add() 会得到 NaN，整个摘要就错了 —— 所以必须先补齐为 0 再进入主循环。
 */
export function md5(input: string): string {
	const bytes = new TextEncoder().encode(input);
	const n = bytes.length;
	const words: number[] = [];
	for (let i = 0; i < n; i++) words[i >> 2] = (words[i >> 2] || 0) | (bytes[i] << ((i % 4) * 8));
	words[n >> 2] = (words[n >> 2] || 0) | (0x80 << ((n % 4) * 8));
	words[(((n + 8) >> 6) + 1) * 16 - 2] = n * 8;
	// 关键：把中间的空洞补成 0
	for (let i = 0; i < words.length; i++) if (words[i] === undefined) words[i] = 0;

	const rol = (x: number, c: number) => (x << c) | (x >>> (32 - c));
	const add = (a: number, b: number) => {
		const lsw = (a & 0xffff) + (b & 0xffff);
		const msw = (a >> 16) + (b >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xffff);
	};
	const cmn = (q: number, a: number, b: number, x: number, s: number, t: number) =>
		add(rol(add(add(a, q), add(x, t)), s), b);
	const ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
		cmn((b & c) | (~b & d), a, b, x, s, t);
	const gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
		cmn((b & d) | (c & ~d), a, b, x, s, t);
	const hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
		cmn(b ^ c ^ d, a, b, x, s, t);
	const ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
		cmn(c ^ (b | ~d), a, b, x, s, t);

	let a = 1732584193,
		b = -271733879,
		c = -1732584194,
		d = 271733878;

	for (let i = 0; i < words.length; i += 16) {
		const oa = a,
			ob = b,
			oc = c,
			od = d;
		a = ff(a, b, c, d, words[i + 0], 7, -680876936);
		d = ff(d, a, b, c, words[i + 1], 12, -389564586);
		c = ff(c, d, a, b, words[i + 2], 17, 606105819);
		b = ff(b, c, d, a, words[i + 3], 22, -1044525330);
		a = ff(a, b, c, d, words[i + 4], 7, -176418897);
		d = ff(d, a, b, c, words[i + 5], 12, 1200080426);
		c = ff(c, d, a, b, words[i + 6], 17, -1473231341);
		b = ff(b, c, d, a, words[i + 7], 22, -45705983);
		a = ff(a, b, c, d, words[i + 8], 7, 1770035416);
		d = ff(d, a, b, c, words[i + 9], 12, -1958414417);
		c = ff(c, d, a, b, words[i + 10], 17, -42063);
		b = ff(b, c, d, a, words[i + 11], 22, -1990404162);
		a = ff(a, b, c, d, words[i + 12], 7, 1804603682);
		d = ff(d, a, b, c, words[i + 13], 12, -40341101);
		c = ff(c, d, a, b, words[i + 14], 17, -1502002290);
		b = ff(b, c, d, a, words[i + 15], 22, 1236535329);
		a = gg(a, b, c, d, words[i + 1], 5, -165796510);
		d = gg(d, a, b, c, words[i + 6], 9, -1069501632);
		c = gg(c, d, a, b, words[i + 11], 14, 643717713);
		b = gg(b, c, d, a, words[i + 0], 20, -373897302);
		a = gg(a, b, c, d, words[i + 5], 5, -701558691);
		d = gg(d, a, b, c, words[i + 10], 9, 38016083);
		c = gg(c, d, a, b, words[i + 15], 14, -660478335);
		b = gg(b, c, d, a, words[i + 4], 20, -405537848);
		a = gg(a, b, c, d, words[i + 9], 5, 568446438);
		d = gg(d, a, b, c, words[i + 14], 9, -1019803690);
		c = gg(c, d, a, b, words[i + 3], 14, -187363961);
		b = gg(b, c, d, a, words[i + 8], 20, 1163531501);
		a = gg(a, b, c, d, words[i + 13], 5, -1444681467);
		d = gg(d, a, b, c, words[i + 2], 9, -51403784);
		c = gg(c, d, a, b, words[i + 7], 14, 1735328473);
		b = gg(b, c, d, a, words[i + 12], 20, -1926607734);
		a = hh(a, b, c, d, words[i + 5], 4, -378558);
		d = hh(d, a, b, c, words[i + 8], 11, -2022574463);
		c = hh(c, d, a, b, words[i + 11], 16, 1839030562);
		b = hh(b, c, d, a, words[i + 14], 23, -35309556);
		a = hh(a, b, c, d, words[i + 1], 4, -1530992060);
		d = hh(d, a, b, c, words[i + 4], 11, 1272893353);
		c = hh(c, d, a, b, words[i + 7], 16, -155497632);
		b = hh(b, c, d, a, words[i + 10], 23, -1094730640);
		a = hh(a, b, c, d, words[i + 13], 4, 681279174);
		d = hh(d, a, b, c, words[i + 0], 11, -358537222);
		c = hh(c, d, a, b, words[i + 3], 16, -722521979);
		b = hh(b, c, d, a, words[i + 6], 23, 76029189);
		a = hh(a, b, c, d, words[i + 9], 4, -640364487);
		d = hh(d, a, b, c, words[i + 12], 11, -421815835);
		c = hh(c, d, a, b, words[i + 15], 16, 530742520);
		b = hh(b, c, d, a, words[i + 2], 23, -995338651);
		a = ii(a, b, c, d, words[i + 0], 6, -198630844);
		d = ii(d, a, b, c, words[i + 7], 10, 1126891415);
		c = ii(c, d, a, b, words[i + 14], 15, -1416354905);
		b = ii(b, c, d, a, words[i + 5], 21, -57434055);
		a = ii(a, b, c, d, words[i + 12], 6, 1700485571);
		d = ii(d, a, b, c, words[i + 3], 10, -1894986606);
		c = ii(c, d, a, b, words[i + 10], 15, -1051523);
		b = ii(b, c, d, a, words[i + 1], 21, -2054922799);
		a = ii(a, b, c, d, words[i + 8], 6, 1873313359);
		d = ii(d, a, b, c, words[i + 15], 10, -30611744);
		c = ii(c, d, a, b, words[i + 6], 15, -1560198380);
		b = ii(b, c, d, a, words[i + 13], 21, 1309151649);
		a = ii(a, b, c, d, words[i + 4], 6, -145523070);
		d = ii(d, a, b, c, words[i + 11], 10, -1120210379);
		c = ii(c, d, a, b, words[i + 2], 15, 718787259);
		b = ii(b, c, d, a, words[i + 9], 21, -343485551);
		a = add(a, oa);
		b = add(b, ob);
		c = add(c, oc);
		d = add(d, od);
	}
	const hex = (x: number) => {
		let s = "";
		for (let i = 0; i < 4; i++) s += ((x >> (i * 8 + 4)) & 0x0f).toString(16) + ((x >> (i * 8)) & 0x0f).toString(16);
		return s;
	};
	return hex(a) + hex(b) + hex(c) + hex(d);
}
