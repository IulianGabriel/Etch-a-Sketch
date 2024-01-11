// Declare Variables
const gridContainer = document.querySelector(".grid-container");
const gridSizeSlider = document.querySelector(".grid-size-slider");
const gridSizeText = document.querySelector(".grid-size-text");
const toggleGridButton = document.querySelector(".grid-btn");
const selectColor = document.querySelector(".select-color");

gridSizeSlider.addEventListener("input", createGrid);
toggleGridButton.addEventListener("click", toggleGrid);
selectColor.addEventListener("input", getColorValue);

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

function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  //Return RGB values as an object.
  return { r, g, b };
}

function getColorValue() {
  const selectedColor = selectColor.value;
  const rgbColor = hexToRgb(selectedColor)
  console.log(rgbColor)
}
