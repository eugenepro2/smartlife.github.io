import fullPage from 'fullpage.js';


$('#fullpage').fullpage({
  menu: '.sidebar',
  anchors:['home', 'afc', 'ibc', 'review', 'study', 'photos', 'contact'],
  //Меняем логотип на нужных нам страницах
  afterLoad: function(anchorLink, index) {
    if(anchorLink === 'afc' || anchorLink === 'ibc' || anchorLink === 'review' || anchorLink === 'photos' || anchorLink === 'contact') {
      $('.sidebar__logo').addClass('green');
      $('.sidebar__logo img').attr('src', 'img/logo/logo-white.svg');
    } else{
      $('.sidebar__logo').removeClass('green');
      $('.sidebar__logo img').attr('src', 'img/logo/logo.svg');
    }
  },
  onLeave: function(index, nextIndex, direction) {
    if (nextIndex === 2) {
      $('.afc h2').addClass('animated fadeIn').css('animation-delay', '.3s');
      $('.afc__slider').addClass('animated zoomIn').css('animation-delay', '.6s');
      $('.swiper-container').addClass('animated zoomIn').css('animation-delay', '.7s');
      $('.afc__info').addClass('animated fadeIn').css('animation-delay', '1.0s');
      $('.afc__price').addClass('animated fadeIn').css('animation-delay', '1.1s');
    } else if(nextIndex === 3) {
      $('.ibc h2').addClass('animated fadeIn').css('animation-delay', '.3s');
      $('.ibc__comp').addClass('animated fadeIn').css('animation-delay', '.4s');
      $('.ibc__advantages__block--1 img').addClass('animated fadeIn').css('animation-delay', '.6s');
      $('.ibc__advantages__block--1 p ').addClass('animated fadeInRight').css('animation-delay', '.8s');
      $('.ibc__advantages__block--2 img').addClass('animated fadeIn').css('animation-delay', '1s');
      $('.ibc__advantages__block--2 p ').addClass('animated fadeInRight').css('animation-delay', '1.2s');
      $('.ibc__advantages__block--3 img').addClass('animated fadeIn').css('animation-delay', '1.4s');
      $('.ibc__advantages__block--3 p ').addClass('animated fadeInRight').css('animation-delay', '1.6s');

      $('.ibc__info').addClass('animated zoomIn').css('animation-delay', '1.8s');
      $('.ibc__price').addClass('animated zoomIn').css('animation-delay', '2s');
     
    }
  }
});
