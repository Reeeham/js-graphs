const edges = [
    ['w', 'x'],
    ['x', 'y'],
    ['z', 'y'],
    ['z', 'v'],
    ['w', 'v']
]
//breadth first search 
const shortestPath = (edges, nodeA, nodeB) => {
    const graph =  buildGraph(edges);
    console.log('graph', graph);
    const visited = new Set([nodeA]);
    const queue = [[nodeA, 0]];
    while(queue.length > 0) {
     const [node, distance] =  queue.shift();
     if(node === nodeB) return distance;
     for(let neighbor of graph[node]) {
         if(!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push([neighbor, distance + 1]);
         }
     }
    }
    return -1;
};

const buildGraph = (edges) => {
    const graph = {};
    for(let edge of edges) {
        const [a, b] = edge;
        if(!(a in graph)) graph[a] = [];
        if(!(b in graph)) graph[b] = [];
        graph[a].push(b);
        graph[b].push(a);
    }
    return graph;
}

// graph {
//     w: [ 'x', 'v' ],
//     x: [ 'w', 'y' ],
//     y: [ 'x', 'z' ],
//     z: [ 'y', 'v' ],
//     v: [ 'z', 'w' ]
//   }
console.log(shortestPath(edges, 'w', 'z')); // 2