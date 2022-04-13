const height = 26;
const width = 60;
const random = new Random();

const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => " "));

let startX = random.range(width - 1);
let startY = random.range(height - 1);

let endX = random.range(width - 1);
let endY = random.range(height - 1);

grid[startY][startX] = "S";
grid[endY][endX] = "E";

function movePlayer() {
	if(startX > endX) startX--;
	else if(startX < endX) startX++;
	else if(startY > endY) startY--;
	else if(startY < endY) startY++;

	grid[startY][startX] = "X";
	renderGrid(grid);
}

setInterval(movePlayer, 20);

function renderGrid(grid) {
	document.body.innerHTML = `<pre>${grid.map(row => row.join(" ")).join("\n")}</pre>`;
}