// Functions
function createGrid(gridSize, fieldSize) {
  /*
  * gridSize is a number such as 16 * 16, 17 * 17 i.e. squared number of squares
  *          per side.
  * fieldSize is given in percents or pixels, i.e. the input is in the form of:
  *          '40px' or '12%'.
  */
  for (let i = 0; i < gridSize; i++) {
    let container = document.getElementById('container');
    let sketchField = document.createElement('div');
    sketchField.className += 'sketch-field';
    sketchField.style.width = fieldSize;
    sketchField.style.height = fieldSize;

    container.appendChild(sketchField);
  };
}


function getFieldSize(squaresPerSide) {
  /*
  * Get the height and width of the element in the grid, calculated in percents
  */
  return (100 / squaresPerSide) + '%';
}


function empty(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}


function blackFields(field) {
  field.style.backgroundColor = 'rgb(0, 0, 0)';
}


function randomFields(field) {
  let hexColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  field.style.backgroundColor = hexColor;
}


function gradientFields(field) {
  let color = field.style.backgroundColor;
  if (color === '' || color === 'rgb(255, 255, 255)') {
    field.style.backgroundColor = 'rgba(0, 0 , 0, 0.1)';
  } else {
    let opacity = parseFloat(color.replace(/ /g,"").replace(")","").split(",")[3]);
    field.style.backgroundColor = "rgba(0, 0, 0," + ((opacity === 1) ? 1 : opacity+=0.1) + ")";
  };
}


// Variables
const defaultSquaresPerSide = 16;
const defaultGridSize = Math.pow(defaultSquaresPerSide, 2);

// Set default grid element size
const defaultFieldSize = getFieldSize(defaultSquaresPerSide);

const container = document.getElementById('container');


// Start the script
function onLoad(event) {

  // When document is loaded, create default grid
  createGrid(defaultGridSize, defaultFieldSize);

  // Select brushes
  let brush = blackFields;

  document.getElementById('black').addEventListener('click', function() {
    brush = blackFields;
  });

  document.getElementById('random').addEventListener('click', function() {
    brush = randomFields;
  });

  document.getElementById('gradient').addEventListener('click', function() {
    brush = gradientFields;
  });

  // Apply brush to element within a grid
  container.addEventListener('mouseover', function(event) {
    let hoveredElement = event.target;
    if (hoveredElement.tagName === 'DIV') {
      brush(hoveredElement);
    }
  });

  // Clear grid
  document.getElementById('clear').addEventListener('click', function() {
    const sketchField = document.getElementsByClassName('sketch-field');
    for (let i=0; i < sketchField.length; i++) {
      sketchField[i].style.backgroundColor = 'rgb(255, 255, 255)';
    };
  });

  // Change grid
  document.getElementById('size').addEventListener('click', function() {
    const message = 'How many squares per side do you want?';
    let squaresPerSide = prompt(message, defaultSquaresPerSide);

    empty(document.getElementById('container'));
    createGrid(Math.pow(squaresPerSide, 2), getFieldSize(squaresPerSide));
  });

}


// $(document).ready(function() {});
document.addEventListener('DOMContentLoaded', onLoad, false);
