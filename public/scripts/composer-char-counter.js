
 
$(document).ready(function () {
  console.log("hellllo");
});

$(document).ready(function () {
  var maxLength = 140;
  $('#textarea_feedback').text(maxLength);

  $('#textarea').keyup(function () {
    var length = $(this).val().length;
    var text_remaining = maxLength - length;
    $('#textarea_feedback').text(text_remaining);
    if (text_remaining < 0) {
      $("#textarea_feedback").css("color", "red");
    } else {
      $("#textarea_feedback").css("color", "black");
    }

  });
});