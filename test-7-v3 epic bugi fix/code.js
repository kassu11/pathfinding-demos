const height = 120;
const width = 150;
const playerNum = 2;

const random = (max, min = 0) => Math.round(Math.random() * (min - max) + max);
const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => random(2) ? 0 : 1));

const start = {
  x: random(width - 1),
  y: random(height - 1)
};

const player = {
  x: start.x,
  y: start.y,
}

const goal = {
  x: random(width - 1),
  y: random(height - 1)
};

const blockSize = 10;
grid[start.y][start.x] = playerNum;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function renderGrid() {
  canvas.width = width * blockSize;
  canvas.height = height * blockSize;
  ctx.fillStyle = "rgb(200, 200, 200)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
      if(grid[y][x] === 1) {
        ctx.fillStyle = "rgb(10, 10, 10)";
        ctx.fillRect(blockSize * x, blockSize * y, blockSize, blockSize);
      }
    }
  }
}

function renderGridNumber(vue, x, y) {
  const rgb = `hsl(${vue / Math.max(width, height) * 360}deg 70% 60%)`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

grid[goal.y][goal.x] = playerNum;
grid[player.y][player.x] = 0;
const checkGrid = [{ v: playerNum, x: goal.x, y: goal.y }];
function diamondSearch() {
  const {v, x, y} = checkGrid.splice(0, 1)[0];
  if (grid[y][x] == v) {
    if (grid[y - 1]?.[x] === 0) {
      grid[y - 1][x] = v + 1;
      checkGrid.push({ v: v + 1, x: x, y: y - 1, dist: calcDistance(x, y - 1, start.x, start.y)});
      renderGridNumber(v, x, y - 1);
    }
    if (grid[y + 1]?.[x] === 0) {
      grid[y + 1][x] = v + 1;
      checkGrid.push({ v: v + 1, x: x, y: y + 1, dist: calcDistance(x, y + 1, start.x, start.y)});
      renderGridNumber(v, x, y + 1);
    }
    if (grid[y]?.[x - 1] === 0) {
      grid[y][x - 1] = v + 1;
      checkGrid.push({ v: v + 1, x: x - 1, y: y, dist: calcDistance(x - 1, y, start.x, start.y)});
      renderGridNumber(v, x - 1, y);
    }
    if (grid[y]?.[x + 1] === 0) {
      grid[y][x + 1] = v + 1;
      checkGrid.push({ v: v + 1, x: x + 1, y: y, dist: calcDistance(x + 1, y, start.x, start.y)});
      renderGridNumber(v, x + 1, y);
    }
  }
  checkGrid.sort((a, b)=>{
    if(a.dist < b.dist) return -1;
    if(a.dist > b.dist) return 1;
    else return 0;
  });
}

function calcDistance(startX, startY, endX, endY) {
  let xDist = Math.abs(endX - startX);
  let yDist = Math.abs(endY - startY);
  return xDist + yDist;
}

let num = 0;
renderGrid();
while(grid[start.y][start.x] == 0) {
  diamondSearch();
}
generatePlayer(player.x, player.y);

function generatePlayer(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function movePlayer() {
  if(grid[player.y][player.x] == 2) return;
    if(grid[player.y]?.[player.x + 1] == grid[player.y][player.x] - 1) {
        player.x++;
    } else if(grid[player.y]?.[player.x - 1] == grid[player.y][player.x] - 1) {
        player.x--;
    } else if(grid[player.y + 1]?.[player.x] == grid[player.y][player.x] - 1) {
        player.y++;
    } else if(grid[player.y - 1]?.[player.x] == grid[player.y][player.x] - 1) {
        player.y--;
    }
  generatePlayer(player.x, player.y);
}

setInterval(movePlayer, 10);