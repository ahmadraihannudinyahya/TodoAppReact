const DB_NAME = "todo_db";
const DB_VERSION = 1;
const STORE_PROJECTS = "projects";
const STORE_TASKS = "tasks";

let db;

function isNotDeleted(item) {
    return item && item.operation !== "delete";
}

export function openDB() {
    return new Promise((resolve, reject) => {
        if (db) return resolve(db);

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const database = request.result;
            if (!database.objectStoreNames.contains(STORE_PROJECTS)) {
                database.createObjectStore(STORE_PROJECTS, { keyPath: "id" });
            }
            if (!database.objectStoreNames.contains(STORE_TASKS)) {
                const store = database.createObjectStore(STORE_TASKS, { keyPath: "id" });
                store.createIndex("projectId", "projectId", { unique: false });
            }
        };

        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onerror = () => reject(request.error);
    });
}

function getStore(storeName, mode = "readonly") {
    if (!db) throw new Error("DB not initialized. Call openDB() first.");
    const tx = db.transaction(storeName, mode);
    return tx.objectStore(storeName);
}

export async function deleteDb() {
    await openDB();
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction([STORE_PROJECTS, STORE_TASKS], "readwrite");
            const store_projects = transaction.objectStore(STORE_PROJECTS);
            const store_tasks = transaction.objectStore(STORE_TASKS);
            store_projects.clear();
            store_tasks.clear();
            console.log('store_projects.clear();');
            console.log('store_tasks.clear();');
            
            transaction.oncomplete = () => {
                resolve(true);
            };
            transaction.onerror = () => {
                reject(transaction.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}

export async function addProject(project) {
    project.id = crypto.randomUUID();
    project.pendingSync = true
    project.operation = 'create'
    project.updated_at = new Date()
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_PROJECTS, "readwrite");
        const req = store.add(project);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export async function getProjects() {
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_PROJECTS);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result.filter(isNotDeleted));
        req.onerror = () => reject(req.error);
    });
}


export async function getProject(id) {
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_PROJECTS);
        const req = store.get(id);
        req.onsuccess = () => {
            const project = req.result;
            resolve(isNotDeleted(project) ? project : null);
        };
        req.onerror = () => reject(req.error);
    });
}

export async function updateProject(project) {
    project.pendingSync = true
    project.operation = 'update'
    project.updated_at = new Date()
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_PROJECTS, "readwrite");
        const getReq = store.get(project.id);
        getReq.onsuccess = () => {
            const existing = getReq.result;
            if (!existing) {
                reject(new Error("Project not found"));
                return;
            }
            const updated = { ...existing, ...project };
            const putReq = store.put(updated);
            putReq.onsuccess = () => resolve(updated);
            putReq.onerror = () => reject(putReq.error);
        };
    });
}

export async function deleteProject(projectId) {
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_PROJECTS, "readwrite");
        const getReq = store.get(projectId);
        getReq.onsuccess = () => {
            const existing = getReq.result;
            if (!existing) {
                reject(new Error("Project not found"));
                return;
            }
            const updated = {
                ...existing,
                pendingSync: true,
                operation: "delete",
                updated_at: new Date()
            };

            const putReq = store.put(updated);
            putReq.onsuccess = () => resolve(updated);
            putReq.onerror = () => reject(putReq.error);
        };
    });
}

// ---------------- TASK CRUD ----------------
export async function addTask(task) {
    task.id = crypto.randomUUID();
    task.isDone = false;
    task.pendingSync = true
    task.operation = 'create'
    task.updated_at = new Date()
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_TASKS, "readwrite");
        const req = store.add(task);
        req.onsuccess = () => resolve(task);
        req.onerror = () => reject(req.error);
    });
}

export async function getTasksByProject(projectId) {
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_TASKS);
        const index = store.index("projectId");
        const req = index.getAll(projectId);
        req.onsuccess = () => resolve(req.result.filter(isNotDeleted));
        req.onerror = () => reject(req.error);
    });
}

export async function getTasksByPriority(priority) {
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_TASKS);
        const req = store.getAll();
        req.onsuccess = () => {
            const filtered = req.result.filter(task => task['priority'] === priority).filter(isNotDeleted);
            resolve(filtered);
        };
        req.onerror = () => reject(req.error);
    });
}


export async function getTasksByDueDate(dueDate) {
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_TASKS);
        const req = store.getAll();

        req.onsuccess = () => {
            const target = new Date(dueDate);

            const filtered = req.result.filter(task => {
                const d = new Date(task.due);
                return (
                    d.getFullYear() === target.getFullYear() &&
                    d.getMonth() === target.getMonth() &&
                    d.getDate() === target.getDate()
                );
            }).filter(isNotDeleted);

            resolve(filtered);
        };

        req.onerror = () => reject(req.error);
    });
}

export async function updateTask(task) {
    task.pendingSync = true
    task.operation = 'update'
    task.updated_at = new Date()
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_TASKS, "readwrite");
        const getReq = store.get(task.id);
        getReq.onsuccess = () => {
            const existing = getReq.result;

            if (!existing) {
                reject(new Error("Task not found"));
                return;
            }
            const updated = { ...existing, ...task };
            const putReq = store.put(updated);
            putReq.onsuccess = () => resolve(updated);
            putReq.onerror = () => reject(putReq.error);
        };

    });
}

export async function toogleTaskDone(taskId) {
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_TASKS, "readwrite");
        const getReq = store.get(taskId);
        getReq.onsuccess = () => {
            const existing = getReq.result;

            if (!existing) {
                reject(new Error("Task not found"));
                return;
            }
            const updated = {
                ...existing,
                isDone: !existing.isDone,
                pendingSync: true,
                operation: 'update',
                updated_at: new Date(),
            };
            const putReq = store.put(updated);
            putReq.onsuccess = () => resolve(updated);
            putReq.onerror = () => reject(putReq.error);
        };

    });
}

export async function deleteTask(taskId) {
    await openDB();
    return new Promise((resolve, reject) => {
        const store = getStore(STORE_TASKS, "readwrite");

        const getReq = store.get(taskId);
        getReq.onsuccess = () => {
            const existing = getReq.result;

            if (!existing) {
                reject(new Error("Task not found"));
                return;
            }

            const updated = {
                ...existing,
                pendingSync: true,
                operation: "delete",
                updated_at: new Date()
            };

            const putReq = store.put(updated);
            putReq.onsuccess = () => resolve(updated);
            putReq.onerror = () => reject(putReq.error);
        };
    });
}
