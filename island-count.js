//if you undirected graph always guard it with visited set
const islandCount = (grid) => {
  const visited = new Set();
  let count = 0;
  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid[0].length; c += 1) {
     if( explore(grid, r, c, visited) === true) {
         count += 1;
     } 
    }
  }
  return count;
};

const explore = (grid, r, c, visited) => {
  const rowInbounds = 0 <= r && r < grid.length;
  const colInbouunds = 0 <= c && c < grid.length;
  if (!rowInbounds || !colInbouunds) return false;
  if (grid[r][c] === "w") return false;
  const pos = r + "," + c;
  if (visited.has(pos)) return false;
  visited.add(pos);
  explore(grid, r - 1, c, visited); // up
  explore(grid, r + 1, c, visited); //down
  explore(grid, r, c + 1, visited); //right
  explore(grid, r, c - 1, visited); //left

  return true; // i just finih exploring a brand new island and i need to count it.
};

//  const s = new Set();
//  s.add([1, 3]);
//  console.log(s.has([1,3]));

//r =12
//c=4
//pos = '124'

//r= 1
//c = 24
//pos= '124'



const grid = [
    ['w', 'l','w', 'w', 'w'],
    ['w', 'l','w', 'w', 'w'],
    ['w', 'w','w', 'l', 'w'],
    ['w', 'w','l', 'l', 'w'],
    ['l', 'w','w', 'l', 'l'],
    ['l', 'l','w', 'w', 'w'],
];

console.log(islandCount(grid)); // 3