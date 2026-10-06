export type Locale = "en" | "zh";

export interface FaqItem {
	q: string;
	a: string;
}

export interface NoteItem {
	title: string;
	body: string;
}

export interface ToolCopy {
	/** URL slug（英文关键词，两种语言共用，便于权重集中） */
	slug: string;
	/** 卡片图标（内联 SVG path，24×24 视口） */
	icon: string;
	/** 卡片强调色 */
	accent: string;
	/** 导航短名 */
	nav: string;
	/** H1 */
	h1: string;
	/** 浏览器标题 */
	metaTitle: string;
	metaDescription: string;
	/** 卡片一句话 */
	blurb: string;
	/** H1 下的导语 */
	lead: string;
	/** 三步用法 */
	steps: string[];
	/** 使用建议 / 原理说明 */
	notes: NoteItem[];
	faq: FaqItem[];
	/** 工具界面的字符串 */
	ui: Record<string, string>;
}

export interface SiteCopy {
	lang: string;
	brand: string;
	tagline: string;
	homeTitle: string;
	homeDescription: string;
	homeH1: string;
	homeLead: string;
	homeFaq: FaqItem[];
	homeWhyTitle: string;
	homeWhy: string[];
	howTitle: string;
	stepsTitle: string;
	faqTitle: string;
	toolsTitle: string;
	navLabel: string;
	switchLabel: string;
	switchHref: string;
	badges: string[];
	footerNote: string;
	footerLinks: { label: string; href: string }[];
	privacyLine: string;
}
