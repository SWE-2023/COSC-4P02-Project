import { build, files, version } from "$service-worker";

const CACHE = `cache-${version}`;

const ASSETS = [...build, ...files];

self.addEventListener("install", (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			return cache.match(event.request);
		}

		// Check if the request is for an image
		if (/\.jpg$|\.png$|\.jpeg$|\.gif$|\.webp$/.test(url.pathname)) {
			const imageCache = await caches.open("image-cache");
			const cachedImage = await imageCache.match(event.request);

			if (cachedImage) {
				return cachedImage;
			} else {
				try {
					const imageResponse = await fetch(event.request);
					imageCache.put(event.request, imageResponse.clone());
					return imageResponse;
				} catch {
					// Fallback in case of no network and no cache
				}
			}
		}

		// Check if the request is for a font
		else if (/\.woff$|\.woff2$|\.ttf$|\.otf$|\.css$|\.eot$/.test(url.pathname)) {
			const fontCache = await caches.open("font-cache");
			const cachedFont = await fontCache.match(event.request);

			if (cachedFont) {
				return cachedFont;
			} else {
				try {
					const fontResponse = await fetch(event.request);
					fontCache.put(event.request, fontResponse.clone());
					return fontResponse;
				} catch {
					// Fallback in case of no network and no cache
				}
			}
		}

		try {
			const response = await fetch(event.request);

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch {
			return cache.match(event.request);
		}
	}

	event.respondWith(respond());
});
