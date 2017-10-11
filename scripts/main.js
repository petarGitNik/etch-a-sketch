function getNumber(candidate) {
  // candidate is in the form '640px'
  let re = /\d+/g;
  return re.exec(candidate)[0];
}


$(document).ready(function() {
  // jQuery code

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


  $('.sketch-field').on('mouseenter', function() {
    $(this).addClass('black');
  });


  $('button[name=clear]').on('click', function() {
    const message = 'How many squares per side do you want?';

    let squaresPerSide = prompt(message, defaultSquaresPerSide);

    // Use either height or width, it does not matter since the grid
    // is a square
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


});
