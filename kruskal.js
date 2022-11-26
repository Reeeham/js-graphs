//dependant on Graph, QuickSort, DisjointSet

export default function kruskal(graph) {
    if(graph.isDirected) {
        throw new Error('Kruskal algo works only for undirected graphs');
    }

    const minimumSpanningTree = new Graph(); //new graph that will contain minimum spanning tree of original graph

    //sort all graph edges in increasing order
    const sortingCallbacks = {
        compareCallback: (graphEdgeA, graphEdgeB) => {
            if(graphEdgeA.weight === graphEdgeB.weight) {
                return 1;
            }
            return graphEdgeA.weight <= graphEdgeB.weight ? -1 : 1;
        }
    };

    const sortedEdges = new QuickSort(sortingCallbacks).sort(graph.getAllEdges());

    const keyCallback = (graphVertex) => graphVertex.graphVertex.getKey();
    const disjointSet = new DisjointSet(keyCallback);

    graph.getAllVertices().forEach(graphVertex => {
        disjointSet.makeSet(graphVertex);
    });

    for(let edgeIndex = 0; edgeIndex < sortedEdges.length; edgeIndex++) {
        const currentEdge = sortedEdges[edgeIndex];
        if(!disjointSet.inSameSet(currentEdge.startVertex, currentEdge.endVertex)) {
            disjointSet.union(currentEdge.startVertex, currentEdge.endVertex);
            minimumSpanningTree.addEdge(currentEdge);
        }
    }

    return minimumSpanningTree;
}