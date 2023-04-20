let cols = 5;
let rows = 5;
//closedset stores the nodes that are finished being evaluated
let closedSet = [];
//openset are nodes that need to be evaluated
let openSet = [];
let grid = new Array(cols);
let start;
let end;

let w;
let h;
function setup() {
    createCanvas(windowWidth, windowHeight);
    w = width / cols;
    h = height / rows;
    //2d array
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

function removeFromArray(arr, element) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if(arr[i]== element){
            arr.splice(i, 1); 
        }
    }
}

function heuristic(a,b){
    let d = dist(a.i,a.j,b.i,b.j)
    return d
}


function draw() {
    if (openSet.length > 0) {
        //we keep going
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner]) {
                winner = i;
            }
        }

        let current = openSet[winner];

        if (current == end) {
            console.log("Done");
        }
        removeFromArray(openSet, current);
        closedSet.push(current);

        let neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            if (!closedSet.includes(neighbor)) {
                let tempG = current.g + 1;

                if (openSet.includes(neighbor)) {
                    if(tempG < neighbor.g){
                        neighbor.g = tempG
                    }
                }else{
                    neighbor.g = tempG
                    openSet.push(neighbor)
                }

                neighbor.h = heuristic(neighbor, end)
                neighbor.f = neighbor.g + neighbor.h

                
            }
        }
    } else {
        //no solution
    }
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

    console.log(grid);
}
