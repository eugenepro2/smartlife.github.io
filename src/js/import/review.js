let clicked = false;

$('.review .swiper-slide').on('click', function() {

  if (!clicked) {
    clicked = true;
    setTimeout(function() { clicked = false; }, 1000); 
  } else{
    return false;
  }  

  var crr = $(this);
  var slide = $('.review__slide');
  

  slide.fadeOut(1000); //Скрываем слайд

  //Меняем данные для слайда
  function changeData() {
    slide.find('.review__slide__photo img').attr('src', crr.find('img').attr('src'));
    slide.find('h3').text(crr.find('h3').text());
    slide.find('i').text(crr.find('i').text());
    slide.find('p').text(crr.find('p').text());
  }
    
  //Отложеный запуск срипта
  setTimeout(function() {
    changeData();
    $( 'p' ).off();
  }, 1000);

  //Показываем слайд с обновленными данными
  slide.fadeIn(1000);  

});


