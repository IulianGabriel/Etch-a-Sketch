// Declare Constants
const RGB_MAX = 256;
const WRAPPER_WIDTH_AND_HEIGHT = 660;

// Declare Variables
let isMouseDown = false;
const gridContainer = document.querySelector(".grid-container");
const gridSizeSlider = document.querySelector(".grid-size-slider");
const gridSizeText = document.querySelector(".grid-size-text");
const toggleGridButton = document.querySelector(".grid-btn");
const selectColor = document.querySelector(".select-color");
const rainbowMode = document.querySelector(".rainbow-mode");
const colorMode = document.querySelector(".color-mode");
const clearGrid = document.querySelector(".clear");
const eraser = document.querySelector(".eraser");

// Add event listeners

// Set up event listener to track mouse clicks
document.addEventListener("mousedown", () => {
  isMouseDown = true; // While you keep your click pressed, mouseDown will be true. (this helps with brushing while holding click)
});

//Set up event listener to track mouse release
document.addEventListener("mouseup", () => {
  isMouseDown = false; // When you stop pressing click, mouseDown becomes false. (this stops the brush when you are not holding click)
});

// Main event listener for gridContainer
gridContainer.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    // Check the drawing mode and call the corresponding function
    if (colorMode.classList.contains("on-toggle-colorMode")) {
      drawOnClick(event);
    } else if (eraser.classList.contains("on-toggle-eraser")) {
      eraseOnClick(event);
    } else if (rainbowMode.classList.contains("on-toggle-rainbowMode")) {
      drawRandomColors(event);
    }
  }
});

// Additional event listeners
gridSizeSlider.addEventListener("input", createGrid);
toggleGridButton.addEventListener("click", toggleGrid);
colorMode.addEventListener("click", toggleColorMode);
clearGrid.addEventListener("click", clearCanvas);
eraser.addEventListener("click", toggleEraser);
rainbowMode.addEventListener("click", toggleRainbowMode);

// Create and update grid on page.
function createGrid() {
  let defaultSize = gridSizeSlider.value;
  const wrapperMeasurements = WRAPPER_WIDTH_AND_HEIGHT;
  gridSizeText.innerText = `${defaultSize} x ${defaultSize}`;
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${defaultSize}, 1fr)`; // Set grid columns based on 'defaultSize' with equal fractions.

  // Create grid cells
  for (let i = 0; i < defaultSize; i++) {
    for (let j = 0; j < defaultSize; j++) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("grid-cell");
      newDiv.setAttribute("draggable", false);
      newDiv.style.width = `${wrapperMeasurements / defaultSize}px`;
      newDiv.style.height = `${wrapperMeasurements / defaultSize}px`;
      gridContainer.appendChild(newDiv); // moves new div inside "gridContainer"
    }
  }
}

createGrid();

// Toggle grid lines on/off
function toggleGrid() {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => {
    if (cell.classList.contains("hidden")) {
      // Show grid
      cell.classList.remove("hidden");
      toggleGridButton.style.backgroundColor = "";
      toggleGridButton.style.color = "";
    } else {
      // Hide grid
      cell.classList.add("hidden");
      toggleGridButton.style.backgroundColor = "#7f00ff";
      toggleGridButton.style.color = "#202020";
    }
  });
}

// Color mode "Brush" + functionality.
function toggleColorMode() {
  colorMode.classList.toggle("on-toggle-colorMode");
  eraser.classList.remove("on-toggle-eraser");
  rainbowMode.classList.remove("on-toggle-rainbowMode");
}

function drawOnClick(event) {
  const selectedColor = selectColor.value;
  event.target.style.backgroundColor = selectedColor;
}

// Eraser toggle + functionality
function toggleEraser() {
  eraser.classList.toggle("on-toggle-eraser");
  colorMode.classList.remove("on-toggle-colorMode");
  rainbowMode.classList.remove("on-toggle-rainbowMode");
}

function eraseOnClick(event) {
  event.target.style.backgroundColor = "white";
}

// Rainbow mode toggle + functionality
function toggleRainbowMode() {
  rainbowMode.classList.toggle("on-toggle-rainbowMode");
  eraser.classList.remove("on-toggle-eraser");
  colorMode.classList.remove("on-toggle-colorMode");
}

function drawRandomColors(event) {
  const randomR = Math.floor(Math.random() * RGB_MAX);
  const randomG = Math.floor(Math.random() * RGB_MAX);
  const randomB = Math.floor(Math.random() * RGB_MAX);
  event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
}

// Clear button functionality
function clearCanvas() {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => {
    cell.style.backgroundColor = "";
  });
}
