export interface ToolFaq {
	q: string;
	a: string;
}

export interface ToolMeta {
	slug: string;
	/** 页面 H1 */
	title: string;
	/** 导航/卡片标题 */
	short: string;
	/** meta description */
	description: string;
	/** 卡片上的一句话 */
	blurb: string;
	/** 图标（内联 SVG path） */
	icon: string;
	faq: ToolFaq[];
}

export const tools: ToolMeta[] = [
	{
		slug: "compress-image",
		title: "图片压缩 — 在浏览器里压缩 JPG / PNG / WebP",
		short: "图片压缩",
		description:
			"免费在线图片压缩工具：把 JPG、PNG、WebP 压到更小的体积，可调画质、支持批量。所有处理都在你的浏览器里完成，图片不会上传到任何服务器。",
		blurb: "可调画质批量压缩，体积最多能减 80%",
		icon: "M4 4h16v16H4z M9 13l2.5-3 2 2.5L16 9l3 5z",
		faq: [
			{
				q: "图片会上传到服务器吗？",
				a: "不会。压缩完全在浏览器里用 Canvas 完成，你的图片自始至终都在本机内存中，网页也没有任何上传接口。断网状态下同样可用。",
			},
			{
				q: "压缩后画质会变差吗？",
				a: "有损格式（JPG / WebP）会按你设定的画质重新编码，画质越高体积越大。推荐从 80% 开始试；如果原图已经是 WebP，可先试无损模式。",
			},
			{
				q: "能一次压缩多张吗？",
				a: "可以，一次选中多张即可，每张都会显示压缩前后的体积对比，可单张下载。",
			},
		],
	},
	{
		slug: "convert-image",
		title: "图片格式转换 — JPG / PNG / WebP 互转",
		short: "格式转换",
		description:
			"在线图片格式转换：JPG、PNG、WebP 互转，可选背景色与画质。纯浏览器本地转换，不上传文件，支持透明通道与批量处理。",
		blurb: "JPG / PNG / WebP 互转，可保留透明通道",
		icon: "M4 7h7v10H4z M13 7h7v10h-7z M11 12h2",
		faq: [
			{
				q: "转换成 WebP 有什么好处？",
				a: "在同等画质下 WebP 通常比 JPG 小 25%~35%，比 PNG 小得更多，而且支持透明通道。现在所有现代浏览器都支持 WebP。",
			},
			{
				q: "PNG 转 JPG 后透明背景变黑了？",
				a: "JPG 不支持透明。转换时请在「背景色」里选白色或其它颜色，透明区域会被填充成该颜色。",
			},
			{
				q: "能转成 AVIF 吗？",
				a: "能否导出 AVIF 取决于你的浏览器是否支持该编码（Chrome、Edge 新版支持）。不支持时按钮会提示，可改用 WebP。",
			},
		],
	},
	{
		slug: "resize-image",
		title: "图片缩放 — 按像素或百分比调整尺寸",
		short: "图片缩放",
		description:
			"在线调整图片尺寸：按宽度、高度或百分比缩放，锁定比例不变形，批量处理并导出。全部在浏览器本地完成，不上传图片。",
		blurb: "锁定宽高比，按像素或百分比缩放",
		icon: "M4 4h9v9H4z M11 11h9v9h-9z",
		faq: [
			{
				q: "放大图片会变清晰吗？",
				a: "不会。放大只是把像素拉大，细节无法凭空产生，放得越大越糊。需要高质量放大请用专门的 AI 超分工具。",
			},
			{
				q: "怎么保持比例不变形？",
				a: "默认勾选「锁定宽高比」，改动宽度时高度会自动按原比例计算，反之亦然。",
			},
			{
				q: "批量缩放的尺寸规则是什么？",
				a: "批量时按你填的规则逐张应用（例如「宽 1280，高度自动」），每张都保持各自的长宽比。",
			},
		],
	},
	{
		slug: "image-to-pdf",
		title: "图片转 PDF — 多张图片合并成一个 PDF",
		short: "图片转 PDF",
		description:
			"免费把多张图片合成一个 PDF：可调整顺序、选择页面尺寸与边距、自动适配横竖图。纯浏览器本地生成，图片不上传，适合证件、扫描件、合同。",
		blurb: "多图合成 PDF，可排序、可设页面尺寸",
		icon: "M6 3h8l4 4v14H6z M14 3v5h5",
		faq: [
			{
				q: "生成的 PDF 会上传吗？",
				a: "不会。PDF 在你浏览器里用 pdf-lib 直接生成，图片与成品都只存在于本机内存，不存在上传环节。",
			},
			{
				q: "怎么让每页尺寸贴合图片？",
				a: "页面尺寸选「跟随图片」即可：横图会生成横向页、竖图生成纵向页，不留白边。",
			},
			{
				q: "支持扫描件 / 证件照吗？",
				a: "支持常见图片格式（JPG、PNG、WebP）。扫描件通常是 JPG，直接选中多张按顺序合成即可，也可调整顺序后再生成。",
			},
		],
	},
];

export const toolBySlug = (slug: string) => tools.find((t) => t.slug === slug);
