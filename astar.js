class Astar {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.frontier = [this.start];

    this.current;


    this.came_from = [this.start];
    this.costs_so_far = [0];

  }

  search() {
    if (this.frontier.length > 0) {
      // let this.current = this.frontier.shift();
      // console.log("Visiting " + this.current);

      let winnerIndex = 0;

      for (let i = 0; i < this.frontier.length; i++) {
        if (this.frontier[i].f < this.frontier[winnerIndex].f)
          winnerIndex = i;
      }
      this.current = this.frontier[winnerIndex];

      if (this.current == this.end)
        return true;

      let currentIndex = this.frontier.indexOf(this.current);
      this.frontier.splice(currentIndex, 1);
      this.came_from.push(this.current);

      let openWalls = [];
      for (let i = 0; i < this.current.neighbours.length; i++) {
        for (let w = 0; w < this.current.walls.length; w++) {
          if (this.current.walls[w])
            openWalls.push(w);
        }
      }

      for (let o = 0; o < openWalls.length; o++) {

        if (this.came_from.indexOf(this.current.neighbours[openWalls[o]]) === -1) {
          let neighbour = this.current.neighbours[openWalls[o]];
          console.log(neighbour);
          if (neighbour) {
            let tempG = 0;


            // let topNeighbour = this.current.x === this.current.neighbours.x && this.current.y > this.current.neighbours.y;
            // let rightNeighbour = this.current.x < this.current.neighbours.x && this.current.y === this.current.neighbours.y;
            // let bottomNeighbour = this.current.x === this.current.neighbours.x && this.current.y < this.current.neighbours.y;
            // let leftNeighbour = this.current.x > this.current.neighbours.x && this.current.y === this.current.neighbours.y;

            // get a random open wall
            // let ranDirection = floor(random(0, openWalls.length-1));
            // console.log(ranDirection);
            tempG = this.current.g + 1;

            let newPath = false;

            if (this.frontier.indexOf(neighbour) != -1) {
              if (tempG > neighbour.g) {
                neighbour.g = tempG;
                newPath = true;
              }
            } else {
              neighbour.g = tempG;
              newPath = true;
              this.frontier.push(neighbour);
            }

            if (newPath) {
              neighbour.h = this.heuristic()

              neighbour.f = neighbour.g + neighbour.h;
              neighbour.came_from = this.current;

            }
          }
        }
      }

      return false;
    } else {
      console.log("No solution!");
    }
  }

  calcPath() {
    stroke(0);
    let path = [];
    let tempCurrent = this.current;
    path.push(tempCurrent);

    while (tempCurrent.came_from != undefined) {
      path.push(tempCurrent.came_from);
      tempCurrent = tempCurrent.came_from;
    }

    let lines = [];
    for (let p = 0; p < path.length; p++) {
      let x1 = path[p].pos.x + (path[p].width / 2);
      let y1 = path[p].pos.y + (path[p].height / 2);
      // let x2 = path[p].pos.x + path[p].width + (path[p].width /2) ;
      // let y2 = path[p].pos.y + path[p].height + (path[p].height / 2);
      lines.push([x1, y1]);
    }



    return lines;
  }

  drawLine() {
    let lines = this.calcPath();
    beginShape();
    stroke(255);
    noFill();
    for (let l = 0; l < lines.length; l++) {
      vertex(lines[l][0], lines[l][1]);
    }
    endShape();
  }

  heuristic() {
    dist = abs(this.start.x - this.end.x) + abs(this.start.x - this.end.x);
    return dist;
  }




}
