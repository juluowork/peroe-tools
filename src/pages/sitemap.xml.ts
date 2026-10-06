import type { APIRoute } from "astro";
import { getTools, locales, localePath } from "../i18n";

const origin = "https://tools.juluo.work";

export const GET: APIRoute = () => {
	const tools = getTools("en");
	const paths = ["/", ...tools.map((t) => `/${t.slug}/`)];
	const entries: string[] = [];
	for (const p of paths) {
		const alts = locales
			.map(
				(l) =>
					`\t\t<xhtml:link rel="alternate" hreflang="${l === "en" ? "en" : "zh-CN"}" href="${origin}${localePath(l, p)}" />`,
			)
			.join("\n");
		for (const l of locales) {
			entries.push(`\t<url>
\t\t<loc>${origin}${localePath(l, p)}</loc>
\t\t<changefreq>weekly</changefreq>
\t\t<priority>${p === "/" ? "1.0" : "0.8"}</priority>
${alts}
\t</url>`);
		}
	}
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
	return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
