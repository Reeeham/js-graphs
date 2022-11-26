// acyclic graph = no cyclic
const acyclicGraph = { 'f' : [g, i],
  'g' : [h],
  'h' : [],
  'i' : [g, k],
  'j': [i],
  'k': []
}

// can we travel from src:f to dst: k
//using depth/breadth first search
// n= # of nodes
// e= # of edges
// time: O() // i wil travel through every edge
// space : O(n)


// n= # of nodes
// n^2 = # of edges
// time: O(n^2)
// space: O(n)

const hasPath = (graph, src, dst) => {
    if(src === dst) return true;
   for(let neighbor of graph[src]) {
      if(hasPath(graph, neighbor, dst)) return true;
   }
   return false;
}