const height = 56;
const width = 70;
const random = new Random();

const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => 0));

let startX = random.range(width - 1);
let startY = random.range(height - 1);

grid[startY][startX] = 1;

function edistäNumeroa(etsiNum, laitaNum) {
	for(let y = 0; y < height; y++) {
		for(let x = 0; x < width; x++) {
			if(grid[y][x] === etsiNum) {
				if(grid[y - 1]?.[x] === 0) grid[y - 1][x] = laitaNum;
				if(grid[y + 1]?.[x] === 0) grid[y + 1][x] = laitaNum;
				if(grid[y]?.[x - 1] === 0) grid[y][x - 1] = laitaNum;
				if(grid[y]?.[x + 1] === 0) grid[y][x + 1] = laitaNum;
			}
		}
	}

	renderGrid(grid)
}

let num = 1;

setInterval(e => {
	edistäNumeroa(num++, num);
}, 10)




function renderGrid(grid) {
	document.body.innerHTML = `<pre>${grid.map(row => row.map(e => String(e).padStart(2, "0")).join(" ")).join("\n")}</pre>`;
}