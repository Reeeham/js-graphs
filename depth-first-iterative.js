

const depthFirstPrint = (graph, source) => { // {} .'a'
    const stack  = [source];

    while(stack.length > 0) {
        const current = stack.pop();
        console.log(current);

        for(let neighbor of graph[current]) {
            stack.push(neighbor);
        }
    }
}

//adjacency list
const  graph = {
    a: ['c', 'b'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
}

depthFirstPrint(graph, 'a');