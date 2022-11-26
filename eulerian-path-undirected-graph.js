class Graph {
    constructor(v) {
        this.V = v;
        this.adj = new Array(v);
        for(let i = 0; i < v; ++i) {
            this.adj[i] = [];
        }
    }

    addEdge(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
    }

    DFSUtil(v, visited) {
        visited[v] = true;
        for(let i of this.adj[v]) {
            let n = i;
            if(!visited[n]) {
                this.DFSUtil(n, visited);
            }
        }
    }

    //method to check if all non-zero degree vertices are connected
    //it mainly does DFS Traversal 
    isConnected() {
        let visited = new Array(this.V);
        let i; 
        //mark all the vertices as not visited
        for(i =0; i < this.V; i++) {
            visited[i] = false;
        }
        //find a vertex with non-zero degree
        for(i = 0; i <  this.V; i++) {
            if(this.adj[i].length != 0) {
                break;
            } 
        }
        // if there are no edges in the graph, return true
        if( i == this.V) {
            return true;
        }

        //start DFS traversal from a vertex with non-zero degree
        this.DFSUtil(i, visited);

        //check if all non-zero degree vertices are visited
        for(i = 0; i < this.V; i++) {
            if(visited[i] === false && this.adj[i].length > 0){
                return false;
            }
        }
        return true;
    }

    /**
     * function returns one of the following values 
     *  0 --> If graph is not eulerian
     *  1 --> If graph has an Eular path (semi-eulerian)
     *  2 --> If graph has an euler circuit(Eulerian)
     */
    isEulerian() {
        // check if all non-zero degree vertices are connected
        if(this.isConnected() == false) {
            return 0;
        }

        //count vertices with odd degree 
        let odd = 0;
        for(let i =0; i < this.V; i++) {
            if(this.adj[i].length % 2 != 0){
                odd++;
            }
        }
        // if count is more than 2 then graph is not eulerian 
        if(odd > 2) {
            return 0;
        }

        // if odd count is 2, then is semi eulerian
        // if odd count is 0 then eulerian
        // note that odd count can never be 1 for undirected graph
        return (odd == 2) ? 1 : 2;
    }
     // Function to run test cases
     test()
     {
         let res = this.isEulerian();
         if (res == 0)
             console.log("graph is not Eulerian<br>");
         else if (res == 1)
             console.log("graph has a Euler path<br>");
         else
            console.log("graph has a Euler cycle<br>");
     }

}

let g1 = new Graph(5);
g1.addEdge(1, 0);
g1.addEdge(0, 2);
g1.addEdge(2, 1);
g1.addEdge(0, 3);
g1.addEdge(3, 4);
g1.test();
 
let g2 = new Graph(5);
g2.addEdge(1, 0);
g2.addEdge(0, 2);
g2.addEdge(2, 1);
g2.addEdge(0, 3);
g2.addEdge(3, 4);
g2.addEdge(4, 0);
g2.test();
 
let g3 = new Graph(5);
g3.addEdge(1, 0);
g3.addEdge(0, 2);
g3.addEdge(2, 1);
g3.addEdge(0, 3);
g3.addEdge(3, 4);
g3.addEdge(1, 3);
g3.test();
 
// Let us create a graph with 3 vertices
// connected in the form of cycle
let g4 = new Graph(3);
g4.addEdge(0, 1);
g4.addEdge(1, 2);
g4.addEdge(2, 0);
g4.test();
 
// Let us create a graph with all vertices
// with zero degree
let g5 = new Graph(3);
g5.test();