# peroe 工具箱（peroe-tools）

免费在线图片 / PDF 工具站。**所有处理都在浏览器本地完成，文件不上传服务器** ——
这既是隐私卖点，也让整站可以纯静态托管，零后端成本。

- 线上地址：<https://tools.juluo.work>
- 部署：Cloudflare Worker `peroe-tools`（静态资源模式）+ zone 路由 `tools.juluo.work/*`
- 姊妹项目：博客仓库 `juluowork/fuwari`（<https://blog.peroe.cn>）

## 现有工具

| 路径 | 工具 | 实现 |
| --- | --- | --- |
| `/compress-image/` | 图片压缩（可调画质 / 目标体积、批量） | Canvas `toBlob()` |
| `/convert-image/` | 格式转换（JPG / PNG / WebP / AVIF） | Canvas `toBlob()` |
| `/resize-image/` | 按像素或百分比缩放（锁比例、批量） | Canvas `drawImage()` |
| `/image-to-pdf/` | 多图合成 PDF（排序、页面尺寸、边距） | `pdf-lib` |

## 项目结构

```
peroe-tools/
├─ public/                     # 原样复制的静态资源
│  ├─ favicon.svg
│  └─ robots.txt
├─ src/
│  ├─ layouts/Base.astro       # 全站布局：SEO head / 样式 / 导航 / 页脚
│  ├─ lib/
│  │  ├─ tools.ts              # 工具注册表（首页卡片、导航、sitemap 共用）
│  │  └─ imgtools.client.ts    # 浏览器端图片处理库（构图、编码、下载、拖拽区）
│  └─ pages/
│     ├─ index.astro           # 首页（工具卡片 + 原理说明 + FAQ）
│     ├─ sitemap.xml.ts        # 由注册表生成 sitemap
│     ├─ compress-image.astro
│     ├─ convert-image.astro
│     ├─ resize-image.astro
│     └─ image-to-pdf.astro    # 每个工具页 = UI + 用法说明 + FAQ(+FAQPage 结构化数据)
├─ astro.config.mjs            # site = https://tools.juluo.work，静态输出
├─ wrangler.jsonc              # Worker 名 peroe-tools + 路由 tools.juluo.work/*
└─ package.json
```

**内容放在哪**：工具页是 `src/pages/<slug>.astro`；标题/描述/FAQ 文案集中在 `src/lib/tools.ts`；
公共样式在 `src/layouts/Base.astro` 的 `<style is:global>` 里。

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # 产物在 dist/
pnpm deploy     # 构建并 wrangler deploy
```

## 部署（Cloudflare）

1. Cloudflare 控制台 → Workers & Pages → **Connect to Git** → 选本仓库，分支 `main`；
   Build command 填 `pnpm build`，Deploy command 保持默认 `npx wrangler deploy`。
2. 路由与 DNS 由仓库里的 `wrangler.jsonc` 与 Cloudflare 侧手工记录维护
   （规则与博客一致：**zone 路由 + 手写 DNS，不用自定义域**）。

## 成本

纯静态资源请求在 Cloudflare Workers 上**免费且不计入每日 10 万次请求限额**，
因此除域名外无固定支出；没有任何服务端接口，也没有数据库。

## 广告接入（AdSense）

页面里预留了 `<div class="ad-slot" data-ad-slot="…">` 占位。拿到发布商 ID 后：
把 AdSense 脚本与广告单元填进 `src/layouts/Base.astro` 的广告位（或改为按国家条件注入，
国内访客不加载 —— 参考博客仓库 AGENTS.md §18.2）。

## 待办

- [ ] 补充更多工具（PDF 合并/拆分、图片加水印、HEIC 转换…）
- [ ] 每个工具页增加示例截图与更长的使用说明（利于 SEO 与广告审核）
- [ ] 接入 AdSense（等发布商 ID）
- [ ] 中文/英文双语（海外流量靠英文关键词，国内流量靠中文）
