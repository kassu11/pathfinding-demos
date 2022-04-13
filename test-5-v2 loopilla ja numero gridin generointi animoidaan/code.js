const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const canvas = document.querySelector("canvas#screen");
const ctx = canvas.getContext("2d");

let startX, startY;
let endX, endY;

async function loop() {
	const height = 85;
	const width = 180;
	const playerValue = 2;
	let lastDeg = -1;
	
	const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => random(100) > 32 ?	0 : 1));
		
	if(startX == undefined) {
		startX = playerX = random(width - 1);
		startY = playerY = random(height - 1);
	}
	
	endX = random(width - 1);
	endY = random(height - 1);
	
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
			await renderGridNumber(x, y - 1, v + 1);
		}
		if(grid[y + 1]?.[x] === 0) {
			grid[y + 1][x] = v + 1;
			checkArray.push({x, y: y + 1, v: v + 1});
			await renderGridNumber(x, y + 1, v + 1);
		}
		if(grid[y]?.[x - 1] === 0) {
			grid[y][x - 1] = v + 1;
			checkArray.push({x: x - 1, y, v: v + 1});
			await renderGridNumber(x - 1, y, v + 1);
		}
		if(grid[y]?.[x + 1] === 0) {
			grid[y][x + 1] = v + 1;
			checkArray.push({x: x + 1, y, v: v + 1});
			await renderGridNumber(x + 1, y, v + 1);
		}
	}
	
	const interval = setInterval(movePlayer, 10);
	
	function movePlayer() {
		const value = grid[playerY][playerX] - 1;
		if(value === 1) {
			clearInterval(interval);
			startX = playerX = endX;
			startY = playerY = endY;
			loop();
			return;
		};
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
	
	async function renderGridNumber(x, y, value) {
		const deg = Math.round(value / Math.max(endX, width - endX, endY, height - endY) * 150);
		if(lastDeg < deg) {
			await sleep(10);
			lastDeg = deg;
		}

		ctx.fillStyle = `hsl(${deg}deg 70% 60%)`;
		ctx.fillRect(x * 10, y * 10, 10, 10);
	}
	
	function renderPlayer(x, y) {
		ctx.fillStyle = "red";
		ctx.fillRect(x * 10, y * 10, 10, 10);
	}
	
	if(grid[startY][startX] == 0) {
		clearInterval(interval);
		loop();
	}
}

loop();

function random(a, b = 0) {
	return Math.round(Math.random() * (b - a)) + a;
}