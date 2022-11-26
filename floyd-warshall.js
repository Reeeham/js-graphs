
function floydWarshall(graph) {
  var dist = [];
  var size = graph.length;
  for(let i = 0; i < size; i++) {
    dist[i] = [];
    for(let j = 0; j < size; j++) {
        if(i === j) {
            dist[i][j] = 0;
        }else if(!isFinite(graph[i][j])) {
            dist[i][j] = Infinity;
        }else {
            dist[i][j] = graph[i][j];
        }
    }
  }

  for(let k = 0; k < size; k++) {
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            if(dist[i][j] > dist[i][k] + dist[k][j]) {
                dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }
  }
  return dist;
}

const graph = [[Infinity, Infinity, -2, Infinity],
               [4, Infinity, 3, Infinity], 
               [Infinity, Infinity, Infinity, 2], 
               [Infinity, -1, Infinity, Infinity]]
console.log(floydWarshall(graph));