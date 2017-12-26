
//Добавить к заказку
$('.step__add').on('click', function() {
  let crr = $(this).closest('.step');
  crr.removeClass('no-active');
});

//Удалить из заказа
$('.step__delete').on('click', function() {
  let crr = $(this).closest('.step');
  crr.addClass('no-active');
});

//Шаги
$('.sidebar__checkout li').on('click', function() {
  let crr = $(this);
  let href = crr.find('a').attr('href');
  changeStep(href);
});

$('.next').on('click', function() {
  let href = $(this).attr('href');
  changeStep(href);
});

function changeStep(href) {
  $('.checkout__step').fadeOut(1000);
  $(href).delay(500).fadeIn(1000);
}
