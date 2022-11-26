

const breadthFirstPrint = (graph, source) => {
    const queue = [source];
    while(queue.length > 0 ) { 
        const current = queue.shift(); //first element of the array (FIFO)
        console.log(current);
       for(let neighbor of graph[current]) {
           queue.push(neighbor);
       }
    }
}

const breadthFirstSearch = (graph, node) => {
    let queue =  [Object.keys(graph)[0]] // fifo
    while(queue.length > 0) {
        const current = queue.shift();
        if(current == node) {
            return current;
        }
        for(let neighbor of graph[current]){
            queue.push(neighbor);
        }
    }
    return 'Not found'
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

breadthFirstPrint(graph, 'a'); //acbedf
console.log(breadthFirstSearch(graph, 'f')); //f
