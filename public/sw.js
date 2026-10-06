/**
 * peroe tools 的 Service Worker —— 让「断网也能用」成为事实，而不只是文案。
 *
 * 策略：
 *  - 页面（导航请求）：网络优先，失败回落缓存 → 在线时总能拿到最新版，断网时打开看过的页面。
 *  - 静态资源（/_astro/、/qpdf/、图片、字体）：缓存优先 + 后台更新 → 工具用的库（pdf.js / wasm）装一次就离线可用。
 *  - 只处理同源 GET；统计（umami）等跨域请求一律放行，不进缓存。
 *
 * 改版本号即可让所有客户端换新缓存。
 */
const VERSION = "v1";
const PAGE_CACHE = `peroe-pages-${VERSION}`;
const ASSET_CACHE = `peroe-assets-${VERSION}`;
/** 首次安装就预缓存的核心页面：断网后至少首页/索引页一定能打开 */
const CORE = ["/", "/tools/", "/categories/", "/manifest.webmanifest", "/icon-192.png"];

self.addEventListener("install", (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(PAGE_CACHE);
			// 逐个添加：某个失败不影响其它
			await Promise.all(CORE.map((u) => cache.add(new Request(u, { cache: "reload" })).catch(() => {})));
			await self.skipWaiting();
		})(),
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			await Promise.all(keys.filter((k) => !k.endsWith(VERSION)).map((k) => caches.delete(k)));
			await self.clients.claim();
		})(),
	);
});

const isAsset = (url) =>
	url.pathname.startsWith("/_astro/") ||
	url.pathname.startsWith("/qpdf/") ||
	/\.(?:css|js|mjs|wasm|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|json|webmanifest|txt|xml)$/i.test(url.pathname);

self.addEventListener("fetch", (event) => {
	const req = event.request;
	if (req.method !== "GET") return;
	const url = new URL(req.url);
	if (url.origin !== self.location.origin) return; // 跨域（统计等）直接走网络

	// 页面导航：网络优先，断网回落缓存
	if (req.mode === "navigate") {
		event.respondWith(
			(async () => {
				try {
					const fresh = await fetch(req);
					const cache = await caches.open(PAGE_CACHE);
					cache.put(req, fresh.clone());
					return fresh;
				} catch {
					const cached = (await caches.match(req)) || (await caches.match("/")) ;
					if (cached) return cached;
					return new Response("Offline", { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } });
				}
			})(),
		);
		return;
	}

	// 静态资源：缓存优先 + 后台更新
	if (isAsset(url)) {
		event.respondWith(
			(async () => {
				const cache = await caches.open(ASSET_CACHE);
				const cached = await cache.match(req);
				const network = fetch(req)
					.then((res) => {
						if (res && res.ok) cache.put(req, res.clone());
						return res;
					})
					.catch(() => null);
				return cached || (await network) || new Response("", { status: 504 });
			})(),
		);
	}
});
