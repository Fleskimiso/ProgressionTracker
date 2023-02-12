// Install event
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
  });
  
  // Activate event
  self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
  });
  
  // Fetch event
  self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetching something ...', event);
    event.respondWith(fetch(event.request));
  });
  