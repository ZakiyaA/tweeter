// ------ Activate the counter--------
// ----- Display max value when the bage start loading---
$(document).ready(function () {
  var maxLength = 140;
  $('#counter').val(140);
  // ----
  $('#textarea').keyup(function () {
    var length = $(this).val().length;
    var text_remaining = maxLength - length;
    $('#counter').text(text_remaining);
    if (text_remaining < 0) {
      $("#counter").css("color", "red");
    } else {
      $("#counter").css("color", "black");
    }
  });
});