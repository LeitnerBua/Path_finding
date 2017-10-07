class MazeG {
    constructor(grid) {
        this.current = grid[0][0];
        this.visited = [this.current];
        this.stack = [];

        this.blue = "#0050ff";
        this.lightblue = "#00bbff";
        this.purple = "#b600ff";

    }

    update() {
      // console.log(this. current);
      let current = this.current;
      current.color = this.blue;
      let unvisited_neighbours = [];
      for(let i = 0; i < current.neighbours.length; i++) {
        if(this.visited.indexOf(current.neighbours[i]) === -1 && current.neighbours[i] != 0) {
          unvisited_neighbours.push(current.neighbours[i]);
        }
      }

      if(unvisited_neighbours.length > 0) {
        current.color = this.lightblue;
        let ranCell = floor(random(0, unvisited_neighbours.length));
        let next = unvisited_neighbours[ranCell];
        next.color = this.purple;


        // let ranWall = floor(random(0, next.walls.length - 1));

        // if next is at the top of the current cell
        let isTop = next.y < current.y && next.x == current.x;
        let isRight = next.y == current.y && next.x > current.x;
        let isBottom = next.y > current.y && next.x == current.x;
        let isLeft = next.y == current.y && next.x < current.x;

        if(isTop) {
          current.walls[0] = false;
          next.walls[2] = false;
        } else if (isRight) {
          current.walls[1] = false;
          next.walls[3] = false;
        } else if (isBottom) {
          current.walls[2] = false;
          next.walls[0] = false;
        } else if (isLeft) {
          current.walls[3] = false;
          next.walls[1] = false;
        }


        this.stack.push(this.current);
        this.current = next;

        this.visited.push(this.current);
      } else if (this.stack.length > 0) {
        this.current = this.stack.pop();
        this.current.color = this.purple;
    } else {
        return true;
    }
    }
}
