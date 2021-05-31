const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;

var canvas, ctx, frameBuffer;

function init() {
  // Initialize canvas
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  canvas.width = GRID_WIDTH;
  canvas.height = GRID_HEIGHT;

  var frameBuffer = [ctx.createImageData(GRID_WIDTH, GRID_HEIGHT), ,];

  //Hello World
  var image = ctx.createImageData(GRID_WIDTH, GRID_HEIGHT);
  for (i = 0; i < image.data.length; i += 4) {
    if (i == (GRID_WIDTH * 10 + 11) * 4) {
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
}

// Sketches
function initFrame(size) {
  const frame = new Array(size);
  for (k = 0; k < size; k++) {
    frame[k] = new Array(size).fill(false);
  }
  return frame;
}

function makeNeighbourMask() {
  const mask = new Array();
  const offsets = [-1, 0, 1];
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (offsets[i] == 0 && offsets[j] == 0) continue;
      mask.push([offsets[i], offsets[j]]);
    }
  }
  return mask;
}

// We have a canvas with some height and width, which is evenly divisible by the number of cells in x an y direction respectively.
// That gives us the cellsize (square).
function renderFrame() {
  // get the canvas
  // get the 2d context
  // for each row, if cell is alive render a black rectangle ctx.fillRectangle(cellsize, cellsize,rowoffset, columnoffset);
}

function prepareNextFrame() {
  // Clear the back frame
  // For each cell position, apply the neighbourmask and a reducer to the front frame to get a score.
  // Get the status for p = (x,y) in the next generation from the score.
}

init();
