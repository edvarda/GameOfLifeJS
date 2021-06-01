var { game } = require('./life');

const [GRID_WIDTH, GRID_HEIGHT] = [window.innerWidth, window.innerHeight].map((dimension) =>
  Math.floor(dimension / 10),
);
const BORDER_OFFSET = 12;
const ANIMATION_INTERVAL = 300;

(function renderLife(rows, columns) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.height = rows;
  canvas.width = columns;

  game.initialize(rows + BORDER_OFFSET, columns + BORDER_OFFSET);

  setInterval(update, ANIMATION_INTERVAL, game, rows, columns, ctx);
})(GRID_HEIGHT, GRID_WIDTH);

function update(game, rows, columns, ctx) {
  var board = game.getBoard();
  var image = ctx.createImageData(columns, rows);
  for (let i = 0; i < image.data.length; i += 4) {
    let pixelIndex = i / 4;
    let [cellPosX, cellPosY] = [
      Math.floor(pixelIndex / columns) + BORDER_OFFSET / 2,
      (pixelIndex % columns) + BORDER_OFFSET / 2,
    ];
    image.data[i + 3] = board[cellPosX][cellPosY] ? 255 : 0;
  }
  ctx.putImageData(image, 0, 0);
  game.tick();
}
