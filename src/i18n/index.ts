import type { Locale, SiteCopy, ToolCopy } from "./types";
import * as en from "./en";
import * as zh from "./zh";

export type { Locale, SiteCopy, ToolCopy } from "./types";

export const locales: Locale[] = ["en", "zh"];
export const defaultLocale: Locale = "en";

const bundles: Record<Locale, { site: SiteCopy; tools: ToolCopy[] }> = {
	en: { site: en.site, tools: en.tools },
	zh: { site: zh.site, tools: zh.tools },
};

export const getSite = (locale: Locale): SiteCopy => bundles[locale].site;
export const getTools = (locale: Locale): ToolCopy[] => bundles[locale].tools;
export const getTool = (locale: Locale, slug: string): ToolCopy | undefined =>
	bundles[locale].tools.find((t) => t.slug === slug);

/** 该语言下某页面的路径：英文在根，中文在 /zh/ */
export function localePath(locale: Locale, p = "/"): string {
	const clean = p.startsWith("/") ? p : `/${p}`;
	const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
	if (locale === "en") return withSlash;
	return withSlash === "/" ? "/zh/" : `/zh${withSlash}`;
}

/** 另一种语言下的同一页面（用于语言切换按钮） */
export function altPath(locale: Locale, pathname: string): string {
	if (locale === "en") return localePath("zh", pathname);
	const stripped = pathname.replace(/^\/zh/, "") || "/";
	return localePath("en", stripped);
}

export function htmlLang(locale: Locale): string {
	return locale === "en" ? "en" : "zh-CN";
}

/** 该语言下「有工具的分类」（按 categories 里定义的顺序；空分类不显示，避免出现空页面） */
export function activeCategories(locale: Locale) {
	const tools = getTools(locale);
	return getSite(locale).categories.filter((c) => tools.some((t) => t.category === c.id));
}

/** 按分类分组（只返回有工具的分类） */
export function toolsByCategory(locale: Locale) {
	return activeCategories(locale).map((c) => ({
		category: c,
		tools: getTools(locale).filter((t) => t.category === c.id),
	}));
}

export const categoryName = (locale: Locale, id: string): string =>
	getSite(locale).categories.find((c) => c.id === id)?.name ?? id;

/** 工具页路径：/{category}/{slug}/（分类进 URL，自带关键词，也顺带产出分类枢纽页） */
export function toolPath(locale: Locale, tool: { category: string; slug: string }): string {
	return localePath(locale, `/${tool.category}/${tool.slug}/`);
}

/** 分类枢纽页路径：/{category}/ */
export function categoryPath(locale: Locale, categoryId: string): string {
	return localePath(locale, `/${categoryId}/`);
}

/** 去掉语言前缀后的「逻辑路径」（用于语言切换与 canonical） */
export function logicalPath(pathname: string): string {
	return pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
}

/** 工具 → 内联图标名（集中一处，新增工具只改这里） */
const TOOL_ICONS: Record<string, string> = {
	"compress-image": "image",
	"convert-image": "convert",
	"resize-image": "resize",
	"image-to-pdf": "pdf",
	"merge-pdf": "merge",
	"split-pdf": "split",
	"pdf-to-images": "images",
	"compress-pdf": "compress",
	"watermark-pdf": "pages",
	"page-numbers-pdf": "pages",
	"organize-pdf": "merge",
	"extract-pdf-text": "pages",
	"pdf-to-text": "pages",
	"watermark-image": "image",
	"annotate-image": "pen",
	"crop-image": "crop",
	"image-to-ico": "image",
	"exif-viewer": "image",
	"heic-to-jpg": "convert",
	"json-formatter": "pages",
	"base64": "convert",
	"hash-generator": "compress",
	"uuid-generator": "pages",
	"timestamp": "pages",
	"regex-tester": "pages",
	"jwt-decoder": "pages",
	"text-diff": "merge",
	"url-encode": "convert",
	"color-converter": "image",
};

export const toolIcon = (slug: string): string => TOOL_ICONS[slug] ?? "pdf";
