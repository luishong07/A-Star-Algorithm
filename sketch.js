let cols = 5;
let rows = 5;
//closedset stores the nodes that are finished being evaluated
let closedSet = [];
//openset are nodes that need to be evaluated
let openSet = [];
let grid = new Array(cols);
let start;
let end;

let w
let h
function setup() {
    createCanvas(windowWidth, windowHeight);
    w = width/ cols
    h = height / rows
    //2d array
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i,j);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    openSet.push(start)
}

function draw() {

    if(openSet.length>0){
        //we keep going
    }else{
        //no solution
    }
    background(0);

    for(let  i = 0; i< cols;i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].show()
        }
    }
}
