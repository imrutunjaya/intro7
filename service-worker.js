const CACHE_NAME = 'dr-researcher-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css', // Add your CSS file(s) here
    '/script.js', // Add your main JavaScript file here
    '/images/logo.png', // Add any images you want to cache
    // Add other assets you want to cache
];

// Install the service worker and cache the specified assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch the cached assets when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response from the cached version
                if (response) {
                    return response;
                }
                return fetch(event.request); // Fall back to network
            })
    );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
