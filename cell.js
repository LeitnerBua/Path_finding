class Cell {
  constructor(x, y, cols, rows) {
    this.x = x;
    this.y = y;
    this.width = width / cols;
    this.height = height / rows;
    this.pos = createVector(this.x*this.width, this.y*this.height);

    this.walls = [true, true, true, true];
    // this.walls = [false, false, false, false];

    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.came_from = undefined;

    this.color = '#000000';

    // this.visited = false;

    this.neighbours = [];
  }

  show() {
    fill(this.color);
    noStroke();
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  showWalls() {
    stroke(255);
    // fill(color);
    if(this.walls[0])
      line(this.pos.x, this.pos.y, this.pos.x + this.width, this.pos.y);
    if(this.walls[1])
      line(this.pos.x + this.width, this.pos.y, this.pos.x + this.width, this.pos.y + this.height);
    if(this.walls[2])
      line(this.pos.x, this.pos.y + this.height, this.pos.x + this.width, this.pos.y + this.height);
    if(this.walls[3])
      line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.height);
  }

  addNeighbours(cols, rows) {

    let top = this.index(this.x, this.y - 1);
    let right = this.index(this.x + 1, this.y);
    let bottom = this.index(this.x, this.y + 1);
    let left = this.index(this.x - 1, this.y);

    if(top)
      this.neighbours.push(top);
    else
      this.neighbours.push(0);
    if(right)
      this.neighbours.push(right);
    if(bottom)
      this.neighbours.push(bottom);
    if(left)
      this.neighbours.push(left);


  }

  index(x, y) {
   if(x < 0 || x > cols - 1 || y < 0 || y > rows -1) {
    return 0;
   }
   else {
    return grid[x][y];
   }
  }
}
