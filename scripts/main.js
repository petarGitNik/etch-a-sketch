function getNumber(candidate) {
  // candidate is in the form '640px'
  let re = /\d+/g;
  return re.exec(candidate)[0];
}


function blackFields(field) {
  field.css('background-color', 'rgba(1,1,1,1)');
}


function randomFields(field) {
  let hexColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  field.css('background-color', hexColor);
}

function gradientFields(field) {
  let color = field.css('background-color');
  console.log(color);
  if (color === 'rgba(0, 0, 0, 0)') {
    field.css('background-color', 'black');
    field.css('opacity', '0.1');
  } else {
    field.css('opacity', '+=0.1');
  };
}


$(document).ready(function() {

  const defaultSquaresPerSide = 16;
  let defaultGridSize = Math.pow(defaultSquaresPerSide, 2);

  // Get grid height and width, these are returned as strings
  const gridHeight = $('.container').css('height');
  const gridWidth = $('.container').css('width');

  // Convert height and width to numbers
  const gridHeightNumber = getNumber(gridHeight);
  const gridWidthNumber = getNumber(gridWidth);


  for (let i = 0; i < defaultGridSize; i++) {
    let sketchField = $('<div></div>')
                        .addClass('sketch-field')
                        .addClass('default-field-size');
    $('.container').append(sketchField);
  };


  let brush = blackFields;


  $('button[name=random]').on('click', function() {
    brush = randomFields;
  });


  $('button[name=black]').on('click', function() {
    brush = blackFields;
  });


  $('button[name=gradient]').on('click', function() {
    brush = gradientFields;
  });


  //$('.container').on('mouseenter', 'div', {div : $(this)}, blackFields);
  $('.container').on('mouseenter', 'div', function () {
    brush($(this));
  });


  $('button[name=size]').on('click', function() {
    const message = 'How many squares per side do you want?';
    let squaresPerSide = prompt(message, defaultSquaresPerSide);

    let fieldSize = (100 / squaresPerSide) + '%';
    $('.container').empty();

    for (let i = 0; i < Math.pow(squaresPerSide, 2); i++) {
      let sketchField = $('<div></div>')
                          .addClass('sketch-field')
                          .css({
                            'height' : fieldSize,
                            'width' : fieldSize,
                          });
      $('.container').append(sketchField);
    };
  });


  $('button[name=clear]').on('click', function() {
    $('.sketch-field').css('background-color', 'rgba(0,0,0,0)');
  });


});
