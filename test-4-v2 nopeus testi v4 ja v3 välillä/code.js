const height = 50;
const width = 50;
const playerValue = 2;
const random = new Random();

let startX = random.range(width - 1);
let startY = random.range(height - 1);

const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => random.range(2) ?	0 : 1));
const checkArray = [{v: 2, x: startX, y: startY}];
grid[startY][startX] = playerValue;

function versio4() {
	const start = performance.now();
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

	return performance.now() - start;
}

function versio3() {
	const start = performance.now();

	const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => random.range(2) ?	0 : 1));
	const max = height * width;
	grid[startY][startX] = playerValue;

	main: for(let i = 2; i < max; i++) {
		let foundEmty = false;
		for(let y = 0; y < height; y++) {
			for(let x = 0; x < width; x++) {
				if(grid[y][x] === 0) {
					if(grid[y - 1]?.[x] === i || grid[y + 1]?.[x] === i || grid[y]?.[x - 1] === i || grid[y]?.[x + 1] === i) {
						grid[y][x] = i + 1
						foundEmty = true;
					}
				}
			}
		} if(!foundEmty) break main;
	}

	return performance.now() - start;
}

const v4Time = versio4();
const v3Time = versio3();

renderGrid(grid)

console.log(`v4: ${v4Time}ms`);
console.log(`v3: ${v3Time}ms`);

function renderGrid(grid) {
	document.body.innerHTML = `
	<h1>Speeds v4: ${v4Time.toFixed(2)}ms v3: ${v3Time.toFixed(2)}ms</h1>
	<pre>${grid.map(row => row.map(e => e == 1 ? "   " : String(e).padStart(3, "0")).join(" ")).join("\n")}</pre>`;
}