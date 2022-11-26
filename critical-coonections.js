/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
 var criticalConnections = function(n, connections) {
    let edgeMap = {}
    for (let i = 0; i < n; i++)
        edgeMap[i] = [] 
    for (let [a,b] of connections)
        edgeMap[a].push(b), edgeMap[b].push(a)
    let disc = new Array(n), low = new Array(n),
        time = 1, ans = []
    const dfs = (curr, prev) => {  
        disc[curr] = low[curr] = time++
        for (let next of edgeMap[curr]) { 
            if (!disc[next]) {  
                dfs(next, curr) 
                low[curr] = Math.min(low[curr], low[next])
            } else if (next !== prev) 
                low[curr] = Math.min(low[curr], disc[next]) 
            if (low[next] > disc[curr])  
                ans.push([curr, next])
        }
    }
    dfs(0, -1)
    return ans
};

const n = 4, connections = [[0,1],[1,2],[2,0],[1,3]];
console.log(criticalConnections(n, connections).entries());