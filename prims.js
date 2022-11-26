export function prim(graph) {

    if(graph.isDirected) 
        throw new Error('Prim\'s algorithms works only for undirected graph');
    
        const minimumSpanningTree = new Graph();

        const edgesQueue = new PriorityQueue();

        const visitedVertices = {};

        const startVertex = graph.getAllVertices()[0];

        visitedVertices[startVertex.getKey()] = startVertex;

        startVertex.getEdges().forEach((graphEdge) => {
            edgesQueue.add(graphEdge, graphEdge.weight);
        });

        //now let's explore all queued edges
        while(!edgesQueue.isEmpty()) {
            //fetch next queued edgewith minimal weight
            const currentMinEdge = edgesQueue.poll();

            //find out the next unvisited minimal vertex to traverse
            let nextMinVertex = null;

            if(!visitedVertices[currentMinEdge.startVertex.getKey()]) {
                nextMinVertex = currentMinEdge.startVertex;
            }else if(!visitedVertices[currentMinEdge.endVertex.getKey()]) {

            }

            // if all lvertices of current edge has already been visited then skip this round
            if(nextMinVertex) {
                //add current edge to MST
                minimumSpanningTree.addEdge(currentMinEdge);

                // add vertex to the set of visited ones
                visitedVertices[nextMinVertex.getKey()] = nextMinVertex;

                // add all current vertex's edges to the queue
                nextMinVertex.getEdges().forEach((edge) => {
                    if(!visitedVertices[edge.startVertex.getKey()] || 
                    !visitedVertices[edge.endVertex.getKey()]) {
                        edgesQueue.add(edge, edge.weight);
                    }
                });

            }
        }

        return minimumSpanningTree;

}