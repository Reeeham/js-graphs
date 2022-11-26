let V; 
let adj = [];
function Graph(v)
{
    V=v;
    for (let i = 0; i < V; i++)
        adj.push([]);
}
function addEdge(source,dest)
{
    adj[source].push(dest);
}
  
function isCyclic()
{
    // Mark all the vertices as not visited and
        // not part of recursion stack
        let visited = new Array(V);
        let recStack = new Array(V);
        for(let i=0;i<V;i++)
        {
            visited[i]=false;
            recStack[i]=false;
        }
          
           
        // Call the recursive helper function to
        // detect cycle in different DFS trees
        for (let i = 0; i < V; i++)
            if (isCyclicUtil(i, visited, recStack))
                return true;
   
        return false;
}

function isCyclicUtil(i,visited,recStack)
{
        // Mark the current node as visited and
        // part of recursion stack
        if (recStack[i])
            return true;
   
        if (visited[i])
            return false;
               
        visited[i] = true;
   
        recStack[i] = true;
        let children = adj[i];
           
        for (let c=0;c< children.length;c++)
            if (isCyclicUtil(children, visited, recStack))
                return true;
                   
        recStack[i] = false;
   
        return false;
}

// Driver code
Graph(4);
addEdge(0, 1);
addEdge(0, 2);
addEdge(1, 2);
addEdge(2, 0);
addEdge(2, 3);
addEdge(3, 3);
  
if(isCyclic())
    console.log("Graph contains cycle");
else
    console.log("Graph doesn't "
                   + "contain cycle");
  



//detect cycle in graph
//1- make array foreach vertex 
//2- foreach edge in graph 
//3- find parents foreach two vertex in edge and if the two parents are equal then return true has cycle else union them 
//4- return false if for loop ended and there's no cycle is found




/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
//directed graph
 var canFinish = function(numCourses, prerequisites) {
    
    // Create and get adjacency list of prerequisites. This question
    // is effectively asking us to detect whether or not there is a cycle
    // in a directed graph. If there is a cycle, then it is impossible
    // to finish all the courses. If there is no cycle, then it is possible
    // to finish all the courses.
    const adjacencyList = createAdjacencyList(numCourses, prerequisites);
    
    // Create visited hash map. This is to keep track of all the nodes that
    // have already been visited.
    let visited = new Map();

    // Since this is a directed graph, we need to keep track of the backedges,
    // and check if a node exists in our back edges map to see if we have already
    // previously visited this node during the DFS. If we have, then a cycle exists.
    let backEdges = new Map();
    
    // Create adjacency list for prerequisites
    function createAdjacencyList() {
        // Initialize an adjacencylist object, to be the eventual adjacency list.
        const result = {};

        // Loop over all preqreuisites and create the adjacency list.
        for(let i = 0; i < prerequisites.length; i++) {
            let [course, prerequisite] = prerequisites[i];
            if(course in result) result[course].push(prerequisite);
            else result[course] = [prerequisite];
        }
              
        // Return the adjancency list back out.
        return result;
    }

    function isCyclicRecursive(currentNode) {
        // Add current node to visited.
        visited.set(currentNode, true);
        
        // Add current node to backedges.
        backEdges.set(currentNode, true);
        
        // Do a depth first search traversal
        // of this directed graph. If a node is found
        // in the back edges of any current traversal,
        // a cycle has been detected. Return true in
        // that case.
        let neighbours = adjacencyList[currentNode];
        if(neighbours) {
            for(const node of neighbours) {
                if(!visited.has(node)) {
                    if(isCyclicRecursive(node)) return true;
                } else if (backEdges.has(node)) return true;  
            }
        }
        
        backEdges.delete(currentNode);
        
        return false;
    }
    
    
    
    // Loop over all the source nodes. We will start with the first source node,
    // (0) and end at numCourses - 1.
    // If a cycle is detected, return FALSE, because it is impossible to take
    // all of the courses.
    for(let node in adjacencyList) {        
        if(!visited.has(node)) {
            if(isCyclicRecursive(node)) return false;                            
        }
    }
  
    return true;
};