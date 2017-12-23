import Swiper from 'swiper';

let homeSwiper = new Swiper ('.home-slider', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  speed: 1000
});

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
  // on: {
  //   slideChangeTransitionStart: function() {
  //     $('.swiper-slide-next').css('transform', 'translateX(70px)');
  //   }
  // }
});

afcSwiper.slideTo(2);
