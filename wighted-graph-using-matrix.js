class Graph {
    constructor(size = 1) {
        this.size = size;
        this.matrix = [];
        for(let i =0; i < size; i++) {
            this.matrix.push([]);
            for(let j =0; j < size; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    addEdge(vertex1, vertex2, weight = 1) {
        if(vertex1 > this.size  || vertex2 > this.size ) {
            console.log('invalid vertex');
        } else if(vertex1 === vertex2) {
            console.log('same vertex');
        } else {
            this.matrix[vertex1][vertex2] = weight;
            this.matrix[vertex2][vertex1] = weight;
        }
    }
    removeEdge(vertex1, vertex2) {
        if(vertex1 > this.size || vertex2 > this.size) {
            console.log('invalid vertex');
        } else if(vertex1 === vertex2) {
            console.log('same vertex');
        } else {
            this.matrix[vertex1][vertex2] = 0;
            this.matrix[vertex2][vertex1] = 0;
        }
    }
    addVertex() {
      
        this.matrix.push([]);
        this.size++;
        for(let i = 0; i <  this.size - 1; i++) {
            this.matrix[i][this.size - 1] = 0; //  0,0 0,1 0,2
            this.matrix[this.size - 1][i] = 0; // 2,0 2,1 2,2
        }
    }

    removeVertex(vertex) {
        // we need to remove a specific vertex
        //validate the input first 
        if(vertex < 0 || vertex >  this.size -1) {
            console.log('invalid index');
        }else {
            while(vertex  < size - 1){
                for(let i = 0; i < size - 1; i++) {
                    this.matrix[i][vertex] = this.matrix[i][vertex + 1];
                }
                for(let i = 0; i < size -1; i++) {
                    this.matrix[vertex][i] = this.matrix[vertex + 1][i];
                }
                vertex++;
            }
            this.matrix.pop();
            this.size--;
        }
    }

    printMatrix() {
        for(let i = 0; i < this.size; i++) {
            let row = '';
            for(let j = 0; j < this.size; j++) {
                row += ` ${this.matrix[i][j]}`;
            }
            console.log(row);
        }
    }


}
let g = new Graph();
g.addVertex(1)
g.addVertex(2)
g.addVertex(3)
g.addVertex(4)
g.addEdge(1,3,-2)
g.addEdge(3,4,2)
g.addEdge(4,2,-1)
g.addEdge(2,1,4)
g.addEdge(2,3,3)
g.printMatrix()