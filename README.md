# peroe tools

免费在线图片 / PDF 工具站，**所有处理都在浏览器本地完成，文件不上传服务器**。
这既是隐私卖点，也让整站可以纯静态托管：无后端、无数据库、零请求成本。

- 线上：<https://tools.juluo.work>（英文，默认）· <https://tools.juluo.work/zh/>（中文）
- 部署：Cloudflare Worker `peroe-tools`（静态资源模式）+ zone 路由 `tools.juluo.work/*`
- 姊妹项目：博客 `juluowork/fuwari`（<https://blog.peroe.cn>）

## 工具与语言

### URL 规则（分类进 URL）

| 英文 | 中文 | 说明 |
| --- | --- | --- |
| `/` | `/zh/` | 首页 |
| `/tools/` | `/zh/tools/` | **全部工具**：搜索框 + 按分类分组 |
| `/categories/` | `/zh/categories/` | **分类索引**：所有分类一屏看全，点进分类枢纽页 |
| `/image/` | `/zh/image/` | **分类枢纽页**（该分类全部工具 + 分类说明 + FAQ） |
| `/pdf/` | `/zh/pdf/` | 同上 |
| `/image/compress-image/` | `/zh/image/compress-image/` | 工具页 = `/{category}/{slug}/` |

| 工具 | 新路径 | 实现 |
| --- | --- | --- |
| 图片压缩（画质 / 目标体积 / 批量） | `/image/compress-image/` | Canvas `toBlob()` |
| 格式转换（JPG / PNG / WebP / AVIF） | `/image/convert-image/` | Canvas `toBlob()` |
| 缩放（锁比例 / 批量） | `/image/resize-image/` | Canvas `drawImage()` |
| **图片加水印**（6 种版式 / 批量） | `/image/watermark-image/` | Canvas + `drawText` |
| **HEIC → JPG**（任意浏览器） | `/image/heic-to-jpg/` | 原生解码优先 + `libheif` wasm 兜底 |
| **图片转 ICO**（16–256 px 多尺寸） | `/image/image-to-ico/` | 手写 ICO 容器 + Canvas |
| **EXIF 查看与清理** | `/image/exif-viewer/` | `exifr` 读取 + Canvas 重编码清除 |
| 图片合成 PDF | `/pdf/image-to-pdf/` | `pdf-lib`（按需加载） |
| **PDF 合并**（多文件、可排序） | `/pdf/merge-pdf/` | `pdf-lib` `copyPages()` |
| **PDF 拆分**（页码范围 / 每页一份） | `/pdf/split-pdf/` | `pdf-lib` + 范围解析 |
| **PDF 转图片**（JPG/PNG/WebP、1x-3x） | `/pdf/pdf-to-images/` | `pdf.js` 渲染 + Canvas 编码 |
| **PDF 压缩**（重编码为优化 JPEG） | `/pdf/compress-pdf/` | `pdf.js` + `pdf-lib` |
| **PDF 加水印**（斜向 / 平铺，支持中文） | `/pdf/watermark-pdf/` | 文字转图 + `pdf-lib` 嵌入 |
| **PDF 加页码**（位置 / 格式 / 起始值） | `/pdf/page-numbers-pdf/` | `pdf-lib` 标准字体 |
| **页面整理**（旋转 / 删除 / 调序） | `/pdf/organize-pdf/` | `pdf.js` 缩略图 + `pdf-lib` |
| **提取文本**（页码范围 / 复制 / 存 txt） | `/pdf/extract-pdf-text/` | `pdf.js` `getTextContent()` |

- **slug 一律英文**（两种语言共用，便于权重集中），中文只体现在展示文案与 `/zh/` 前缀。
- 旧版本用过扁平 URL（`/compress-image/`），**已在 `public/_redirects` 里 301 到新地址**；`/en/*` 同理。
- 决定"分类进 URL"的原因：URL 自带分类关键词，并顺带产出可索引的分类枢纽页 `/image/`——
  等于拿到"独立子域"的 SEO 收益，却不用把新域本来就不多的权重切成几份。
- 分类展示名（英文 / 中文）：Image 图片 · PDF · Developer 开发 · Text 文本 · Converter 转换 · Web 网络。
  **只显示"有工具的分类"**（`activeCategories()`），避免出现空页面。

## 信息架构（工具变多也不会找不到）

**布局**：`/categories/`、`/tools/`、分类枢纽页统一采用 **左侧边栏（分类 + 工具数，高亮当前项）+ 右侧内容**；
工具在内容区以**紧凑列表行**（图标 + 名称 + 一句话 + 箭头）呈现，不用大卡片 —— 工具变多时列表比卡片网格更好扫。
移动端侧边栏收成横向可滚动的一行。


- **顶栏**：首页 · 分类（≤4 个直接平铺）· 全部工具（下拉里按分类列全部工具）· 语言切换。
  **不放**几十个工具直链、登录、收藏、广告。
- **`/tools/`**：客户端搜索（匹配工具名 + 关键词 + 描述，命中即过滤，支持 `?q=` 与 `⌘K`/`Ctrl+K` 聚焦）
  + 按分类分组；空结果显示提示。搜索是纯前端的，构建产物自带索引，无服务端。
- **分类枢纽页** `/{category}/`：分类导语（2-3 段实质内容）+ 工具卡 + FAQ + 其它分类的工具。
- **工具页**：面包屑 `首页 / 分类 / 工具` + `BreadcrumbList` 结构化数据；页尾"相关工具"**同分类优先**。
- **新增工具的标准动作**：① 在 `src/i18n/{en,zh}.ts` 加一条 ToolCopy（含 `category`、`keywords`）；
  ② 在 `src/components/tools/` 写界面组件；③ 在 `src/pages/[category]/[slug].astro` 的 components 映射里登记。
  导航、下拉、`/tools/` 分组、sitemap、面包屑、相关工具**全部自动跟随**。

## 项目结构

```
peroe-tools/
├─ public/                      # 原样复制的静态资源（favicon、robots.txt）
├─ src/
│  ├─ i18n/                     # 全部文案（最重要的一层）
│  │  ├─ types.ts               # ToolCopy / SiteCopy 类型定义
│  │  ├─ en.ts                  # 英文：站点文案 + 4 个工具的标题/描述/步骤/FAQ/UI 字符串
│  │  ├─ zh.ts                  # 中文：同上
│  │  └─ index.ts               # getSite/getTools/localePath/altPath 等辅助
│  ├─ components/
│  │  ├─ Icon.astro             # 内联线性图标（24 网格，无外部图标 CDN）
│  │  ├─ DropZone.astro         # 统一拖拽区（含"不上传"提示）
│  │  ├─ ToolCard.astro         # 工具卡（首页与"更多工具"共用）
│  │  ├─ MoreTools.astro        # 页尾"全部工具"
│  │  ├─ HomePage.astro         # 首页骨架（hero / 徽章 / 分类 tab / 卡片 / 说明 / FAQ）
│  │  ├─ ToolPage.astro         # 工具页骨架（面包屑 / H1 / 说明 / 步骤 / FAQ / 结构化数据）
│  │  └─ tools/                 # 四个工具的界面 + 客户端逻辑
│  │     ├─ CompressTool.astro
│  │     ├─ ConvertTool.astro
│  │     ├─ ResizeTool.astro
│  │     └─ ImageToPdfTool.astro
│  ├─ layouts/Base.astro        # HTML 骨架：SEO head、hreflang、顶栏、页脚
│  ├─ lib/imgtools.client.ts    # 浏览器端公共库：解码/编码/下载/拖拽/行渲染/spinner
│  ├─ styles/global.css         # 设计 token 与全部样式
│  └─ pages/
│     ├─ index.astro            # 英文首页
│     ├─ [slug].astro           # 英文工具页（路由由 i18n 注册表生成）
│     ├─ zh/index.astro         # 中文首页
│     ├─ zh/[slug].astro        # 中文工具页
│     ├─ 404.astro
│     └─ sitemap.xml.ts         # 双语 + hreflang 的 sitemap
├─ astro.config.mjs             # site、静态输出、/en/* → 根路径 301
├─ wrangler.jsonc               # Worker 名 peroe-tools + 路由 tools.juluo.work/*
└─ package.json
```

**内容放在哪**：改文案只动 `src/i18n/en.ts` 与 `src/i18n/zh.ts`（标题、描述、导语、步骤、说明、FAQ、
工具界面的每个字符串都在那里）；改样式只动 `src/styles/global.css`。

## 本地开发

```bash
pnpm install
pnpm dev       # http://localhost:4321（中文在 /zh/）
pnpm build     # 产物在 dist/
pnpm deploy    # 构建并 wrangler deploy
```

## 部署（Cloudflare）

1. 控制台 → Workers & Pages → **Connect to Git** → 选本仓库、分支 `main`；
   Build command `pnpm build`，Deploy command 默认 `npx wrangler deploy`。
2. 路由与 DNS 走仓库里的 `wrangler.jsonc` + Cloudflare 侧手工记录
   （规则与博客一致：**zone 路由 + 手写 DNS，不用自定义域**）。

## 功能自测

`C:\Users\juluo\.dsh-tools\shots\test-tools.mjs`（playwright-core + 本机 Chrome）会真上传图片、
真执行、真下载并校验产物（WebP 魔数、PDF 页数与页面尺寸、尺寸换算），并输出截图：

```bash
cd C:\Users\juluo\.dsh-tools\shots
node test-tools.mjs --base https://tools.juluo.work --out <截图目录>
```

## 设计约定（照成熟工具站的做法）

- 主色绿 `#00bb88`（"本地处理＝安全"，红色只留给删除/错误）；卡片 2px 边框 + hover 变主色；圆角 卡片 12 / 按钮 8 / 拖拽区 16。
- 交互状态：IDLE（拖拽区）→ PICKED（文件列表 + 缩略图 + 删除/排序）→ RUNNING（按钮内 spinner + `3/8`）→ DONE（**同页**显示下载与"重新开始"，不跳页）。
- 每个工具页必须有实质说明（原理 / 建议 / FAQ），既是 SEO 也是 AdSense 审核要求。
- **不做**：上传进度、云盘来源、账号体系、额度墙、服务端"文件 2 小时后删除"这类承诺（我们根本没有服务端）。

## 成本

静态资源请求在 Cloudflare Workers 上**免费且不计入每日 10 万次限额**，除域名外无固定支出。

## 待办

- [ ] 更多工具：PDF 合并/拆分、图片加水印、HEIC 转换、批量打包下载
- [ ] 接入 AdSense（等发布商 ID；建议按国家注入，国内访客不加载）
- [ ] 每个工具页配示例截图，进一步提升转化与内容厚度
