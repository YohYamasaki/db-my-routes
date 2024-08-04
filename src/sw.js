// Cache name
const CACHE_NAME = "pwa-dbml-caches-v1";
// Cache targets
const urlsToCache = [
    "https://app.yayo1.com/db-my-routes/",
    "https://app.yayo1.com/db-my-routes/#!/add-route"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                return response ? response : fetch(event.request);
            })
    );
});
