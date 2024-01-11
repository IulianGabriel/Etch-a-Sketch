// Declare Variables
const gridContainer = document.querySelector(".grid-container");
const gridSizeSlider = document.querySelector(".grid-size-slider");
const gridSizeText = document.querySelector(".grid-size-text");
const toggleGridButton = document.querySelector(".grid-btn");
const selectColor = document.querySelector(".select-color");
const colorMode = document.querySelector(".color-mode");
let isMouseDown = false;
gridSizeSlider.addEventListener("input", createGrid);
toggleGridButton.addEventListener("click", toggleGrid);
colorMode.addEventListener("click", toggleColorMode);


// Create and update grid on page.
function createGrid() {
  let defaultSize = gridSizeSlider.value;
  const wrapperMeasurements = 660;
  gridSizeText.textContent = `${defaultSize} x ${defaultSize}`;
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${defaultSize}, 1fr)`;

  for (let i = 0; i < defaultSize; i++) {
    for (let j = 0; j < defaultSize; j++) {
      const newDiv = document.createElement("div");
      newDiv.className = "grid-cell";
      newDiv.setAttribute("draggable", false);
      newDiv.style.width = `${wrapperMeasurements / defaultSize}px`;
      newDiv.style.height = `${wrapperMeasurements / defaultSize}px`;
      gridContainer.appendChild(newDiv);
    }
  }
}

createGrid();

function toggleGrid() {
  if (gridContainer.classList.contains("hidden")) {
    gridContainer.classList.remove("hidden");
    toggleGridButton.style.backgroundColor = "#7f00ff";
    toggleGridButton.style.color = "#202020";
  } else {
    gridContainer.classList.add("hidden");
    toggleGridButton.style.backgroundColor = "";
    toggleGridButton.style.color = "";
  }
}

function toggleColorMode() {
  if (!colorMode.classList.contains("on-toggle")) {
    colorMode.classList.add("on-toggle");
  } else {
    colorMode.classList.remove("on-toggle");
  }
}

gridContainer.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
gridContainer.addEventListener("mousemove", handleCellHover);

function handleCellHover(event) {
  if (isMouseDown && colorMode.classList.contains("on-toggle")) {
    const selectedColor = selectColor.value;
    event.target.style.backgroundColor = selectedColor;
  }
}
