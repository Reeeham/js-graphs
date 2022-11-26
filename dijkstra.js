const shortestDistanceNode = (distances, visited) => {
    let shortest = null;
    for(let node in distances) {
        let currentIsShortest = shortest === null || distances[node] < distances[shortest];
        if(currentIsShortest && !visited.includes(node)) {
            shortest = node;
        }
    }
    return shortest;
}
const findShortestPath = (graph, startNode, endNode) => {
    //track distances from the start node using a hash object 
    let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, graph[startNode]);

    //track paths using a hash object
    let parents = {endNode: null};

    for(let child in graph[startNode]) { 
        parents[child] = startNode;
    }

    //collect visited nodes
    let visited = [];

    //find the nearest node
    let node = shortestDistanceNode(distances, visited);

    while(node) {
        // find its distance from the start node & its child nodes
        let distance = distances[node];
        let children = graph[node];

        //for each of those child nodes 
        for(let child in children) {
            //make sure each child node is not the start node
            if(child === startNode) {
                continue;
            } else {
                // save the distance from the start node to the child node
                let newdistance = distance + children[child];
                //if there's no recorded distance from the start node to the child node in the distances object
                // or if the recorded distance is shorter than the previously stored distance from the start node 
                // to the child node
                if(!distances[child] || distances[child] > newdistance) {
                    // save the distance to the object
                    distances[child] = newdistance;
                    //record the path
                    parents[child] = node;
                }
            }
        }
        //move the current node to the visited set
        visited.push(node);
        //move to the nearest neighbor node
        node = shortestDistanceNode(distances, visited);
    }
        //using the stored paths from start node to end node
        // record the shortest path
        let shortestPath = [endNode];
        let parent = parents[endNode];
        while(parent) {
            shortestPath.push(parent);
            parent = parents[parent];
        }
        //this is the shortest path
        shortestPath.reverse();

        // return the shhortest path & the end node's distance from the start node 
        let result = {
            distance: distances[endNode],
            path: shortestPath
        };
        return result;
    }


const graph = {
	start: { A: 5, B: 2 },
	A: { start: 1, C: 4, D: 2 },
	B: { A: 8, D: 7 },
	C: { D: 6, end: 3 },
	D: { end: 1 },
	end: {},
};
const shortestPath = findShortestPath(graph, 'start', 'end');
console.log(shortestPath)
