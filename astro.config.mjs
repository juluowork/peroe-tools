import { defineConfig } from "astro/config";

// 站点主域：海外向工具站，挂在不备案的 juluo.work 下（可放 AdSense）
export default defineConfig({
	site: "https://tools.juluo.work",
	output: "static",
	trailingSlash: "always",
	build: { format: "directory" },
	devToolbar: { enabled: false },
});
