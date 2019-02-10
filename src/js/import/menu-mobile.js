$('.open-menu').on('click', function() {
  $(this).toggleClass('active');
  $('.mobile-menu').slideToggle();
  $('body').toggleClass('is-open');
  $('.social').toggleClass('active');
});

$('.mobile-menu a').on('click', function() {
  $('.open-menu').toggleClass('active');
  $('.mobile-menu').slideToggle();
  $('body').toggleClass('is-open');
  $('.social').toggleClass('active');
});
