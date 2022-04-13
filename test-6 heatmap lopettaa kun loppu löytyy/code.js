const height = 150;
const width = 150;
const playerValue = 2;
const pixeliKoko = 5;

const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => random(100) > 33 ?	0 : 1));

const canvas = document.querySelector("canvas#screen");
const ctx = canvas.getContext("2d");

let startX = playerX = random(width - 1),
		startY = playerY = random(height - 1);

const endX = random(width - 1),
			endY = random(height - 1);

grid[endY][endX] = playerValue;
grid[playerY][playerX] = 0;

const checkArray = [{v: 2, x: endX, y: endY}];

renderGrid(grid);
renderGridNumber(checkArray[0].x, checkArray[0].y, checkArray[0].v);

for(let i = 0; grid[startY][startX] == 0 && i < checkArray.length; i++) {
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