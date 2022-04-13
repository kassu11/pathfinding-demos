const height = 50;
const width = 50;
const playerValue = 2;
const random = new Random();

const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => random.range(2) ?	0 : 1));

let startX = random.range(width - 1);
let startY = random.range(height - 1);

grid[startY][startX] = playerValue;

const checkArray = [{v: 2, x: startX, y: startY}];

for(let i = 0; i < checkArray.length; i++) {
	const {x, y, v} = checkArray[i];

	if(grid[y - 1]?.[x] === 0) {
		grid[y - 1][x] = v + 1;
		checkArray.push({x, y: y - 1, v: v + 1});
	}
	if(grid[y + 1]?.[x] === 0) {
		grid[y + 1][x] = v + 1;
		checkArray.push({x, y: y + 1, v: v + 1});
	}
	if(grid[y]?.[x - 1] === 0) {
		grid[y][x - 1] = v + 1;
		checkArray.push({x: x - 1, y, v: v + 1});
	}
	if(grid[y]?.[x + 1] === 0) {
		grid[y][x + 1] = v + 1;
		checkArray.push({x: x + 1, y, v: v + 1});
	}
	
}
renderGrid(grid)



function renderGrid(grid) {
	document.body.innerHTML = `<pre>${grid.map(row => row.map(e => e == 1 ? "  " : String(e).padStart(2, "0")).join(" ")).join("\n")}</pre>`;
}