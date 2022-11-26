class Graph { 
    constructor(v) {
        this.vertex = v;
        this.adj = new Array(v);
        this.NIL = -1;
        this.time = 0;
        for(let i = 0; i< v; ++i) {
            this.adj[i] =  [];
        }

    }

    addEdge(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
    }

    // arecursive function that find articulation points using DFS
    // u --> the vertex to be visited next 
    // visited[]  -> keeps track of visited vertices 
    //disc[] ->  stores discovery times of visited vertices
    // parent[] -> stores parent vertices in DFS tree
    // ap[] -> store articulation points
    APUtil(u, visited, disc, low, parent, ap) {
        let children = 0; //children count in dfs tree
        visited[u] = true;
        disc[u] = low[u] = ++this.time;
        for(let i of this.adj[u]) {
            let v = i; // v is current adjacent of u 
            //if v is not visited yet, then make it a child of u
            // in dfs  tree and recur for it 
            if(!visited[v]) {
                children++;
                parent[v] = u;
                this.APUtil(v, visited, disc,low, parent, ap);

                //check if the subtree rooted with v has a connection 
                // one of the ancestors of u 
                low[u] = Math.min(low[u], low[v]);
                //u is root of dfs tree and has two or more children 
                if(parent[u] == this.NIL && children > 1){
                    ap[u] = true;
                }
                // if u is not root and low value of one of its children is more than 
                //disc value of u 
                if(parent[u] != this.NIL && low[v] >= disc[u]) {
                    ap[u] = true;
                }
            } else if(v != parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }

        }
    }
     // The function to do DFS traversal. It uses recursive function APUtil()
     AP()
     {
         // Mark all the vertices as not visited
         let visited = new Array(this.V);
         let disc = new Array(this.V);
         let low = new Array(this.V);
         let parent = new Array(this.V);
         let ap = new Array(this.V); // To store articulation points
   
         // Initialize parent and visited, and ap(articulation point)
         // arrays
         for (let i = 0; i < this.V; i++)
         {
             parent[i] = this.NIL;
             visited[i] = false;
             ap[i] = false;
         }
   
         // Call the recursive helper function to find articulation
         // points in DFS tree rooted with vertex 'i'
         for (let i = 0; i < this.V; i++)
             if (visited[i] == false)
                 this.APUtil(i, visited, disc, low, parent, ap);
   
         // Now ap[] contains articulation points, print them
         for (let i = 0; i < this.V; i++)
             if (ap[i] == true)
                console.log(i+" ");
     }
 }
  
 // Driver method
 // Create graphs given in above diagrams
console.log("Articulation points in first graph  <br>");
 let g1 = new Graph(5);
 g1.addEdge(1, 0);
 g1.addEdge(0, 2);
 g1.addEdge(2, 1);
 g1.addEdge(0, 3);
 g1.addEdge(3, 4);
 g1.AP();
console.log("<br>");
  
console.log("Articulation points in Second graph <br>");
 let g2 = new Graph(4);
 g2.addEdge(0, 1);
 g2.addEdge(1, 2);
 g2.addEdge(2, 3);
 g2.AP();
console.log("<br>");
  
console.log("Articulation points in Third graph  <br>");
 let g3 = new Graph(7);
 g3.addEdge(0, 1);
 g3.addEdge(1, 2);
 g3.addEdge(2, 0);
 g3.addEdge(1, 3);
 g3.addEdge(1, 4);
 g3.addEdge(1, 6);
 g3.addEdge(3, 5);
 g3.addEdge(4, 5);
 g3.AP();