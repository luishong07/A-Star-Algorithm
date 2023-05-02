// An object to describe a spot in the grid
class Spot {
    // Location
    constructor(i, j) {
        this.i = i;
        this.j = j;

        // f, g, and h values for A*
        this.f = 0;
        this.g = 0;
        this.h = 0;

        // Neighbors
        this.neighbors = [];

        // Where did I come from?
        this.previous = undefined;

        // Am I a wall?
        this.wall = false;
        if (random(1) < 0.4) {
            this.wall = true;
        }
    }

    showGrid(){
        noFill()
        stroke(0)
        rect(this.i * w, this.j * h, w, h);
    }

    // Display me
    show(col) {
        if (this.wall) {
            fill(0);
            noStroke();
            ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
        } else if (col) {
            fill(col);
            // stroke('red')
            rect(this.i * w, this.j * h, w, h);
        }
        
    }

    // Figure out who my neighbors are
    addNeighbors(grid) {
        var i = this.i;
        var j = this.j;
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1]);
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1]);
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1][j + 1]);
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbors.push(grid[i + 1][j + 1]);
        }
    }
}
