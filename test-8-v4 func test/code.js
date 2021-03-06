class LinkList {
	constructor(...arr) {
		arr.forEach(element => this.add(element))
	}

	head = null;
	length = 0;
	kids = [];

	add(row) {
		this.length++;
		this.kids.push(row);
		if(this.head == null) {
			this.head = row;
		} else {
			let current = this.head;
			for(let i = 0; i < this.length; i++) {
				if(i > 0 && current.next) current = current.next;
				// console.log(current.dist, row.dist)
				if(current.dist >= row.dist) {
					if(i === 0) {
						this.head.prev = row;
						row.next = this.head;
						this.head = row;
					} else {
						// if(row.x == 19 && row.y == 8) console.log("CURRENT", row)
						row.next = current;
						row.prev = current.prev;
						if(current.prev.next) current.prev.next = row;
						current.prev = row;
					}
					break;
				} if(current.next == null) {
					// console.log(row.dist)
					current.next = row;
					row.prev = current;
					break;
				}
				
				// else if(this.length === 2) {
				// 	current.next = row;
				// 	row.prev = current;
				// 	break;
				// }
			}
		}

		// if(row.next == null || row.prev == null) {
		// 	console.log(row, (row.next?.prev == null && row.next?.next == null));
		// 	console.log("Head:", this.head, this.head == row)
		// }
	}

	shift() {
		if(this.length) {
			this.length--;
			let row = this.head;
			this.head = row?.next;
			if(this.head) this.head.prev = null;
			delete row.next;
			delete row.prev;
			return row;
		}
	}
}

const canvas = document.querySelector("canvas#screen");
const ctx = canvas.getContext("2d");

const height = 2000;
const width = 2000;
const playerValue = 2;
const pixeliKoko = 4;
	

// const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => random(100) > 33 ?	0 : 1));

// let startX = playerX = random(width - 1),
// 		startY = playerY = random(height - 1);

// const endX = random(width - 1),
// 			endY = random(height - 1);

grid[endY][endX] = playerValue;
grid[playerY][playerX] = 0;

const checkArray = new LinkList({v: 2, x: endX, y: endY, dist: calcDistance(endX, startX, endY, startY)});

renderGrid(grid);
renderGridNumber(checkArray.head.x, checkArray.head.y, checkArray.head.v);


while(grid[startY][startX] == 0 && checkArray.length) {
	const data = checkArray.shift();
	// console.log(checkArray.length)
	const {x, y, v} = data;

	const up = grid[y - 1]?.[x];
	const down = grid[y + 1]?.[x];
	const left = grid[y]?.[x - 1];
	const right = grid[y]?.[x + 1];

	// console.log(x, y, v)

	if(up === 0 || up >= v) {
		grid[y - 1][x] = v + 1;
		if(up === 0) checkArray.add({x, y: y - 1, v: v + 1, dist: calcDistance(x, startX, y - 1, startY)});
		renderGridNumber(x, y - 1, v + 1);
	}
	if(down === 0 || down >= v) {
		grid[y + 1][x] = v + 1;
		if(down === 0) checkArray.add({x, y: y + 1, v: v + 1, dist: calcDistance(x, startX, y + 1, startY)});
		renderGridNumber(x, y + 1, v + 1);
	}
	if(left === 0 || left >= v) {
		grid[y][x - 1] = v + 1;
		if(left === 0) checkArray.add({x: x - 1, y, v: v + 1, dist: calcDistance(x - 1, startX, y, startY)});
		renderGridNumber(x - 1, y, v + 1);
	}
	if(right === 0 || right >= v) {
		grid[y][x + 1] = v + 1;
		if(right === 0) checkArray.add({x: x + 1, y, v: v + 1, dist: calcDistance(x + 1, startX, y, startY)});
		renderGridNumber(x + 1, y, v + 1);
	}
}

setInterval(movePlayer, 10);

function calcDistance(x1, x2, y1, y2) {
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function movePlayer() {
	const value = grid[playerY][playerX] - 1;
	if(value === 1) return;
	if(grid[playerY]?.[playerX + 1] == value) playerX++;
	else if(grid[playerY]?.[playerX - 1] == value) playerX--;
	else if(grid[playerY + 1]?.[playerX] == value) playerY++;
	else if(grid[playerY - 1]?.[playerX] == value) playerY--;

	renderPlayer(playerX, playerY);
}

function renderGrid(grid) {
	canvas.width = width * pixeliKoko;
	canvas.height = height * pixeliKoko;

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "black";
	for(let y = 0; y < height; y++) {
		for(let x = 0; x < width; x++) {
			if(grid[y][x] === 1) {
				ctx.fillRect(x * pixeliKoko, y * pixeliKoko, pixeliKoko, pixeliKoko);
			}
		}
	}
}

function renderGridNumber(x, y, value) {
	ctx.fillStyle = `hsl(${value / Math.max(endX, width - endX, endY, height - endY) * 150}deg 70% 60%)`;
	ctx.fillRect(x * pixeliKoko, y * pixeliKoko, pixeliKoko, pixeliKoko);
}

function renderPlayer(x, y) {
	ctx.fillStyle = "red";
	ctx.fillRect(x * pixeliKoko, y * pixeliKoko, pixeliKoko, pixeliKoko);
}

function random(a, b = 0) {
	return Math.round(Math.random() * (b - a)) + a;
}

function print() {
	console.log(`const grid = ${JSON.stringify(grid.map(r => r.map(e => e > 1 ? 0 : e)))}

let startX = playerX = ${startX},
    startY = playerY = ${startY};

const endX = ${endX},
      endY = ${endY};
	`);

}
function print2() {
	console.log(`const grid = ${JSON.stringify(grid.map(r => "??'["+ r.map(e => e > 1 ? 0 : e).join(", ") + "]'??"), null, "\t").replaceAll("'", '"').replaceAll(`"??"`, "")}

let startX = playerX = ${startX},
    startY = playerY = ${startY};

const endX = ${endX},
      endY = ${endY};
	`);

}

function gridNum(x, y) {
	console.log(grid.slice(y - 2, y + 3).map(e => e.slice(x - 2, x + 3).map(e => e.toString().padStart(4, " ")).join(" ")).join("\n"));
	console.log(grid[y][x])
}

console.log("LENGTH", grid[startY][startX])

console.log(performance.now());

// new Set(...checkArray.kids.map(e => (`${e.x}-${e.y}`)))