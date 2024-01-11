// Declare Variables
const gridContainer = document.querySelector(".grid-container");
const gridSizeSlider = document.querySelector(".grid-size-slider");
const gridSizeText = document.querySelector(".grid-size-text");
const toggleGridButton = document.querySelector(".grid-btn");
const selectColor = document.querySelector(".select-color");
const colorMode = document.querySelector(".color-mode");
const clearGrid = document.querySelector(".clear");
let isMouseDown = false;

// Add event listeners
gridContainer.addEventListener("mousedown", () => {
  isMouseDown = true; // While you keep your click pressed, mouseDown will be true. (this helps with brushing while holding click)
});
document.addEventListener("mouseup", () => {
  isMouseDown = false; // When you stop pressing your click, mouseDown becomes false. (this stops the brush when you are not holding click)
});
gridContainer.addEventListener("mousemove", handleCellHover);
gridSizeSlider.addEventListener("input", createGrid);
toggleGridButton.addEventListener("click", toggleGrid);
colorMode.addEventListener("click", toggleColorMode);
clearGrid.addEventListener("click", clearCanvas);

// Create and update grid on page.
function createGrid() {
  let defaultSize = gridSizeSlider.value;
  const wrapperMeasurements = 660;
  gridSizeText.textContent = `${defaultSize} x ${defaultSize}`;
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${defaultSize}, 1fr)`; // Set grid columns based on 'defaultSize' with equal fractions.

  for (let i = 0; i < defaultSize; i++) {
    for (let j = 0; j < defaultSize; j++) {
      const newDiv = document.createElement("div");
      newDiv.className = "grid-cell";
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
      cell.classList.remove("hidden");
      toggleGridButton.style.backgroundColor = "";
      toggleGridButton.style.color = "";
    } else {
      cell.classList.add("hidden");
      toggleGridButton.style.backgroundColor = "#7f00ff";
      toggleGridButton.style.color = "#202020";
    }
  });
}

function toggleColorMode() {
  if (!colorMode.classList.contains("on-toggle-colorMode")) {
    colorMode.classList.add("on-toggle-colorMode");
  } else {
    colorMode.classList.remove("on-toggle-colorMode");
  }
}

// Color mode "Brush"  functionality.
function handleCellHover(event) {
  if (isMouseDown && colorMode.classList.contains("on-toggle-colorMode")) {
    const selectedColor = selectColor.value;
    event.target.style.backgroundColor = selectedColor;
  }
}

function clearCanvas() {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => {
    cell.style.backgroundColor = "";
  });
}
