class HamiltonianCycle {
    constructor() {
      this.V = 5;
      this.path = [];
    }

    isSafe(v, graph, path, pos) {

      if (graph[path[pos - 1]][v] == 0) return false;

      for (var i = 0; i < pos; i++) if (path[i] == v) return false;

      return true;
    }


    hamCycleUtil(graph, path, pos) {

      if (pos == this.V) {

        if (graph[path[pos - 1]][path[0]] == 1) return true;
        else return false;
      }


      for (var v = 1; v < this.V; v++) {

        if (this.isSafe(v, graph, path, pos)) {
          path[pos] = v;


          if (this.hamCycleUtil(graph, path, pos + 1) == true) return true;

          
          path[pos] = -1;
        }
      }

      return false;
    }

    hamCycle(graph) {
      this.path = new Array(this.V).fill(-1);
      this.path[0] = 0;
      if (this.hamCycleUtil(graph, this.path, 1) == false) {
        console.log("<br>Solution does not exist");
        return 0;
      }

      this.printSolution(this.path);
      return 1;
    }


    printSolution(path) {
    
        let result = path.map(x => x.toString()).join(", ") + ", " + path[0];
        console.log(result)
    }
  }
  // Driver code
  var hamiltonian = new HamiltonianCycle();

  var graph1 = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ];

  // Print the solution
  hamiltonian.hamCycle(graph1);