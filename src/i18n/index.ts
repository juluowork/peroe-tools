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
