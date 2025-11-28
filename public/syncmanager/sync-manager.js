async function runSyncManager() {
    console.log("[Sync] Starting full sync...");

    try {
        await pullFromServer();
        await pushPendingLocal();

        console.log("[Sync] Full sync completed!");
    } catch (err) {
        console.error("[Sync] Error during sync:", err);
    }
}

async function pullFromServer() {
    console.log("[Sync] Pulling projects from server...");
    const projectsData = await self.gql.graphQLRequest(`
        query {
            projects {
                id
                name
                description
                updated_at
            }
        }
    `);

    for (const project of projectsData.projects) {
        await upsertLocalWithTimestampConflict("projects", project);
    }

    console.log("[Sync] Pulling tasks from server...");
    const tasksData = await self.gql.graphQLRequest(`
        query {
            tasks {
                id
                project_id
                name
                due
                description
                priority
                finished
                updated_at
            }
        }
    `);

    for (const task of tasksData.tasks) {
        await upsertLocalWithTimestampConflict("tasks", task);
    }
}

async function upsertLocalWithTimestampConflict(storeName, serverItem) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        const getReq = store.get(serverItem.id);
        console.log('serverItem.id');
        
        getReq.onsuccess = () => {
            const local = getReq.result;

            if (local) {
                if (local.pendingSync) {
                    // Conflict: compare updated_at
                    const localTs = new Date(local.updated_at).getTime();
                    const serverTs = new Date(serverItem.updated_at).getTime();

                    if (serverTs > localTs) {
                        // Server lebih baru → update local (but keep pending local update)
                        const merged = { ...local, ...serverItem };
                        store.put(merged);
                    }
                    // Jika local lebih baru → keep local pendingSync
                    // Conflict delete vs update: kita upsert tetap ke server nanti
                } else {
                    // Tidak pending → update lokal
                    const updated = { ...serverItem, pendingSync: false, operation: null };
                    store.put(updated);
                }
            } else {
                // Item belum ada lokal → insert
                const newItem = { ...serverItem, pendingSync: false, operation: null };
                store.put(newItem);
            }
        };

        tx.oncomplete = resolve;
        tx.onerror = reject;
    });
}

/**
 * Push all pending items to server
 */
async function pushPendingLocal() {
    console.log("[Sync] Pushing pending projects...");
    const pending = await self.idbPending.getPendingItems("projects");
    const pendingProjects = pending.projects

    for (const project of pendingProjects) {
        await syncProject(project);
    }

    console.log("[Sync] Pushing pending tasks...");
    const pendingTasks = pending.tasks
    for (const task of pendingTasks) {
        await syncTask(task);
    }
}

/**
 * Sync a single project to server
 */
async function syncProject(project) {
    const vars = project;

    if (project.operation === "create") {
        await self.gql.graphQLRequest(`
            mutation ($id: ID, $name: String!, $description: String!) {
                createProject(id: $id, name: $name, description: $description) {
                    id
                }
            }
        `, vars);
    } else if (project.operation === "update") {
        await self.gql.graphQLRequest(`
            mutation ($id: ID, $name: String!, $description: String!) {
                upsertProject(id: $id, name: $name, description: $description) {
                    id
                }
            }
        `, vars);
    } else if (project.operation === "delete") {
        await self.gql.graphQLRequest(`
            mutation Mutation($id: ID!) {
                deleteProject(id: $id) {
                    id
                }
            }
        `, vars);
    }

    // hapus flag pendingSync setelah berhasil
    await self.idbPending.markAsSynced("projects", project.id);
}

/**
 * Sync a single task to server
 */
async function syncTask(task) {
    const vars = task;

    if (task.operation === "create" || task.operation === "update" || task.operation === "delete") {
        await self.gql.graphQLRequest(`
            mutation (
                $id: ID
                $project_id: ID!
                $name: String!
                $due: String!
                $description: String
                $priority: Priority
                $finished: Boolean
            ) {
                upsertTask(
                    id: $id
                    project_id: $project_id
                    name: $name
                    due: $due
                    description: $description
                    priority: $priority
                    finished: $finished
                ) { id }
            }
        `, vars);
    }

    await self.idbPending.markAsSynced("tasks", task.id);
}

/**
 * Export for SW message trigger
 */
self.runSyncManager = runSyncManager;