class RecursiveBacktracker {
    constructor(grid) {
        this.current = grid[0][0];
        this.current.color = color(40, 40, 40);
        this.current.visited = true;
        this.stack = [];
    }

    update() {

        const unvisitedNeighbours = [];

        this.current.highlightCell();

        // If the current cell has any neighbours which have not been visited 
        for(const neighbour of this.current.neighbours) {
            if(!neighbour.visited) {
                unvisitedNeighbours.push(neighbour);
            }
        }

        if(unvisitedNeighbours.length) {
            // Choose randomly one of the unvisited neighbours
            const nextNeighbour = this.getRandomCell(unvisitedNeighbours);

            // Push the current cell to the stack
            this.stack.push(this.current);
            // Remove the wall between the current cell and the chosen cell
            this.removeWalls(this.current, nextNeighbour);

            // Make the chosen cell the current cell and mark it as visited
            this.current = nextNeighbour;
            this.current.visited = true;

            
        }
        // Else if stack is not empty 
        else {
            // Pop a cell from the stack
            const nextCell = this.stack.pop();
            // maze generated
            if(!nextCell)
                return true;
            // console.log(nextCell);
            // Make it the current cell
            this.current = nextCell;
        }
        this.current.color = color(40, 40, 40);

        return false;

    }

    getRandomCell(arr) {
        const rndIndex = Math.floor(Math.random() * arr.length);
        return arr[rndIndex];
    }

    removeWalls(currentCell, nextCell) {
        const isTop = nextCell.x === currentCell.x && nextCell.y < currentCell.y;
        const isRight = nextCell.x > currentCell.x && nextCell.y === currentCell.y;
        const isBottom = nextCell.x === currentCell.x && nextCell.y > currentCell.y;
        const isLeft = nextCell.x < currentCell.x && nextCell.y === currentCell.y;

        if(isTop) {
            currentCell.walls[0] = false;
            nextCell.walls[2] = false;
        } else if(isRight) {
            currentCell.walls[1] = false;
            nextCell.walls[3] = false;
        } else if(isBottom) {
            currentCell.walls[2] = false;
            nextCell.walls[0] = false;
        } else if(isLeft) {
            currentCell.walls[3] = false;
            nextCell.walls[1] = false;
        }

    }
    
}