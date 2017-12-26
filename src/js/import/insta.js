import Instafeed from 'instafeed.js';

let userFeed = new Instafeed({
  get: 'user',
  userId: '181508931',
  limit: 8,
  accessToken: '181508931.1677ed0.18f7a2a26f0e488cb63a0094866b1546',
  template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="black"></div></a>',
  resolution: 'standard_resolution',
  limit: 6,
});


if($('div').is('#instafeed')) {
  userFeed.run();  
}

