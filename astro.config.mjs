import { defineConfig } from "astro/config";

const toolSlugs = ["compress-image", "convert-image", "resize-image", "image-to-pdf"];
// 英文版在根路径（/compress-image/），中文版在 /zh/compress-image/。
// 早期版本曾把英文版放在 /en/ 下，这里保留 301 别名，避免旧链接失效。
const redirects = { "/en": "/" };
for (const slug of toolSlugs) redirects[`/en/${slug}`] = `/${slug}/`;

export default defineConfig({
	site: "https://tools.juluo.work",
	output: "static",
	trailingSlash: "always",
	build: { format: "directory" },
	devToolbar: { enabled: false },
	redirects,
});
