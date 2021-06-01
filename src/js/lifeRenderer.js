var { game } = require('./life');

const [GRID_WIDTH, GRID_HEIGHT] = [window.innerWidth, window.innerHeight].map((dimension) =>
  Math.floor(dimension / 10),
);

(function initialize(width, height) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  game.init(height, width);

  setInterval(update, 500, game, width, height, ctx);
})(GRID_WIDTH, GRID_HEIGHT);

function update(game, width, height, ctx) {
  var board = game.getBoard();
  var image = ctx.createImageData(width, height);
  for (let i = 0; i < image.data.length; i += 4) {
    let p = i / 4;
    image.data[i + 3] = board[Math.floor(p / width)][p % width] ? 255 : 0;
  }
  ctx.putImageData(image, 0, 0);
  game.tick();
}
