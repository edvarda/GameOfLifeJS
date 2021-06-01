const GRID_HEIGHT = 100;
const GRID_WIDTH = 100;

var game = {
  init: function (height = GRID_HEIGHT, width = GRID_WIDTH) {
    this.gridHeight = height;
    this.gridWidth = width;
    this.frame = initGrid(height, width, (random = true));
  },
  tick: function () {
    const next = nextGeneration(this.frame);
    this.frame = next;
  },
  getBoard: function () {
    return this.frame;
  },
};

const nextGeneration = (frame) => {
  const rows = frame.length;
  const cols = frame[0].length;
  const nextFrame = Array.from(new Array(rows), () => new Array(cols));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = frame[i][j];
      const neighbours = getNeighbours(frame, i, j);
      const score = getScore(neighbours);
      nextFrame[i][j] = evaluate(score, cell);
    }
  }
  return nextFrame;
};

const getScore = (neighbours) =>
  neighbours.reduce((acc, aliveNeighbour) => acc + (aliveNeighbour ? 1 : 0), 0);

const evaluate = (score, cell) => score === 3 || (cell && score === 2);

const getNeighbours = (grid, row, col) => {
  const cellExistsAndIsAlive = (i, j) => (grid[i] && grid[i][j] ? true : false);
  let neighbours = [-1, 0, 1]
    .map((i) => [-1, 0, 1].map((j) => cellExistsAndIsAlive(row + i, col + j)))
    .flat();
  neighbours[4] = false; // Not a neighbour to oneself
  return neighbours;
};

const initGrid = (rows, columns, random = false) => {
  // let grid = Array.from(new Array(rows), () => new Array(columns)); // NOTE is this just a vain way of initializing a 2d array?
  let grid = new Array(rows);
  for (i = 0; i < rows; i++) {
    grid[i] = new Array(columns).fill(false);
    if (random) {
      for (j = 0; j < columns; j++) {
        grid[i][j] = Math.random() > 0.7 ? true : false;
      }
    }
  }
  return grid;
};

const testables = { nextGeneration, getScore, evaluate, getNeighbours, initGrid };

module.exports = { game, testables };
