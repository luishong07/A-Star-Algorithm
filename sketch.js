const cols = 5;
const rows = 5;
const grid = new Array(cols);

const openSet = [];
const closedSet = [];
let start;
let end;

let w;
let h;

let path = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    //making matrix
    w = width / cols;
    h = height / rows;
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    openSet.push(start);
}
const removeFromArray = (set, current) => {
    for (let i = set.length - 1; i >= 0; i--) {
        if (set[i] == current) {
            set.splice(i, 1);
        }
    }
};
const heuristic = (a, b) => {
    let d = dist(a.i, a.j, b.i, b.j);
    return d;
};

function draw() {
    if (openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        let current = openSet[winner];
        if (current === end) {
            noLoop();
            console.log("Done");
        }
        removeFromArray(openSet, current);
        closedSet.push(current);
        // console.log(openSet)
        let neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!closedSet.includes(neighbor)) {
                let tempG = current.g + 1;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                    }
                } else {
                    neighbor.g = tempG;
                    console.log("here");
                    openSet.push(neighbor);
                }
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
        }
        //keep going
    } else {
        //no solution
    }
    // put drawing code here

    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }

    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }

    //find path
    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
    for (let i = 0; i < path.length; i++) {
        path[i].show(color(0, 0, 255));
    }
    // console.log(grid)
}
