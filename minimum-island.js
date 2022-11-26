
const exploreSize = (grid, r, c, visited) => {
    const rowInbounds = 0 <= r && r < grid.length;
    const colInbounds = 0 <= c && c < grid[0].length;
    if (!rowInbounds || !colInbounds) return 0;
  
    if (grid[r][c] === "w") return 0;
  
    const pos = r + "," + c;
    if (visited.has(pos)) return 0;
    visited.add(pos);
  
    let size = 1;
    size += exploreSize(grid, r - 1, c, visited);
    size += exploreSize(grid, r + 1, c, visited);
    size += exploreSize(grid, r, c - 1, visited);
    size += exploreSize(grid, r, c + 1, visited);
    return size;
  };

const minimumIsland = (grid) => {
  const visited = new Set();
  let minSize = Infinity;
  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid.length; c += 1) {
      const size = exploreSize(grid, r, c, visited);
      if (size > 0 && size < minSize) minSize = size;
    }
  }
  return minSize;
};


const grid = [
  ["w", "l", "w", "w", "w"],
  ["w", "l", "w", "w", "w"],
  ["w", "w", "w", "l", "w"],
  ["w", "w", "l", "l", "w"],
  ["l", "w", "w", "l", "l"],
  ["l", "l", "w", "w", "w"],
];

console.log(minimumIsland(grid)); // 2
