import type { SiteCopy, ToolCopy } from "./types";

const privacy = "Processed in your browser — your files are never uploaded.";
const uiCommon = {
	selectFiles: "Select files",
	orDrop: "or drop them here",
	startOver: "Start over",
	addMore: "Add more files",
	download: "Download",
	downloadAll: "Download all",
	working: "Working…",
	remove: "Remove",
};

export const site: SiteCopy = {
	lang: "en",
	brand: "peroe tools",
	tagline: "Private image & PDF tools that run in your browser",
	homeTitle: "Free Online Image & PDF Tools — No Upload, No Sign-up",
	homeDescription:
		"Compress, convert, resize images and turn photos into PDF right in your browser. Your files never leave your device: no uploads, no accounts, no watermarks, no limits.",
	homeH1: "Image & PDF tools that never upload your files",
	homeLead:
		"Every tool on this site runs inside your browser. Pick a file, get your result — nothing is sent to a server, nothing is stored, and it still works offline.",
	homeWhyTitle: "Why local processing matters",
	homeWhy: [
		"Most online converters ask you to upload your file first. That is fine for a meme, but a contract, a passport scan, a medical report or an unreleased design is a different story — once uploaded, you no longer control where it lives or how long it is kept.",
		"These tools take the other path: the encoding happens in your browser using Canvas and WebAssembly, so your file only ever exists in your device memory and disappears when you close the tab. That is not a promise in a privacy policy — it is a property of the architecture. This site has no endpoint that accepts uploads.",
	],
	homeFaq: [
		{
			q: "Is it really processed locally?",
			a: "Yes. The pages contain no upload code; compression and conversion run through browser APIs. You can verify it yourself in DevTools: open the Network panel and confirm there is no request carrying your file.",
		},
		{
			q: "Are there limits on file size or number of files?",
			a: "No artificial limits. The only ceiling is your device memory — a few hundred megabytes of images is usually fine. For very large batches, work in groups of 20-30 files.",
		},
		{
			q: "Does it work on mobile and offline?",
			a: "Both. The layout adapts to phones, and since all processing is local, the tools keep working with no network connection once the page has loaded.",
		},
		{
			q: "Do you add watermarks or require an account?",
			a: "Never. There is no sign-up, no watermark, no file count limit and no paid tier hiding behind the button.",
		},
	],
	howTitle: "How it works",
	stepsTitle: "How to use it",
	faqTitle: "Frequently asked questions",
	toolsTitle: "All tools",
	navLabel: "Tools",
	switchLabel: "中文",
	switchHref: "/zh/",
	badges: ["100% local", "No upload", "No sign-up", "Works offline"],
	footerNote: "Files are processed on your device and never uploaded.",
	footerLinks: [{ label: "Blog", href: "https://blog.peroe.cn/" }],
	privacyLine: "No cookies, no tracking pixels, no accounts.",
	navAllTools: "All tools",
	navCategories: "Categories",
	categoriesPageTitle: "Tool Categories — Image, PDF and More",
	categoriesPageDescription:
		"Browse peroe tools by category: image utilities, PDF utilities, and the developer, text and network tools that are on the way. Everything runs locally in your browser.",
	categoriesPageH1: "Categories",
	categoriesPageLead: "Pick a category to see every tool inside it. Everything runs locally — no uploads, no account.",
	categoriesToolsLabel: "tools",
	searchPlaceholder: "Search tools — try “pdf”, “webp”, “resize”…",
	searchEmpty: "No tool matches that. Browse the categories below.",
	toolsPageTitle: "All Tools — Free Image, PDF & Developer Utilities",
	toolsPageDescription:
		"Every tool on peroe tools in one place: compress and convert images, build PDFs, plus developer and text utilities as they ship. All run locally in your browser.",
	toolsPageH1: "All tools",
	toolsPageLead:
		"Everything runs in your browser, so nothing is uploaded. Use the search box or jump to a category.",
	relatedTitle: "Related tools",
	contactLabel: "Contact",
	email: "juluo@juluo.work",
	toolCountLabel: "{n} tools",
	categories: [
		{
			id: "image",
			name: "Image",
			blurb: "Compress, convert and resize pictures without uploading them.",
			h1: "Image tools that never upload your pictures",
			metaTitle: "Image Tools — Compress, Convert & Resize Without Uploading",
			metaDescription:
				"Free image tools that run entirely in your browser: compress JPG/PNG/WebP, convert formats, and resize by pixels or percent. Nothing is uploaded, no sign-up.",
			intro: [
				"Photos, screenshots, scanned documents and design exports all need the same three things sooner or later: a smaller file, a different format, and the right dimensions. These tools do exactly that — and unlike most online converters, your image never leaves your device.",
				"The processing happens in your browser through Canvas and WebAssembly, so a passport scan, a client contract or an unreleased mock-up stays on your machine. Re-encoding drops EXIF metadata (including GPS coordinates) as a side effect, which is usually what you want before publishing.",
				"Typical results: photos shrink 40-70% at 80% quality, switching to WebP adds another 25-35%, and resizing a 4000px photo to the 1600px you actually display removes roughly six times the bytes.",
			],
			faq: [
				{
					q: "Which image formats are supported?",
					a: "Anything your browser can decode — in practice JPG, PNG, WebP, AVIF, GIF and BMP on modern browsers, plus HEIC on Safari. Output is limited to what the browser can encode: JPG, PNG, WebP and AVIF.",
				},
				{
					q: "Is there a file size or usage limit?",
					a: "No. There is no upload, no queue and no account, so the only limit is your device memory. Dozens of photos can be processed in one batch.",
				},
				{
					q: "Does compressing remove location data?",
					a: "Yes. Re-encoding through Canvas strips EXIF, including GPS coordinates. Keep the original file if you need that metadata.",
				},
			],
		},
		{
			id: "pdf",
			name: "PDF",
			blurb: "Build and edit PDF documents from your own files, locally.",
			h1: "PDF tools that keep your documents on your device",
			metaTitle: "PDF Tools — Build PDFs From Images Locally, No Upload",
			metaDescription:
				"Free PDF tools that run in your browser: combine photos and scans into one ordered PDF, choose A4, Letter or image-sized pages, add margins. Files are never uploaded.",
			intro: [
				"PDF is what you send when a document has to look the same everywhere: receipts for an expense claim, scans for an application, photos of a whiteboard for a client. Doing that conversion locally matters because these are exactly the files you would rather not hand to a stranger's server.",
				"Pages are embedded from your original pixels, so quality depends on your source images — 200-300 DPI scans for anything with text you need to read. Image-sized pages avoid white borders on mixed portrait and landscape sets, while A4 or Letter suits printing and mixing with other documents.",
				"Everything here works the same way: pages are handled by your own browser, with no upload and no account. Merge several PDFs, split or extract page ranges, render pages as JPG/PNG/WebP, and shrink scanned documents — all in this category. Watermarks, page numbers and text extraction are next.",
			],
			faq: [
				{
					q: "Is it safe for ID documents, contracts and invoices?",
					a: "Yes — that is the point of doing it locally. The images and the generated PDF exist only in your browser memory, the page has no upload endpoint, and it keeps working with the network switched off.",
				},
				{
					q: "What page sizes can I use?",
					a: "Match each image (no borders, best for mixed orientation), A4, or Letter, with an optional margin in points.",
				},
				{
					q: "Which image formats can go into the PDF?",
					a: "JPG and PNG are embedded directly; WebP, AVIF, GIF and anything else the browser can decode is converted to PNG first, then embedded.",
				},
			],
		},
		{ id: "convert", name: "Converters", blurb: "Move data between formats: units, encodings, file types.", h1: "", metaTitle: "", metaDescription: "", intro: [], faq: [] },
		{ id: "dev", name: "Developer", blurb: "Everyday utilities for coding: JSON, Base64, regex, timestamps.", h1: "", metaTitle: "", metaDescription: "", intro: [], faq: [] },
		{ id: "text", name: "Text", blurb: "Clean up, count, compare and transform text.", h1: "", metaTitle: "", metaDescription: "", intro: [], faq: [] },
		{ id: "web", name: "Web & network", blurb: "Inspect URLs, headers, DNS and certificates.", h1: "", metaTitle: "", metaDescription: "", intro: [], faq: [] },
	],
};

export const tools: ToolCopy[] = [
	{
		slug: "compress-image",
		category: "image",
		keywords: ["compress", "compress image", "reduce file size", "optimize", "shrink", "jpg", "jpeg", "png", "webp", "photo", "压缩", "图片压缩"],
		icon: "M4 4h16v16H4z M9 13l2.5-3 2 2.5L16 9l3 5z",
		accent: "#2563eb",
		nav: "Compress",
		h1: "Compress images without uploading them",
		metaTitle: "Compress JPG, PNG & WebP Images Online — Free, No Upload",
		metaDescription:
			"Free image compressor that runs in your browser: shrink JPG, PNG and WebP files, set a target size, batch process and download. Files are never uploaded.",
		blurb: "Shrink JPG / PNG / WebP by up to 80%, batch friendly",
		lead: "Reduce file size with a quality slider or a target size in KB. Everything happens on your device, so even private photos never leave it.",
		steps: [
			"Drop in one or many images (JPG, PNG, WebP or anything your browser can decode).",
			"Pick an output format and a quality level — or type a target size in KB.",
			"Compare before/after sizes and download the ones you want. Nothing is queued on a server.",
		],
		notes: [
			{
				title: "What each setting does",
				body: "Quality controls the encoder: 80% is usually visually identical to the original while cutting 40-60% of the bytes. A target size keeps re-encoding at lower quality until the file fits (up to 5 attempts), which is handy for upload forms with hard limits.",
			},
			{
				title: "Choosing the right format",
				body: "WebP wins for photos and screenshots with transparency; JPG is the most compatible but has no alpha channel; PNG stays lossless and is best for flat graphics, icons and line art.",
			},
			{
				title: "If the result gets bigger",
				body: "Re-encoding an already optimised PNG can produce a larger file — lossless compression has nothing left to squeeze. When that happens this tool keeps your original and tells you, instead of handing you a worse file.",
			},
		],
		faq: [
			{
				q: "Are my images uploaded anywhere?",
				a: "No. Compression runs in your browser with Canvas, so the image stays in local memory. There is no upload endpoint in the page at all, and it works with the network disconnected.",
			},
			{
				q: "How much smaller will my files get?",
				a: "Photos typically shrink 40-70% at 80% quality, and up to 80% when you also switch to WebP. PNG screenshots with few colours can shrink even more; already-optimised PNGs may not shrink at all.",
			},
			{
				q: "Can I compress many images at once?",
				a: "Yes — select or drop as many as you like. Each file is processed independently and shows its own before/after size with a download button.",
			},
			{
				q: "Will metadata such as EXIF be kept?",
				a: "No. Re-encoding through Canvas drops EXIF data, including GPS coordinates. That is usually what you want for images you publish, but keep the original if the metadata matters.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop images here, or click to choose",
			format: "Output format",
			formatKeep: "Keep original",
			formatWebp: "WebP (smallest)",
			formatJpg: "JPG",
			formatPng: "PNG (lossless)",
			quality: "Quality",
			targetSize: "Target size (KB, optional)",
			run: "Compress images",
			notSmaller: "already optimal, original kept",
			saved: "saved",
			failed: "Failed",
		},
	},
	{
		slug: "convert-image",
		category: "image",
		keywords: ["convert", "image converter", "jpg", "jpeg", "png", "webp", "avif", "heic", "format", "transparency", "alpha", "格式转换", "转格式"],
		icon: "M4 7h7v10H4z M13 7h7v10h-7z M11 12h2",
		accent: "#7c3aed",
		nav: "Convert",
		h1: "Convert images between JPG, PNG, WebP and AVIF",
		metaTitle: "Image Converter — JPG, PNG, WebP & AVIF, Runs Offline",
		metaDescription:
			"Convert images to JPG, PNG, WebP or AVIF in your browser. Keep or flatten transparency, choose quality, batch convert — no upload, no registration.",
		blurb: "JPG / PNG / WebP / AVIF conversion with alpha handling",
		lead: "Switch formats without sending anything to a server. Transparency handling and quality are under your control.",
		steps: [
			"Add the images you want to convert.",
			"Choose the target format — and a background colour if you are flattening transparency into JPG.",
			"Convert and download. Files that were never uploadable in the first place stay private.",
		],
		notes: [
			{
				title: "Which format should you pick?",
				body: "WebP is the best default: 25-35% smaller than JPG at the same visual quality, with alpha support. Use JPG only when a legacy tool demands it. Keep PNG for icons and screenshots. AVIF compresses best of all, but encoding is slower and very old software cannot open it.",
			},
			{
				title: "Transparency rules",
				body: "PNG, WebP and AVIF can hold an alpha channel; JPG cannot. Converting a transparent PNG to JPG fills the empty area with the background colour you choose (white by default), so pick a colour that matches where the image will be placed.",
			},
		],
		faq: [
			{
				q: "Does converting to WebP lose quality?",
				a: "At 88% and above the difference is invisible in practice, while the file gets noticeably smaller. If you need a mathematically lossless file, stay on PNG.",
			},
			{
				q: "My transparent PNG turned black in JPG — why?",
				a: "JPG has no alpha channel, so transparent pixels have to become some colour. Set the background colour option to white (or any colour) before converting and the result will look right.",
			},
			{
				q: "Can it convert HEIC photos from an iPhone?",
				a: "Safari on iOS can decode HEIC, so conversion works there. Most desktop browsers cannot decode HEIC yet — if the format is unsupported, export as JPG from Photos first.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop images here, or click to choose",
			target: "Convert to",
			background: "Background for transparency",
			bgKeep: "Keep transparent (PNG/WebP)",
			bgWhite: "White",
			bgBlack: "Black",
			quality: "Quality",
			run: "Convert images",
			avifOk: "Your browser can encode AVIF.",
			avifNo: "Your browser cannot encode AVIF — use WebP instead (similar size).",
			failed: "Failed",
		},
	},
	{
		slug: "resize-image",
		category: "image",
		keywords: ["resize", "resize image", "scale", "dimensions", "width", "height", "aspect ratio", "crop", "缩放", "改尺寸", "图片尺寸"],
		icon: "M4 4h9v9H4z M11 11h9v9h-9z",
		accent: "#0891b2",
		nav: "Resize",
		h1: "Resize images by pixels or percentage",
		metaTitle: "Resize Image Online — Change Dimensions, Keep Aspect Ratio",
		metaDescription:
			"Resize photos and screenshots by width, height or percentage while keeping the aspect ratio. Batch resize and download — processed locally, never uploaded.",
		blurb: "Set width, height or a percentage; ratio stays locked",
		lead: "Make images fit a form, a layout or a social profile. Enter one dimension and the other follows the original ratio.",
		steps: [
			"Add the images you want to resize.",
			"Enter a width, a height, or a percentage — leave the rest to the ratio lock.",
			"Resize and download. For batches, fill in a single dimension so each image keeps its own proportions.",
		],
		notes: [
			{
				title: "Downscaling is where the wins are",
				body: "A 4000px camera photo displayed at 1600px wastes roughly 6× the bytes. Resizing to the size you actually display, then compressing, usually beats compression alone.",
			},
			{
				title: "Upscaling does not add detail",
				body: "Enlarging just stretches existing pixels, so edges soften. If you truly need a larger image, use a dedicated AI upscaler instead of this tool.",
			},
		],
		faq: [
			{
				q: "Will my image be stretched?",
				a: "Only if you switch the ratio lock off and give both a width and a height. With the lock on (the default), the second dimension is calculated from the original proportions.",
			},
			{
				q: "How does batch resizing decide each size?",
				a: "The rule you type is applied to every file. Fill in width only and each image is scaled to that width with its own height; the same logic applies if you only fill in height.",
			},
			{
				q: "Does resizing also compress the file?",
				a: "Yes, indirectly — fewer pixels means fewer bytes. For the smallest possible result, resize first and then run the image through the compressor.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop images here, or click to choose",
			width: "Width (px)",
			height: "Height (px)",
			percent: "Or scale by (%)",
			lock: "Keep aspect ratio",
			lockYes: "Yes (recommended)",
			lockNo: "No (may distort)",
			run: "Resize images",
			needValue: "Enter a width, a height or a percentage first.",
			failed: "Failed",
		},
	},
	{
		slug: "image-to-pdf",
		category: "pdf",
		keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photos to pdf", "scan to pdf", "merge images", "a4", "图片转pdf", "照片转pdf", "合并pdf"],
		icon: "M6 3h8l4 4v14H6z M14 3v5h5",
		accent: "#dc2626",
		nav: "To PDF",
		h1: "Turn images into a PDF — without uploading them",
		metaTitle: "Image to PDF Converter — Combine Photos Locally, No Upload",
		metaDescription:
			"Combine JPG, PNG or WebP images into a single PDF in your browser. Reorder pages, choose A4, Letter or image-sized pages, add margins — nothing is uploaded.",
		blurb: "Merge photos, scans or receipts into one ordered PDF",
		lead: "Build a PDF from photos, scans or receipts. Because the file is assembled locally, this is safe for ID documents, contracts and invoices.",
		steps: [
			"Add the images — the list order becomes the page order, and you can move or remove any page.",
			"Choose a page size (image-sized avoids white borders on mixed portrait/landscape sets).",
			"Generate the PDF and download it. Nothing was sent anywhere.",
		],
		notes: [
			{
				title: "Image-sized pages vs A4",
				body: "Image-sized pages make each page exactly as large as its image, so there are no margins. A4 or Letter is what you want when the PDF will be printed or mixed with other documents, but portrait scans on a landscape page will leave space.",
			},
			{
				title: "Good source images matter",
				body: "PDF pages here embed the original pixels, so scan at 200-300 DPI for text you need to read. Compressing images before converting keeps the final PDF small — you can do that with the compressor on this site.",
			},
		],
		faq: [
			{
				q: "Is it safe to convert a passport or contract here?",
				a: "Yes — that is exactly why this tool exists. Images and the generated PDF exist only in your browser memory; the page has no upload endpoint, and it works with the network switched off.",
			},
			{
				q: "Can I control the page order?",
				a: "Yes. Every item in the list has up/down buttons, and the order you see is the order of the pages in the PDF.",
			},
			{
				q: "What image formats can I use?",
				a: "JPG and PNG are embedded directly. WebP, AVIF, GIF and anything else your browser can decode is converted to PNG on the fly, then embedded.",
			},
			{
				q: "Is there a page limit?",
				a: "The practical limit is your device memory. A few hundred pages of phone photos is usually fine; generate in batches if a document gets very large.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop images here (first file = first page)",
			pageSize: "Page size",
			sizeAuto: "Match each image",
			sizeA4: "A4",
			sizeLetter: "Letter",
			margin: "Margin (pt)",
			filename: "File name",
			run: "Create PDF",
			generating: "Generating PDF…",
			generated: "PDF ready",
			pages: "pages",
			page: "Page",
			failed: "Failed",
		},
	},
	{
		slug: "merge-pdf",
		category: "pdf",
		keywords: ["merge pdf", "combine pdf", "join pdf", "append pdf", "merge pdf files", "合并pdf", "pdf合并", "拼接pdf"],
		icon: "merge",
		accent: "#dc2626",
		nav: "Merge PDF",
		h1: "Merge PDF files without uploading them",
		metaTitle: "Merge PDF Files Online — Combine PDFs Locally, No Upload",
		metaDescription:
			"Combine several PDF files into one in your browser: drag to reorder, see page counts, then download. Contracts and scans never leave your device.",
		blurb: "Join several PDFs into one, in any order",
		lead: "Drop two or more PDFs, drag them into the order you want, and get a single document. Merging happens on your device, so confidential paperwork stays private.",
		steps: [
			"Add two or more PDF files — the list order becomes the page order.",
			"Move files up or down until the sequence is right; each one shows its page count.",
			"Merge and download one combined PDF.",
		],
		notes: [
			{
				title: "What happens to the original pages",
				body: "Pages are copied as page objects, not re-rendered, so text stays selectable, links and bookmarks survive, and quality is untouched. Only page order changes.",
			},
			{
				title: "Encrypted and unusual files",
				body: "A PDF that requires a password cannot be read — remove the protection first. Files that use exotic compression may fail to load; the page count will show as unreadable if so.",
			},
		],
		faq: [
			{
				q: "Are my contracts and scans uploaded?",
				a: "No. The merge runs in your browser with pdf-lib; the files exist only in local memory and there is no upload endpoint on the page.",
			},
			{
				q: "Can I control the order of the documents?",
				a: "Yes — each file has up/down buttons, and the list order is exactly the page order of the result.",
			},
			{
				q: "Is there a limit on file count or size?",
				a: "No server limit; the practical ceiling is your device memory. Merging a dozen 20 MB documents is usually fine.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop PDF files here (two or more)",
			run: "Merge PDFs",
			merged: "Merged PDF ready",
			pages: "pages",
			unreadable: "unreadable (password protected?)",
			failed: "Failed",
		},
	},
	{
		slug: "split-pdf",
		category: "pdf",
		keywords: ["split pdf", "extract pdf pages", "pdf page range", "separate pdf", "delete pdf pages", "拆分pdf", "提取pdf页面", "pdf分页"],
		icon: "split",
		accent: "#dc2626",
		nav: "Split PDF",
		h1: "Split a PDF or extract just the pages you need",
		metaTitle: "Split PDF Online — Extract Page Ranges Locally, No Upload",
		metaDescription:
			"Extract pages or ranges from a PDF in your browser: type 1-3, 5, 8-10 and get a new file — or export every page as its own PDF. Nothing is uploaded.",
		blurb: "Pull out page ranges, or one PDF per page",
		lead: "Cut a 40-page scan down to the three pages someone actually asked for. Choose a range, or split every page into its own file.",
		steps: [
			"Add one PDF and check the page count shown next to it.",
			"Type the pages you want (for example 1-3, 5, 8-10) and pick one file or one file per page.",
			"Generate and download — a single PDF, or a list you can grab one by one.",
		],
		notes: [
			{
				title: "Range syntax",
				body: "Commas separate groups, a dash means a range: 1-3, 5, 8-10 keeps pages 1, 2, 3, 5, 8, 9 and 10 in that order. Leave it empty to take every page.",
			},
			{
				title: "Extracting is lossless",
				body: "Pages are copied as-is, so text stays searchable and images keep their original resolution. Nothing is re-compressed.",
			},
		],
		faq: [
			{
				q: "Can I delete pages this way?",
				a: "Yes — the inverse of extraction. List the pages you want to keep and the rest are dropped.",
			},
			{
				q: "Do the extracted pages stay in the order I typed?",
				a: "They are sorted in ascending page order, which is what you almost always want for a printable document.",
			},
			{
				q: "Can I split a password-protected PDF?",
				a: "Not while it is locked. Remove the password in your PDF reader first, then split it here.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop one PDF here",
			range: "Pages to keep",
			mode: "Output",
			modeOne: "One PDF with those pages",
			modeEach: "One PDF per page",
			filename: "File name",
			run: "Split PDF",
			done: "Done",
			pages: "pages",
			badRange: "No valid pages in that range.",
			unreadable: "unreadable (password protected?)",
			failed: "Failed",
		},
	},
	{
		slug: "pdf-to-images",
		category: "pdf",
		keywords: ["pdf to jpg", "pdf to png", "pdf to image", "convert pdf to images", "pdf pages as pictures", "pdf转图片", "pdf转jpg", "pdf转png"],
		icon: "images",
		accent: "#dc2626",
		nav: "PDF to images",
		h1: "Convert PDF pages to images (JPG, PNG or WebP)",
		metaTitle: "PDF to JPG / PNG Converter — Rendered Locally in Your Browser",
		metaDescription:
			"Turn PDF pages into JPG, PNG or WebP images in your browser. Pick resolution and quality, preview every page, download individually or all at once.",
		blurb: "Every page rendered to JPG / PNG / WebP",
		lead: "Useful for slides, thumbnails, social posts or pasting a page into a chat. Rendering happens locally with pdf.js, so the document is never uploaded.",
		steps: [
			"Add a PDF — the page count appears as soon as it is read.",
			"Choose format, resolution (1x-3x) and quality; 2x is a good default for screens.",
			"Render, preview the thumbnails, then download single pages or all of them.",
		],
		notes: [
			{
				title: "Which resolution do you need",
				body: "1x matches the PDF's own point size (72 DPI) and is fine for thumbnails; 1.5-2x looks sharp on retina screens; 3x (~216 DPI) is only worth it for print or zooming into details.",
			},
			{
				title: "Text becomes pixels",
				body: "An image cannot be searched or selected. If you need to keep the text layer, copy the pages with the split tool instead of rendering them.",
			},
		],
		faq: [
			{
				q: "How many pages can I convert?",
				a: "Rendering is CPU work on your machine, so the limit is patience and memory rather than a quota. A 50-page document at 2x is typically a few seconds.",
			},
			{
				q: "Why is my JPG slightly different from the PDF colours?",
				a: "JPG is lossy. For exact colours use PNG (larger) or raise the quality slider to 95-100%.",
			},
			{
				q: "Does it work offline?",
				a: "Yes. pdf.js and its worker are served from this site, so rendering works with the network switched off after the page has loaded.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop one PDF here",
			format: "Image format",
			scale: "Resolution",
			quality: "Quality",
			fast: "fastest",
			sharp: "sharp",
			print: "print",
			run: "Convert to images",
			reading: "reading…",
			loading: "Loading PDF…",
			done: "Images ready",
			pages: "pages",
			failed: "Failed",
		},
	},
	{
		slug: "compress-pdf",
		category: "pdf",
		keywords: ["compress pdf", "reduce pdf size", "shrink pdf", "pdf compressor", "optimize pdf", "压缩pdf", "pdf变小", "pdf瘦身"],
		icon: "compress",
		accent: "#dc2626",
		nav: "Compress PDF",
		h1: "Compress a PDF without sending it anywhere",
		metaTitle: "Compress PDF Online — Shrink Scanned PDFs Locally, No Upload",
		metaDescription:
			"Reduce PDF file size in your browser by re-encoding pages as optimised JPEG at the DPI you choose. Ideal for scanned documents that must fit an upload limit.",
		blurb: "Shrink scans and image-heavy PDFs by up to 90%",
		lead: "Scanned documents are usually photos wrapped in a PDF — re-encoding those pages shrinks them dramatically. Everything is processed on your device.",
		steps: [
			"Add a PDF; its current size is shown in the list.",
			"Pick a JPEG quality and a resolution (200 DPI is a good compromise for text).",
			"Compress and compare the sizes. If the result would be bigger, the original is kept.",
		],
		notes: [
			{
				title: "When this works, and when it does not",
				body: "Scans and image-heavy PDFs shrink 60-90%. A text-only PDF produced by Word is already efficient, so rasterising it can make it larger — in that case keep the original.",
			},
			{
				title: "The honest trade-off",
				body: "Pages are re-rendered as images, so text is no longer selectable or searchable. That is acceptable for a scan you will print or email, but think twice before compressing a document you need to search later.",
			},
		],
		faq: [
			{
				q: "Why is my PDF not getting smaller?",
				a: "It is probably a text-only PDF that is already optimised, or the resolution is set too high. When that happens this tool keeps your original file and says so, instead of handing you a bigger one.",
			},
			{
				q: "Can I still search the text afterwards?",
				a: "No — the pages become images. If you need the text layer, use merge or split instead of compression.",
			},
			{
				q: "Is it safe for contracts and invoices?",
				a: "Yes. The file is processed in browser memory only, there is no upload step, and it works with the network disconnected.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop one PDF here",
			quality: "JPEG quality",
			resolution: "Resolution",
			run: "Compress PDF",
			loading: "Loading PDF…",
			done: "Compressed",
			pages: "pages",
			saved: "saved",
			notSmaller: "Already efficient — keeping your original file",
			failed: "Failed",
		},
	},
	{
		slug: "watermark-pdf",
		category: "pdf",
		keywords: ["watermark pdf", "add watermark", "stamp pdf", "confidential stamp", "draft watermark", "pdf加水印", "pdf水印", "盖章"],
		icon: "pages",
		accent: "#dc2626",
		nav: "Watermark PDF",
		h1: "Stamp a watermark on every PDF page",
		metaTitle: "Add Watermark to PDF — Diagonal or Tiled, Done Locally",
		metaDescription:
			"Add a text watermark to every page of a PDF in your browser: choose the text, size, opacity, colour and diagonal or tiled layout. Nothing is uploaded.",
		blurb: "Diagonal or tiled text watermark, no upload",
		lead: "Mark drafts, invoices or review copies before they leave your hands. The stamp is drawn on your device, so the document never travels.",
		steps: [
			"Add the PDF you want to stamp.",
			"Type the watermark text and pick a layout: one diagonal stamp, or tiled across the page.",
			"Adjust size, opacity and colour, then apply and download.",
		],
		notes: [
			{
				title: "Why the watermark supports Chinese and emoji",
				body: "The text is rendered to an image first and then embedded, so any character your system font can draw works — CJK, Cyrillic, emoji. PDF standard fonts only cover Latin, which is why many tools fail on Chinese watermarks.",
			},
			{
				title: "Picking an opacity",
				body: "Around 12-18% keeps the text readable while never hiding the content underneath; 30%+ is for documents you want visibly marked as drafts.",
			},
		],
		faq: [
			{
				q: "Does the watermark change the file size much?",
				a: "A single diagonal stamp adds a few kilobytes because the text image is embedded once and reused on every page.",
			},
			{
				q: "Can I watermark only some pages?",
				a: "Not in this tool — the stamp is applied to every page. For partial stamping, split the document first, stamp the part you need, then merge the pieces back.",
			},
			{
				q: "Is it safe for contracts?",
				a: "Yes. Everything runs in your browser and there is no upload step, which is exactly why this tool can be used on confidential documents.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop one PDF here",
			text: "Watermark text",
			layout: "Layout",
			layoutCenter: "One diagonal stamp",
			layoutTile: "Tiled across the page",
			size: "Size",
			opacity: "Opacity",
			color: "Colour",
			run: "Add watermark",
			working: "Stamping pages…",
			done: "Watermarked PDF ready",
			pages: "pages",
			failed: "Failed",
		},
	},
	{
		slug: "page-numbers-pdf",
		category: "pdf",
		keywords: ["add page numbers", "pdf page numbers", "bates numbering", "footer", "header", "pdf页码", "加页码", "页眉页脚"],
		icon: "pages",
		accent: "#dc2626",
		nav: "Page numbers",
		h1: "Add page numbers to a PDF",
		metaTitle: "Add Page Numbers to PDF — Position, Format, Start Value",
		metaDescription:
			"Number the pages of a PDF in your browser: bottom or top, left/centre/right, formats like 1, Page 1 or 1 / 10, and a custom starting number.",
		blurb: "Footer or header numbering with custom formats",
		lead: "Numbered pages make reviews and discovery documents far easier to discuss. Applied locally, so the file stays with you.",
		steps: [
			"Add a PDF and check the page count.",
			"Choose the corner, the format (1, Page 1, 1 / 10, Page 1 of 10) and the first number.",
			"Apply and download the numbered file.",
		],
		notes: [
			{
				title: "Starting from a number other than 1",
				body: "Useful when this PDF is a chapter of a bigger document: set the start value so the printed numbers match the master document.",
			},
			{
				title: "Text is added, not covered",
				body: "Numbers are drawn in the page margin using an embedded Helvetica font, so nothing from the original page is lost and the text layer stays intact.",
			},
		],
		faq: [
			{
				q: "Can I skip the first page (a cover)?",
				a: "Not directly. Workaround: leave the cover out with the split tool, number the rest, then merge the cover back in front.",
			},
			{
				q: "Which formats are available?",
				a: "1, Page 1, 1 / 10 and Page 1 of 10 — the last two include the total page count automatically.",
			},
			{
				q: "Does it work on scanned PDFs?",
				a: "Yes. Numbers are drawn on top of the page, so it does not matter whether the page contains text or an image.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop one PDF here",
			position: "Position",
			posBC: "Bottom centre",
			posBR: "Bottom right",
			posBL: "Bottom left",
			posTC: "Top centre",
			posTR: "Top right",
			format: "Format",
			startAt: "Start at",
			fontSize: "Font size",
			run: "Add page numbers",
			working: "Numbering pages…",
			done: "Numbered PDF ready",
			pages: "pages",
			failed: "Failed",
		},
	},
	{
		slug: "organize-pdf",
		category: "pdf",
		keywords: ["organize pdf", "rotate pdf", "delete pdf pages", "reorder pdf", "rearrange pages", "pdf旋转", "删除pdf页面", "pdf页面排序"],
		icon: "merge",
		accent: "#dc2626",
		nav: "Organize pages",
		h1: "Rotate, delete and reorder PDF pages",
		metaTitle: "Organize PDF Pages — Rotate, Delete & Reorder Visually",
		metaDescription:
			"See every page as a thumbnail, then rotate, delete or move it. Rebuild the PDF in the order you want — all in your browser, nothing uploaded.",
		blurb: "Thumbnail view: rotate, delete, reorder",
		lead: "Sideways scans and out-of-order pages are the two most common PDF annoyances. Fix both by looking at the pages instead of guessing.",
		steps: [
			"Add a PDF — every page appears as a thumbnail.",
			"Rotate with ↺ / ↻, delete with ✕, or move a page with ← / →.",
			"Apply and download the rebuilt PDF.",
		],
		notes: [
			{
				title: "Rotation is a property, not a re-render",
				body: "Pages keep their original content and simply carry a rotation flag, so quality is untouched and the text layer survives. Existing rotation is respected and added to.",
			},
			{
				title: "Delete pages you do not need",
				body: "Removing a page here is the fastest way to trim a cover sheet or a blank scan. The remaining pages are copied as-is, so nothing is re-compressed.",
			},
		],
		faq: [
			{
				q: "Can I extract just a few pages?",
				a: "Yes — delete the pages you do not want, or use the split tool with a page range, which is faster for large documents.",
			},
			{
				q: "Can I merge two PDFs this way?",
				a: "Use the merge tool for that; this one works on a single document.",
			},
			{
				q: "What if I make a mistake?",
				a: "Press “Reset order” to return to the original page order and rotations — nothing is written until you press Apply.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop one PDF here",
			hint: "Rotate with ↺ / ↻ · delete with ✕ · move with ← / → · the numbers show the new page order",
			run: "Apply and download",
			reverse: "Reverse order",
			resetOrder: "Reset order",
			working: "Rebuilding PDF…",
			done: "Rebuilt PDF ready",
			pages: "pages",
			failed: "Failed",
		},
	},
	{
		slug: "extract-pdf-text",
		category: "pdf",
		keywords: ["pdf to text", "extract text from pdf", "copy text pdf", "pdf文本提取", "提取pdf文字", "pdf转txt"],
		icon: "pages",
		accent: "#dc2626",
		nav: "Extract text",
		h1: "Copy the text out of a PDF",
		metaTitle: "Extract Text From PDF — Copy or Download as TXT, Locally",
		metaDescription:
			"Pull the selectable text out of a PDF in your browser: choose page ranges, copy everything or save a .txt file. pdf.js does the work on your device.",
		blurb: "Get the text layer out, page by page",
		lead: "Handy for quoting a report, feeding text into a translation tool, or checking whether a scan actually has a text layer. Extraction runs locally.",
		steps: [
			"Add a PDF — the page count is shown once it is read.",
			"Optionally limit the pages (for example 1-5) and choose whether to separate pages.",
			"Extract, then copy the text or save it as a .txt file.",
		],
		notes: [
			{
				title: "If the result looks empty",
				body: "That usually means the PDF is a scan without OCR — the pages are pictures, so there is no text layer to extract. Run OCR first, or use the PDF-to-images tool and OCR the images.",
			},
			{
				title: "Line breaks are reconstructed",
				body: "PDFs store text as positioned fragments rather than lines. Fragments are rejoined by comparing their vertical position, which reproduces paragraphs correctly in most documents but can differ from the original layout in complex tables.",
			},
		],
		faq: [
			{
				q: "Why are two columns merged into one?",
				a: "Multi-column layouts are read in visual order; fragments on the same line are joined. For heavy tables, extracting per page and cleaning up afterwards is usually fastest.",
			},
			{
				q: "Does it keep formatting?",
					a: "Only plain text. Bold, italics and font sizes are lost — that is fine for search, quoting and translation, less so for reproduction.",
			},
			{
				q: "Is the extracted text uploaded anywhere?",
				a: "No. pdf.js runs inside your browser and the result stays in the text box until you copy or save it.",
			},
		],
		ui: {
			...uiCommon,
			dropzone: "Drop one PDF here",
			range: "Pages (empty = all)",
			sep: "Separate pages with",
			sepPage: "A “--- Page N ---” marker",
			sepBlank: "Just a blank line",
			run: "Extract text",
			loading: "Loading PDF…",
			working: "Reading page",
			copy: "Copy text",
			copied: "Copied",
			saveTxt: "Save as .txt",
			done: "Extracted",
			pages: "pages",
			chars: "characters",
			words: "words",
			reading: "reading…",
			page: "Page",
			maybeScan: "Almost no text found — this PDF is probably a scan without OCR.",
			failed: "Failed",
		},
	},
];
