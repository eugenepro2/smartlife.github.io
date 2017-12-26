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
});
