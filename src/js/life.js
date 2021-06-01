const RANDOM_LIFE_THRESHOLD = 0.7;

var game = {
  initialize(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = getNewGrid(rows, columns, (random = true));
  },
  tick() {
    this.grid = nextGeneration(this);
  },
  getBoard() {
    return this.grid;
  },
};

const nextGeneration = ({ grid, rows, columns }) => {
  const nextFrame = Array.from(new Array(rows), () => new Array(columns));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cell = grid[i][j];
      const neighbours = getNeighbours(grid, i, j);
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

const getNewGrid = (rows, columns, random = false) => {
  // NOTE Got curious so I did rewrote the array initialization to this. Is it just a vain way of initializing a 2d array?
  const getRandomBool = () => (Math.random() > RANDOM_LIFE_THRESHOLD ? true : false);
  const getFillValue = () => (random ? getRandomBool() : false);
  return Array.from(new Array(rows), () => new Array(columns).fill().map(getFillValue));
};

const testables = { nextGeneration, getScore, evaluate, getNeighbours, getNewGrid };

module.exports = { game, testables };
