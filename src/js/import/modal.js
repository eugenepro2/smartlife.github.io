import JqueryModal from 'jquery-modal';

//pop-up 1
$('.open-modal-consist').on('click', function() {
  $('.conclusion__consist-1').fadeIn();
});

$('.btn-close').on('click', function() {
  $('.conclusion__consist-1').fadeOut();
});

$('.open-modal-consist-2').on('click', function() {
  $('.conclusion__consist-2').fadeIn();
});

$('.btn-close').on('click', function() {
  $('.conclusion__consist-2').fadeOut();
});

//Разварачивающиеся блоки
$('.conclusion__consist__block h4').on('click', function() {
  hidden($(this));
});

function hidden(crr) {
  $('.conclusion__hidden').slideUp();
  if (crr.hasClass('active')) {  
    $('.conclusion__consist__block h4').removeClass('active');
    return false;
  }
  $('.conclusion__consist__block h4').removeClass('active');
  crr.find('.conclusion__hidden').slideDown();
  crr.addClass('active');
}



//pop-up 3
$('.head__block__text span').on('click', function() {
  $('.pop-up-3').fadeIn();
});
$('.submit').on('click', function() {
  $('.form').fadeOut();
  $('.pop-up-3__block__result').fadeIn();
});
$('.submit__home').on('click', function() {
  $('.pop-up-3').fadeOut();
});


//contact form
$('.btn--contact').on('click', function() {
  $('.contact__form').fadeIn();
  $('#fullpage').fadeOut();
});

$('.btn-close').on('click', function() {
  $('.contact__form').fadeOut();
  $('#fullpage').fadeIn();
  if ($('div').hasClass('.contact__form')) {
    $('html, body').animate({ scrollTop: $(document).height() }, 100);  
  }
});




//study-popup
$('.study__bottom a').on('click', function() {
  $('.study-popup').fadeIn();
});

$('.btn-close').on('click', function() {
  $('.study-popup').fadeOut();
});
