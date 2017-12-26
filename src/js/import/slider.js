import Swiper from 'swiper';


//Слайдер на главной
let homeSwiper = new Swiper ('.home-slider', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  speed: 1000
});

//Слайдер AFC
let afcSwiper = new Swiper ('.afc-slider', {
  direction: 'vertical',
  slidesPerView: 3,
  speed: 1000,
  centeredSlides: true,
  simulateTouch: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function() {
      this.slideTo(1);
    },
  }
});


//Слайдер для отзывов(миниаютюры)
let reviewSwiper = new Swiper ('.review-slider', {
  slidesPerView: 4,
  speed: 1000,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

