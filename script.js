// Declare Variables
const gridContainer = document.querySelector(".grid-container");
const gridSizeSlider = document.querySelector(".grid-size-slider");
const gridSizeText = document.querySelector(".grid-size-text");

gridSizeSlider.addEventListener("input", createGrid);

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
      newDiv.className = "grid-cell hidden";
      newDiv.style.width = `${wrapperMeasurements / defaultSize}px`;
      newDiv.style.height = `${wrapperMeasurements / defaultSize}px`;
      gridContainer.appendChild(newDiv);
    }
  }
}

createGrid();
