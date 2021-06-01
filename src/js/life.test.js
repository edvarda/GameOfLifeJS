var { life, testables } = require('./life.js');
const testGrid = { columns: 10, rows: 15 };

describe('it can be tested', () => {
  beforeEach(function () {
    jest.resetModules();
  });

  describe('test internal functions', () => {
    test('able to create a new grid', () => {
      let grid = testables.initGrid(10, 10);
      expect(grid.length).toBe(10);
      expect(grid.flat().length).toBe(10 * 10);
      expect(grid.flat().every((cell) => cell == false)).toBeTruthy();
      let randomGrid = testables.initGrid(100, 100, (random = true)); // This test will theoretically fail every so often. (p = 0.7^10000 )
      expect(randomGrid.flat().some((cell) => cell == true)).toBeTruthy();
    });

    function testNeighbours(grid, expectedNeigbours, i, j) {
      let neighbours = testables.getNeighbours(grid, i, j);
      expect(neighbours.length).toBe(9);
      expect(neighbours[4]).toBeFalsy();
      expect(neighbours).toEqual(expectedNeigbours);
    }
    const getTestGrid = () => testables.initGrid(testGrid.rows, testGrid.columns, (random = true));

    test('get neighbours to a cell in the middle of a grid', () => {
      let grid = getTestGrid();
      let [i, j] = [Math.floor(testGrid.rows / 2), Math.floor(testGrid.columns / 2)]; // pick cell in the middle
      const expectedNeigbours = [
        grid[i - 1][j - 1],
        grid[i - 1][j],
        grid[i - 1][j + 1],
        grid[i][j - 1],
        false,
        grid[i][j + 1],
        grid[i + 1][j - 1],
        grid[i + 1][j],
        grid[i + 1][j + 1],
      ];

      testNeighbours(grid, expectedNeigbours, i, j);
    });

    test('get neighbours on an edge', () => {
      let grid = getTestGrid();
      testStartOfRow();
      testStartOfColumn();

      function testStartOfRow() {
        let [i, j] = [Math.floor(testGrid.rows / 2), 0]; // pick cell on the start of a row
        const expectedNeigbours = [
          false,
          grid[i - 1][j],
          grid[i - 1][j + 1],
          false,
          false,
          grid[i][j + 1],
          false,
          grid[i + 1][j],
          grid[i + 1][j + 1],
        ];
        testNeighbours(grid, expectedNeigbours, i, j);
      }

      function testStartOfColumn() {
        let [i, j] = [0, Math.floor(testGrid.columns / 2)]; // pick cell on the start of a row
        const expectedNeigbours = [
          false,
          false,
          false,
          grid[i][j - 1],
          false,
          grid[i][j + 1],
          grid[i + 1][j - 1],
          grid[i + 1][j],
          grid[i + 1][j + 1],
        ];
        testNeighbours(grid, expectedNeigbours, i, j);
      }
    });

    test('get neighbours in a corner', () => {
      let grid = getTestGrid();
      testTopLeftCorner();
      testBottomRightCorner();

      function testTopLeftCorner() {
        let [i, j] = [0, 0];
        const expectedNeigbours = [
          false,
          false,
          false,
          false,
          false,
          grid[i][j + 1],
          false,
          grid[i + 1][j],
          grid[i + 1][j + 1],
        ];
        testNeighbours(grid, expectedNeigbours, i, j);
      }

      function testBottomRightCorner() {
        let [i, j] = [testGrid.rows - 1, testGrid.columns - 1];
        const expectedNeigbours = [
          grid[i - 1][j - 1],
          grid[i - 1][j],
          false,
          grid[i][j - 1],
          false,
          false,
          false,
          false,
          false,
        ];
        testNeighbours(grid, expectedNeigbours, i, j);
      }
    });

    test('score evaluating function', () => {
      for (const score of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
        // dead cells stay dead
        if (score != 3) {
          expect(testables.evaluate(score, (cell = false))).toBeFalsy();
        }
        // live cells die
        if (score != 3 && score != 2) {
          expect(testables.evaluate(score, (cell = true))).toBeFalsy();
        }
        // live cells survive
        if (score == 3 || score == 2) {
          expect(testables.evaluate(score, (cell = true))).toBeTruthy();
        }
        // new cells get get created
        if (score == 3) {
          expect(testables.evaluate(score, (cell = false))).toBeTruthy();
        }
      }
    });
  });
});
