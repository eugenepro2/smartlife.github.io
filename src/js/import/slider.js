import Swiper from 'swiper';


//Слайдер на главной
let homeSwiper = new Swiper ('.home-slider', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  speed: 500,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});

//Слайдер AFC
let afcSwiper = new Swiper ('.afc-slider', {
  direction: 'vertical',
  slidesPerView: 3,
  speed: 1000,
  loop: true,
  centeredSlides: true,
  simulateTouch: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // on: {
  //   init: function() {
  //     this.slideTo(1);
  //   },
  // }
});


//Слайдер для отзывов(миниаютюры)
let reviewSwiper = new Swiper ('.review-slider', {
  slidesPerView: 4,
  speed: 1000,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


//Лендинг .applying__1
let applyingSwiper = new Swiper ('.applying-slider-top', {
  slidesPerView: 1,
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
});

//Лендинг .applying__2
let applyingSliderBottom = new Swiper ('.applying-slider-bottom', {
  slidesPerView: 1,
  navigation: {
    nextEl: '#next',
    prevEl: '#prev',
  },
});
 

