class GraphEdge{
    constructor(startVertex, endVertex, weight = 0) {
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
    }
    getKey() {
        const startVertexKey = this.startVertex.getKey();
        const endVertexKey = this.endVertex.getKey();
        return `${startVertexKey}_${endVertexKey}`;
    }

    reverse() {
        const temp = this.startVertex;
        this.startVertex = this.endVertex;
        this.endVertex = temp;
        return this;
    }

    toString() {
        return this.getKey();
    }
}
class GraphVertex {
    constructor(value) {
        if(value == undefined) {
            throw new Error('Graph vertex must have a value');
        }

        const edgeComparator = (edgeA, edgeB) => {
            if(edgeA.getKey() === edgeB.getKey()) {
                return 0;
            }
            return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
        }
        this.value = value;
        this.edges = new LinkedList(edgeComparator);
    }

    addEdge(edge) {
        this.edges.append(edge);
        return this;
    }
    deleteEdge(edge) {
        this.edges.delete(edge);
    }

    getNeighbors() {
        const edges = this.edges.toArray();
        const neighborsConverter = (node) => {
            return node.value.startVertex == this ? node.value.endVertex : node.value.startVertex;
        };
        return edges.map(neighborsConverter);
    }

    getEdges() {
        return this.edges.toArray().map((linkedListNode) => linkedListNode.value);
    }
    getDegree() {
        return this.edges.toArray().length;
    }
    hasEdge(requiredEdge) {
        const edgeNode = this.edges.find({
            callback: (edge) =>  edge === requiredEdge
        });
        return !!edgeNode;
    }
    hasNeighbor(vertex) {
        const vertexNode = this.edges.find({
            callback: (edge) => edge.startVertex === vertex || edge.endVertex === vertex
        });

        return !!vertexNode;
    }
    findEdge(vertex) {
        const edgeFinder = (edge) => {
            return edge.startVertex === vertex || edge.endVertex === vertex
        };

        const edge = this.edges.find({callback: edgeFinder});

        return edge ? edge.value : null;
    }
    getKey() {
        return this.value;
    }

    deleteAllEdges() {
        this.getEdges().forEach((edge) => this.deleteEdge(edge));
        return this;
    }

    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`
    }
}
class Graph {
    constructor(isDirected = false) {
        this.vertices = {};
        this.edges = {};
        this.isDirected = isDirected;
    }

    addVertex(newVertex) {
        this.vertices[newVertex.getKey()] = newVertex;
        return this;
    }

    getVertexByKey(vertexKey) {
        return this.vertices[vertexKey];
    }

    getNeighbors(vertex) {
        return vertex.getNeighbors();
    }

    getAllVertices() {
        return Object.values(this.vertices);
    }
    getAllEdges() {
        return Object.values(this.edges);
    }

    addEdge(edge) {
        let startVertex = this.getVertexByKey(edge.startVertex.getKey());
        let endVertex = this.getVertexByKey(edge.endVertex.getKey());

        if(!startVertex) {
            this.addVertex(edge.startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.getKey());
        }
        if(!endVertex) {
            this.addVertex(edge.endVertex);
            endVertex = this.getVertexByKey(edge.endVertex.getKey());
        }

        if(this.edges[edge.getKey()]) {
            throw new Error('Edge has already been added before');
        } else {
            this.edges[edge.getKey()] = edge;
        }

        if(this.isDirected) {
            startVertex.addEdge(edge);
        }else {
            startVertex.addEdge(edge);
            endVertex.addEdge(edge);
        }

        return this;
    }
    deleteEdge(edge) {
        if(this.edges[edge.getKey()]) {
            delete this.edges[edge.getKey()];
        }else {
            throw new Error('Edge not found in graph');
        }
        const startVertex = this.getVertexByKey(edge.startVertex.getKey());
        const endVertex = this.getVertexByKey(edge.endVertex.getKey());

        startVertex.addEdge(edge);
        endVertex.addEdge(edge);
    }

    findEdge(startVertex, endVertex) {
        const vertex = this.getVertexByKey(startVertex.getKey());

        if(!vertex) {
            return null;
        }
        return vertex.findEdge(endVertex);
    }

    getWeight() {
        return this.getAllEdges().reduce((weight, graphEdge) => {
            return weight + graphEdge.weight
        }, 0);
    }
    reverse() {
        this.getAllEdges().forEach((edge) => {
            this.deleteEdge(edge);
            edge.reverse();
            this.addEdge(edge);
        });

        return this;
    }

    getVerticesIndices() {
        const verticesIndices = {};
        this.getAllVertices().forEach((vertex, index) => {
            verticesIndices[vertex.getKey()] = index;
        });
        return verticesIndices;
    }

    getAdjacencyMatrix() {
        const vertices = this.getAllVertices();
        const verticesIndices = this.getVerticesIndices();

        const adjacencyMatrix = Array(vertices.length).fill(null).map( () => {
            return Array(vertices.length).fill(Infinity);
        });
        vertices.forEach((vertex, vertexIndex) => {
            vertex.getNeighbors().forEach((neighbor) => {
                const neighborIndex = verticesIndices[neighbor.getKey()];
                adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
            });
        });
        return adjacencyMatrix;
    }

    toString() {
        return Object.keys(this.vertices).toString();
    }
}