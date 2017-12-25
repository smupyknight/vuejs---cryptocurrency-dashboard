$(document).ready(function () {
  $('.list').click(function (e) {
    if (e.target.parentNode === this) {
      $(this).children('div').toggleClass('opened');
      $(this).children("ul").slideToggle();
      event.stopPropagation();
    }
  });
});