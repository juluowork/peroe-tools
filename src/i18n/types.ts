export type Locale = "en" | "zh";

/** 工具分类：先用得到的，将来加开发/文本/网络类工具时直接复用 */
export type CategoryId = "image" | "pdf" | "dev" | "text" | "web" | "convert";

export interface CategoryCopy {
	id: CategoryId;
	/** 分类名（导航与分组标题） */
	name: string;
	/** 分类一句话说明（全部工具页用） */
	blurb: string;
	/** 分类落地页的 H1 与 meta */
	h1: string;
	metaTitle: string;
	metaDescription: string;
	/** 分类落地页正文（2-3 段，SEO 与广告审核都需要实质内容） */
	intro: string[];
	/** 分类落地页 FAQ */
	faq: FaqItem[];
}

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
	/** 所属分类 */
	category: CategoryId;
	/** 搜索用关键词（同义词、别名、格式名，中英都放） */
	keywords: string[];
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
	/* ---- 导航与「全部工具」页 ---- */
	/** 顶部「全部工具」入口 */
	navAllTools: string;
	/** 顶部「分类」入口 */
	navCategories: string;
	/** 分类索引页 */
	categoriesPageTitle: string;
	categoriesPageDescription: string;
	categoriesPageH1: string;
	categoriesPageLead: string;
	categoriesToolsLabel: string;
	/** 搜索框占位符 */
	searchPlaceholder: string;
	/** 搜索无结果 */
	searchEmpty: string;
	/** 分类展示顺序（只放有工具的分类） */
	categories: CategoryCopy[];
	/** 全部工具页的标题与描述 */
	toolsPageTitle: string;
	toolsPageDescription: string;
	toolsPageH1: string;
	toolsPageLead: string;
	/** 同类工具区块标题 */
	relatedTitle: string;
	/** 联系方式（页脚） */
	contactLabel: string;
	email: string;
	/** 工具数量文案模板，如 "{n} tools" */
	toolCountLabel: string;
}
