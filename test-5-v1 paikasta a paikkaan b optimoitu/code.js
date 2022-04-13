const height = 85;
const width = 85;
const playerValue = 2;
const random = new Random();

const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => random.range(100) > 15 ?	0 : 1));

const canvas = document.querySelector("canvas#screen");
const ctx = canvas.getContext("2d");

let startX = playerX = random.range(width - 1),
		startY = playerY = random.range(height - 1);

const endX = random.range(width - 1),
			endY = random.range(height - 1);

grid[endY][endX] = playerValue;
grid[playerY][playerX] = 0;

const checkArray = [{v: 2, x: endX, y: endY}];

renderGrid(grid);
renderGridNumber(checkArray[0].x, checkArray[0].y, checkArray[0].v);

for(let i = 0; i < checkArray.length; i++) {
	const {x, y, v} = checkArray[i];

	if(grid[y - 1]?.[x] === 0) {
		grid[y - 1][x] = v + 1;
		checkArray.push({x, y: y - 1, v: v + 1});
		renderGridNumber(x, y - 1, v + 1);
	}
	if(grid[y + 1]?.[x] === 0) {
		grid[y + 1][x] = v + 1;
		checkArray.push({x, y: y + 1, v: v + 1});
		renderGridNumber(x, y + 1, v + 1);
	}
	if(grid[y]?.[x - 1] === 0) {
		grid[y][x - 1] = v + 1;
		checkArray.push({x: x - 1, y, v: v + 1});
		renderGridNumber(x - 1, y, v + 1);
	}
	if(grid[y]?.[x + 1] === 0) {
		grid[y][x + 1] = v + 1;
		checkArray.push({x: x + 1, y, v: v + 1});
		renderGridNumber(x + 1, y, v + 1);
	}
}

setInterval(movePlayer, 10);

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
	canvas.width = width * 10;
	canvas.height = height * 10;

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "black";
	for(let y = 0; y < height; y++) {
		for(let x = 0; x < width; x++) {
			if(grid[y][x] === 1) {
				ctx.fillRect(x * 10, y * 10, 10, 10);
			}
		}
	}
}

function renderGridNumber(x, y, value) {
	ctx.fillStyle = `hsl(${value / Math.max(endX, width - endX, endY, height - endY) * 150}deg 70% 60%)`;
	ctx.fillRect(x * 10, y * 10, 10, 10);
}

function renderPlayer(x, y) {
	ctx.fillStyle = "red";
	ctx.fillRect(x * 10, y * 10, 10, 10);
}


if(grid[startY][startX] == 0) location.reload();