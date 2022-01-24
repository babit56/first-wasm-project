import init, { Universe, PatternType } from "./pkg/game_of_life_wasm.js";
//import { memory } from "game-of-life-wasm/game_of_life_wasm_bg";

const wasm = await init();
const memory = wasm.memory;

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

// Construct the universe, and get its width and height.
const universe = Universe.new();
const width = universe.width();
const height = universe.height();

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

canvas.addEventListener("click", event => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  if (event.ctrlKey) {
    universe.insert_pattern(row, col, PatternType.Glider)
  } else {
    universe.toggle_cell(row, col);
  }

  drawGrid();
  drawCells();
});

let animationId = null;
let ticksPerSecond = 1;

const renderLoop = () => {
  // debugger;
  for (let i = 0; i < ticksPerSecond; i++) {
    universe.tick();
  }

  // drawGrid();
  drawCells();

  animationId = requestAnimationFrame(renderLoop);
};

const isPaused = () => animationId === null;

const playPauseButton = document.getElementById('play-pause');

const play = () => {
  playPauseButton.textContent = "⏸";
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = "▶";
  cancelAnimationFrame(animationId);
  animationId = null;
};

playPauseButton.addEventListener("click", event => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});

const ticksPerSecondRange = document.getElementById('ticks-range');
const ticksLabel = document.getElementById('ticks-range-label');
const emptyButton = document.getElementById('empty');
const restartButton = document.getElementById('restart');
const advanceButton = document.getElementById('advanceOnce');

ticksPerSecondRange.addEventListener('change', event => {
  ticksPerSecond = event.target.valueAsNumber;
  ticksLabel.innerHTML = "Ticks per frame: " +  ticksPerSecond;
});

emptyButton.addEventListener('click', () => universe.clear());
restartButton.addEventListener('click', () => universe.reset());
advanceButton.addEventListener('click', () => {
  for (let i = 0; i < ticksPerSecond; i++) {
    universe.tick();
  }

  // drawGrid();
  drawCells();
});

const getIndex = (row, column) => {
  return row * width + column;
};
  
const bitIsSet = (n, arr) => {
  const byte = Math.floor(n / 8);
  const mask = 1 << (n % 8);
  return (arr[byte] & mask) === mask;
};
  
const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height / 8);
  
  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = bitIsSet(idx, cells)
        ? ALIVE_COLOR
        : DEAD_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

drawGrid();
drawCells();
play();