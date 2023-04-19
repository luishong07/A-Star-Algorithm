const cols = 5;
const rows = 5;
const grid = new Array(cols);

const openSet = []
const closedSet = []
let start
let end

let w
let h
function setup() {
    createCanvas(windowWidth, windowHeight);
    //making matrix
	w = width/cols
	h = height/rows
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i,j)

		}
    }
	for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid)
			
		}
    }

	start = grid[0][0]
	end = grid[cols-1][rows-1]

	openSet.push(start)

}
const removeFromArray= (set, current)=>{
	for(let i = set.length-1; i >=0 ; i--){
		if(set[i]==current){
			set.splice(i,1)
		}
	}
}

function draw() {
	if(openSet.length > 0){
		let winner = 0
		for(let i = 0; i < openSet.length; i++){
			if(openSet[i].f < openSet[winner].f){
				winner = i
			}
		}
		let current = openSet[winner]
		if(current == end){
			console.log('Done')
		}
		removeFromArray(openSet, current)
		closedSet.push(current)
		
		let neighbors = current.neighbors
		for(let i = 0; i < neighbors.length; i++){
			let neighbor = neighbors[i]
			if(!closedSet.includes(neighbor)){
				let tempG = current.g + 1
				if(openSet.includes(neighbor)){
					if(tempG < neighbor.g){
						neighbor.g = tempG
					}
				}else{
					neighbor.g = tempG
					openSet.push(neighbor)
				}
			}
		}
		//keep going
	}else{
		//no solution
	}
    // put drawing code here

	background(0)
	for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
			grid[i][j].show(color(255))
		}
    }

	for(let i = 0; i< closedSet.length; i++){
		closedSet[i].show(color(255,0,0))
	}

	for(let i = 0; i< openSet.length; i++){
		openSet[i].show(color(0,255,0))
	}
	// console.log(grid)
}
