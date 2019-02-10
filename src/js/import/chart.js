if ($(window).width() <= 640) {
  $('.svg').remove();
} else{
  $('.svg-m').remove();
}

jQuery('img.svg, img.svg-m').each(function() {
  var $img = jQuery(this);
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');

  jQuery.get(imgURL, function(data) {
    // Get the SVG tag, ignore the rest
    var $svg = jQuery(data).find('svg');

    // Add replaced image's ID to the new SVG
    if(typeof imgID !== 'undefined') {
      $svg = $svg.attr('id', imgID);
    }
    // Add replaced image's classes to the new SVG
    if(typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass+' replaced-svg');
    }

    // Remove any invalid XML tags as per http://validator.w3.org
    $svg = $svg.removeAttr('xmlns:a');

    // Replace image with new SVG
    $img.replaceWith($svg);

  }, 'xml');

});


$(function() {
  // if ($('svg').is('#chart')) {
  //   Chart();  
  // }
  setTimeout(function() {
    if ($('svg').is('#chart')) {
      Chart();  
    }
  }, 1000);
});

// setTimeout(function() {
//   if ($('svg').is('#chart')) {
//     Chart();  
//   }
// }, 500);




function Chart() {

  let s = Snap.select('#chart');
  let line0 = s.select('#line0');
  let line10 = s.select('#line10');
  let line25 = s.select('#line25');
  let line30 = s.select('#line30');
  let line35 = s.select('#line35');
  let line40 = s.select('#line40');
  let line60 = s.select('#line60');
  let line65 = s.select('#line65');
  let line100 = s.select('#line100');
  let line110 = s.select('#line110');
  let line115 = s.select('#line115');
  let line120 = s.select('#line120');
  let line125 = s.select('#line125');
  let line130 = s.select('#line130');

  let green = s.select('#green-circle');
  let green2 = s.select('#green-circle-2');
  let greenLine = s.select('#green-line');
  let greenPoly = s.select('#green-poly');

  let red = s.select('#red-circle');
  let red2 = s.select('#red-circle-2');
  let redLine = s.select('#red-line');
  let redPoly = s.select('#red-poly');

  //При загрузке странице запускаем график
  $('.st').removeClass('st2');
  setCircleGreen(line115, line110, line40, line100);
  setCircleRed(line100, line40);


  //График на мобильных
  $('.study select').on('change', function() {

    $('.st').removeClass('st2');
    if (!(crr === '7' || crr === '8')) {
      $('#green-poly').removeClass('opacity');
      $('.two').removeClass('grad');
    }
    let crr = $(this).find('option:selected').val();
    switch (crr) {
      case '1':
        data1();
        break;
      case '2':
        data2();
        break;
      case '3':
        data3();
        break;
      case '4':
        data4();
        break;
      case '5':
        data5();
        break;
      case '6':
        data6();
        break;
      case '7':
        data7();
        break;
      case '8':
        data8();
        break;
    }
    
  });
  
  //График на ПК
  $('.study ul li').on('click', function() {
    $('.st').removeClass('st2');
  });
  $('.study ul li:eq(0)').on('click', function() {
    data1();
  });

  $('.study ul li:eq(1)').on('click', function() {
    data2();
  });

  $('.study ul li:eq(2)').on('click', function() {
    data3();
  });

  $('.study ul li:eq(3)').on('click', function() {
    data4();
  });

  $('.study ul li:eq(4)').on('click', function() {
    data5();
  });

  $('.study ul li:eq(5)').on('click', function() {
    data6();
  });

  $('.study ul li:eq(6)').on('click', function() {
    data7();
  });

  $('.study ul li:eq(7)').on('click', function() {
    data8();
  });


  $('.study ul li').not('.opacity').on('click', function() {
    $('#green-poly').removeClass('opacity');
    $('.two').removeClass('grad');
  });

  function data1() {
    setCircleGreen(line115, line110, line40, line100);
    setCircleRed(line100, line40);
  }

  function data2() {
    setCircleGreen(line120, line115, line30, line100);
    setCircleRed(line100, line30);
  }
  function data3() {
    setCircleGreen(line110, line100, line25, line100);
    setCircleRed(line100, line25);
  }
  function data4() {
    setCircleGreen(line130, line125, line35, line100);
    setCircleRed(line100, line35);
  }
  function data5() {
    setCircleGreen(line125, line120, line35, line100);
    setCircleRed(line100, line35);
  }
  function data6() {
    setCircleGreen(line115, line110, line60, line100);
    setCircleRed(line100, line60);
  }
  function data7() {
    setCircleGreen(line10, line40, line0, line0);
    setCircleRed(line25, line60);
    $('#green-poly').addClass('opacity');
    $('.two').addClass('grad');
  }
  function data8() {
    setCircleGreen(line10, line25, line0, line0);
    setCircleRed(line10, line60);
    $('#green-poly').addClass('opacity');
    $('.two').addClass('grad');
  }


  //График, зеленая секция
  function setCircleGreen(a, b, c, x) {
    $(a.node).addClass('st2');
    $(b.node).addClass('st2');
    a = a.getBBox();
    b = b.getBBox();
    c = c.getBBox();
    x = x.getBBox();
    if (c.cy === 502.5) {
      c.cy = 500;
      x.cy = 500;
    }

    green.animate({
      transform: `t0,${a.cy}`
    }, 700, mina.backout);
    green2.animate({
      transform: `t0,${b.cy}`
    }, 700, mina.backout);
    greenLine.animate({
      y1: a.cy,
      y2: b.cy
    }, 700, mina.backout);
    if ($(window).width() <= 640) {
      greenPoly.animate({
        points: [158,x.cy.toFixed(1),158,a.cy.toFixed(1),394,b.cy.toFixed(1),395,c.cy.toFixed(1),0]
      }, 700, mina.backout);
    } else{
      greenPoly.animate({
        points: [191,x.cy.toFixed(1),191,a.cy.toFixed(1),556,b.cy.toFixed(1),556,c.cy.toFixed(1),0]
      }, 700, mina.backout);
    }
  }
  //График, красная секция
  function setCircleRed(a, b) {
    $(a.node).addClass('st2');
    $(b.node).addClass('st2');
    a = a.getBBox();
    b = b.getBBox();
    red.animate({
      transform: `t0,${a.cy}`
    }, 700, mina.backout);
    red2.animate({
      transform: `t0,${b.cy}`
    }, 700, mina.backout);
    redLine.animate({
      y1: a.cy,
      y2: b.cy
    }, 700, mina.backout);
    if ($(window).width() <= 640) {
      redPoly.animate({
        points: [158,500,158,a.cy.toFixed(1),394,b.cy.toFixed(1),394,500,0]
      }, 700, mina.backout);
    } else{
      redPoly.animate({
        points: [191,500,191,a.cy.toFixed(1),556,b.cy.toFixed(1),556,500,0]
      }, 700, mina.backout);
    }
  }
}
