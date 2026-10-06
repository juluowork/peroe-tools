import { defineConfig } from "astro/config";

// 英文版在根路径（/compress-image/），中文版在 /zh/compress-image/。
//
// 早期版本曾把英文版放在 /en/ 下：这些旧链接的 301 **不用 Astro 的 redirects 配置**
// （它只生成 meta-refresh 页面，会占住 /en/index.html 让 Cloudflare 的 _redirects 失效），
// 而是写在 public/_redirects 里，由 Cloudflare 边缘返回真正的 301。
export default defineConfig({
	site: "https://tools.juluo.work",
	output: "static",
	trailingSlash: "always",
	build: { format: "directory" },
	devToolbar: { enabled: false },
});
