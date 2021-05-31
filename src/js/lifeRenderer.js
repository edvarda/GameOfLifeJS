var game = require('./life');
var canvas, ctx;

function init(width, height) {
  // Initialize canvas
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  canvas.width = width;
  canvas.height = height;
  game.init(width, height);

  setInterval(update, 500, game, width, height, ctx);
}

const update = (game, width, height, ctx) => {
  var board = game.getBoard();
  var image = ctx.createImageData(width, height);
  for (let i = 0; i < image.data.length; i += 4) {
    let p = i / 4;
    image.data[i + 3] = board[Math.floor(p / width)][p % width] ? 255 : 0;
  }
  ctx.putImageData(image, 0, 0);
  game.tick();
};

function helloWorld(ctx, width, height) {
  var image = ctx.createImageData(width, height);
  for (i = 0; i < image.data.length; i += 4) {
    if (i == (width * 10 + 11) * 4) {
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
}
init(100, 100);
