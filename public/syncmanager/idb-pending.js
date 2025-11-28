const DB_NAME = "todo_db";
const DB_VERSION = 1;

async function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function getPendingItems() {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(["projects", "tasks"], "readonly");

        const projectsStore = tx.objectStore("projects");
        const tasksStore = tx.objectStore("tasks");

        const pending = { projects: [], tasks: [] };

        projectsStore.getAll().onsuccess = (e) => {
            pending.projects = e.target.result.filter(x => x.pendingSync);
        };

        tasksStore.getAll().onsuccess = (e) => {
            pending.tasks = e.target.result.filter(x => x.pendingSync);
        };

        tx.oncomplete = () => resolve(pending);
        tx.onerror = () => reject(tx.error);
    });
}

async function markAsSynced(storeName, id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        const req = store.get(id);
        req.onsuccess = () => {
            const item = req.result;
            if (!item) return resolve();

            item.pendingSync = false;
            item.operation = null;

            store.put(item);
        };

        tx.oncomplete = resolve;
        tx.onerror = reject;
    });
}

self.idbPending = { getPendingItems, markAsSynced };
