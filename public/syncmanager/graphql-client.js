function sendRefreshSignalToClient() {
    self.clients.matchAll({ includeUncontrolled: true, type: 'window' })
        .then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'TOKEN_EXPIRED_REQUEST_REFRESH'
                });
            });
        });
}

async function graphQLRequest(query, variables = {}) {
    const res = await fetch("https://api.projectbase.space/todoapp/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${self.jwtToken}`
        },
        body: JSON.stringify({ query, variables })
    });

    if (res.status === 401) {
        sendRefreshSignalToClient();
        throw new Error("Token expired, refresh required.");
    }

    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    return json.data;
}




self.gql = { graphQLRequest };
