let rows = 10;
let cols = 10;

let grid = [];

let maze_generator;

let astar;


function setup() {
  createCanvas(800, 800);

  for(let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
  }

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, cols, rows);
    }
  }

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].addNeighbours(cos, rows);
    }
  }

  maze_generator = new MazeG(grid);

  let start = grid[0][0];
  let end = grid[cols-1][rows-1];
  astar = new Astar(start, end);

  // frameRate(10);

}

function draw() {
  background(0);

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].show("#000000");
      grid[i][j].showWalls();
    }
  }

  let m = maze_generator.update();
  if(m) {
    astar.search();
    astar.drawLine();
  }





}
