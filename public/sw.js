self.jwtToken = null;

self.addEventListener("install", (event) => {
    console.log("[SW] Install");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("[SW] Activate");
    clients.claim();
});

importScripts("/syncmanager/idb-pending.js");
importScripts("/syncmanager/graphql-client.js");
importScripts("/syncmanager/sync-manager.js");

self.addEventListener("PERIODIC_SYNC", (event) => {
    if (event.tag === "SYNC_PENDING_DATA") {
        console.log("[SW] Sync triggered");
        event.waitUntil(runSyncManager());
    }
});

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === 'SET_JWT_TOKEN' && event.data.token) {
        self.jwtToken = event.data.token;
        console.log("[SW] Token JWT berhasil diterima dan disimpan.");
    }

    if (event.data && event.data.type === "FORCE_SYNC") {
        console.log("[SW] Force sync triggered from client");
        runSyncManager();
    }

    if (event.data && event.data.type === 'CLEAR_JWT_TOKEN') {
        jwtToken = null;
        console.log("[SW] Token JWT dihapus (logout).");
    }
});
