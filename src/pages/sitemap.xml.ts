import type { APIRoute } from "astro";
import { tools } from "../lib/tools";

const site = "https://tools.juluo.work";

export const GET: APIRoute = () => {
	const urls = ["/", ...tools.map((t) => `/${t.slug}/`)];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `\t<url><loc>${site}${u}</loc><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`;
	return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
