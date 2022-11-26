class Graph
{
    // Constructor
    constructor(v)
    {
        this.V = v;
        this.adj = new Array(v);
         
        this.in=new Array(v);
        for (let i=0; i<v; ++i)
        {   
            this.adj[i] = [];
            this.in[i]=0;
        }
    }
     
    //Function to add an edge into the graph
    addEdge(v,w)
    {
        this.adj[v].push(w); 
        this.in[w]++;
         
    }
     
    // A recursive function to print DFS starting from v
    DFSUtil(v,visited)
    {
        // Mark the current node as visited
        visited[v] = true;
  
        let n;
  
        // Recur for all the vertices adjacent to this vertex
         
        for(let i of this.adj[v])
        {
            n = i;
            if (!visited[n])
                this.DFSUtil(n,visited);
        }
    }
     
    // Function that returns reverse (or transpose) of this graph
    getTranspose()
    {
        let g = new Graph(this.V);
        for (let v = 0; v < this.V; v++)
        {
            // Recur for all the vertices adjacent to this vertex
             
            for(let i of this.adj[v])
            {
                g.adj[i].push(v);
                (g.in[v])++;
            }
        }
        return g;
    }
     
    // The main function that returns true if graph is strongly
    // connected
    isSC()
    {
        // step 1: mark all the vertices as not visited for first dfs
        let visited = new Array(this.V);
        for(let i = 0; i < this.V; i++) {
            visited[i] = false;
        }

        // step 2 do dfs traversal starting from the first vertex
        this.DFSUtil(0, visited);

        // if dfs traversal doesn't visit all vertices , then return false
        for(let i = 0;i < this.V; i++) {
            if(!visited[i]) return false;
        }

        // step 3 create a reversed graph
        let gr =  this.getTranspose();

        //step 4 mark all the vertices as not visited ( for second dfs)
        for(let i = 0; i < this.V; i++) {
            visited[i] = false;
        }
        //step 5 do dfs for reversed graph starting from first vertex
        // starting vertex must be same starting point of first dfs
        gr.DFSUtil(0, visited);

        // if all vertices are not visited in secind DFS, then return false
        for(let i = 0; i< this.V; i++) {
            if(visited[i]=== false) return false;
        }
        return true;
    }
     
    /* This function returns true if the directed graph has a eulerian
       cycle, otherwise returns false  */
    isEulerianCycle()
    {
       if(this.isSC() == false) return false;

       //check if in degree and out degree of every vertex is same
       for(let i = 0; i < this.V; i++) {
        if(this.adj[i].length != this.in[i]) {
            return false;
        }
       }
       return true;
    }
}
 
let g = new Graph(5);
g.addEdge(1, 0);
g.addEdge(0, 2);
g.addEdge(2, 1);
g.addEdge(0, 3);
g.addEdge(3, 4);
g.addEdge(4, 0);
 
if (g.isEulerianCycle())
    console.log("Given directed graph is eulerian ");
else
    console.log("Given directed graph is NOT eulerian ");