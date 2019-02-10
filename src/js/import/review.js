let clicked = false;

$('.review-slider-mobile a').on('click', function() {
  $('#review-video-modal iframe').attr('src', $(this).attr('data-src'));
});

$('.review-slider .swiper-slide').on('click', function() {

  if (!clicked) {
    clicked = true;
    setTimeout(function() { clicked = false; }, 1000); 
  } else{
    return false;
  }  

  var crr = $(this);
  var slide = $('.review__slide');
  

  slide.fadeOut(500); //Скрываем слайд

  //Меняем данные для слайда
  function changeData() {
    if (crr.find('a').length) {
      $('.review__open--2').show();
      $('#review-video-modal iframe').attr('src', crr.find('a').attr('href'));
    } else{
      $('.review__open--2').hide();
    }
    slide.find('.review__slide__photo img').attr('src', crr.find('img').attr('src'));
    slide.find('h3').text(crr.find('h3').text());
    slide.find('i').text(crr.find('i').text());
    slide.find('p').text(crr.find('.swiper-slide-text').text());
    slide.find('.review__slide__block__text').html(crr.find('.swiper-slide-text-big').html());
  }
    
  //Отложеный запуск срипта
  setTimeout(function() {
    changeData();
    $( 'p' ).off();
  }, 500);

  //Показываем слайд с обновленными данными
  slide.fadeIn(500);  

});

$('.review__open').on('click', function() {
  let text = $(this).closest('.review__slide').find('.review__slide__block__text').html();
  $('.text-modal div').html(text);
});


