class Graph { 
    constructor(v){
        this.V = v;
        this.adj = new Array(v);
        this.NIL = -1;
        this.time = 0;
        for(let i = 0; i < v; i++){
            this.adj[i] = [];
        }
    }
    addEdge(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
    }
    bridgeUtil(u, visited, disc, low , parent) {
        visited[u] = true;
        disc[u] = low[u] = ++this.time;

        for(let i  of this.adj[u]) {
            let v = i;
            if(!visited[v]) {
                parent[v] = u;
                this.bridgeUtil(v, visited, disc, low, parent);
                low[u] = Math.min(low[u], low[v]);
                if(low[v] > disc[u])
                    console.log(u + " " + v + "\n");

            }else if(v != parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }

    bridge() {
        let visited = new Array(this.V);
        let disc = new Array(this.V);
        let low = new Array(this.V);
        let parent = new Array(this.V);

        for (let i = 0; i < this.V; i++) {
           parent[i] = this.NIL;
           visited[i] = false;
            
        }
        for (let i = 0; i < this.V; i++) {
           if(visited[i] == false) {
            this.bridgeUtil(i, visited, disc, low, parent);
           }
            
        }
    }

}

console.log("Bridges in graph \n");
let g1 = new Graph(5);
g1.addEdge(1, 0);
g1.addEdge(0, 2);
g1.addEdge(2, 1);
g1.addEdge(0, 3);
g1.addEdge(3, 4);
g1.bridge();