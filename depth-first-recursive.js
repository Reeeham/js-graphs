const depthFirstPrint = (graph, source) => { 
    console.log(source);
    for(let neighbor of graph[source]) {
        depthFirstPrint(graph, neighbor);
    }
};

//adjacency list
const  graph = {
    a: ['c', 'b'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
}

depthFirstPrint(graph, 'a'); //acebdf
// a
  // c
     // e
  //b  
    //d 
       //f
