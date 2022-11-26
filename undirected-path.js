

const graph = {
    'i' : ['j', 'k'],
    'j': ['i'],
    'k': ['i','m','l'],
    'm': ['k'],
    'l': ['k'],
    'o': ['n'],
    'n': ['o']

};
const edges = [
    ['i','j'],
    ['k','i'],
    ['m','k'],
    ['k','l'],
    ['o','n']
]
const undirectedPath = (edges, nodeA, nodeB) => {
    const graph = buildGraph(edges);
    //Set O(1) to check if the element is exist or not instead of using array because array is O(n)
    return hasPath(graph, nodeA, nodeB, new Set());
}
// edges is some 
const buildGraph = (edges) => {
    const graph = {};
    for(let edge of edges) {
        const [a, b] = edge; // returns array of 2 nodes in each element in the array 
        if(!(a in graph)) graph[a] = [];
        if(!(b in graph)) graph[b] = [];
        graph[a].push(b);
        graph[b].push(a);
    }
    return graph;
}

const hasPath = (graph, src, des, visited) => { 
    if(src  === des) return true;
    if(visited.has(src)) return false;
    visited.add(src);
    for(let neighbor of graph[src]) {
       if(hasPath(graph, neighbor, des, visited)) return true;
    }
    return false;
}

console.log(undirectedPath(edges, 'i', 'j'));