import Velocity from 'velocity-animate';




let preloader = $('#preloader');

preloader.delay(2000).velocity(
  {translateY : '-100%'}, 
  {duration: 1000, easing: [0.7,0,0.3,1]}
);  
setTimeout(function() {
  new WOW().init();
}, 1500);
  




