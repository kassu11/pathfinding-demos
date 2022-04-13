const height = 30;
const width = 30;
const playerValue = 2;
const random = new Random();

const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => random.range(2) ?	0 : 1));

let startX = random.range(width - 1);
let startY = random.range(height - 1);

grid[startY][startX] = playerValue;

function edistäNumeroa(etsiNum, laitaNum) {
	for(let y = 0; y < height; y++) {
		for(let x = 0; x < width; x++) {
			if(grid[y][x] === 0) {
				if(grid[y - 1]?.[x] === etsiNum) grid[y][x] = laitaNum;
				else if(grid[y + 1]?.[x] === etsiNum) grid[y][x] = laitaNum;
				else if(grid[y]?.[x - 1] === etsiNum) grid[y][x] = laitaNum;
				else if(grid[y]?.[x + 1] === etsiNum) grid[y][x] = laitaNum;
			}
		}
	}

	renderGrid(grid)
}

let num = playerValue;
setInterval(e => {
	if(num < 100) edistäNumeroa(num++, num);
}, 25)




function renderGrid(grid) {
	document.body.innerHTML = `<pre>${grid.map(row => row.map(e => e == 1 ? "  " : String(e).padStart(2, "0")).join(" ")).join("\n")}</pre>`;
}