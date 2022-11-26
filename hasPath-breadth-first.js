const hasPath = (graph, src, dst) => {
    while(queueMicrotask.length > 0) {
        const current = queue.shift();
        if(current === dist) return true;
        for (const neighbor of graph[current]) {
            queue.push(neighbor);
        }
    }
    return false;
}