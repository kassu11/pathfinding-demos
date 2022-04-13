const height = 26;
const width = 60;
const random = new Random();

const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => 0));

let startX = random.range(width - 1);
let startY = random.range(height - 1);

grid[startY][startX] = 1;

function edistäNumeroa(etsiNum, laitaNum) {
	for(let y = 0; y < height; y++) {
		for(let x = 0; x < width; x++) {
			if(grid[y][x] === etsiNum) {
				if(x > 0) grid[y][x - 1] = laitaNum;
				if(x < width - 1) grid[y][x + 1] = laitaNum;
				if(y > 0) grid[y - 1][x] = laitaNum;
				if(y < height - 1) grid[y + 1][x] = laitaNum;
			}
		}
	}

	renderGrid(grid)
}

let num = 1;

setInterval(e => {
	edistäNumeroa(num++, num);
}, 100)


function renderGrid(grid) {
	document.body.innerHTML = `<pre>${grid.map(row => row.join(" ")).join("\n")}</pre>`;
}