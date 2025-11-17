self.addEventListener('install', () => {
  console.log('[SW] Installed');
});

self.addEventListener('activate', () => {
  console.log('[SW] Activated');
  self.clients.claim();
});

// Handle GraphQL POST offline fallback
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only intercept GraphQL POST
  if (req.method === 'POST' && req.url.includes('/graphql')) {
    event.respondWith(
      (async () => {
        try {
          // Try normal network fetch
          return await fetch(req.clone());
        } catch {
          // Offline fallback
          return new Response(
            JSON.stringify({ errors: [{ message: 'offline' }] }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
          );
        }
      })()
    );
  }
});

// BACKGROUND SYNC
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-outbox') {
    event.waitUntil(
      (async () => {
        const clientsList = await self.clients.matchAll();
        clientsList.forEach((client) =>
          client.postMessage({ type: 'SYNC_OUTBOX' })
        );
      })()
    );
  }
});
