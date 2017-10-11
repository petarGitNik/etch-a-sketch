$(document).ready(function() {

  let defaultGridSize = 16 * 16;

  for (let i = 0; i < defaultGridSize; i++) {
    let sketchField = $('<div></div>')
                        .addClass('sketch-field')
                        .addClass('default-field-size');
    $('.container').append(sketchField);
    console.log(i);
  };

  $('.sketch-field').on('mouseenter', function() {
    $(this).addClass('black');
  });

});
