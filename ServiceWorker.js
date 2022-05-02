const STATIC_CACHE_NAME = "bookFriend-StaticCache-v1";

const ASSETS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./ServiceWorker.js",

    "./JavaScript/RegistroServiceWorker.js",
];

self.addEventListener("install", (evt) => {
    evt.waitUntil(
        caches.open(STATIC_CACHE_NAME).then( (cache) => {
            setTimeout(() => {    
            cache.addAll(ASSETS);
            }, 3000);
        })
    );
});

self.addEventListener("activate", (evt) => {
    evt.waitUntil(
        caches.keys().then( (keys) => {
        setTimeout(() => {
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] !== STATIC_CACHE_NAME) {
                    caches.delete(keys[i]);
                }
            }
        }, 3000);
    }));
});

self.addEventListener("fetch", (evt) => {
    if (navigator.onLine) {
        //Si es online hace fetch
    } else {
        //Si es offline, trae de caché los recursos
        console.log("Offline Mode");  
        evt.respondWith(
            caches.match(evt.request).then( (cacheRes) => {
                return (cacheRes);
                }).catch( (error) => {
                    console.log(error);
        }));
    }
});