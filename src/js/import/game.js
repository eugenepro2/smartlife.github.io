$( document ).ready(function() {

  $('.btn__left').on('click', function() {
    $(this).closest('.pop-up__block__cont').fadeOut();
    $('#gamecontainer').delay(500).fadeIn();
  });


  var numberOfLoop = 5;
  var currentLoop = 0;
  var maxTimeToWait = 5000;
  var maxTimeToClick = 10;
  var timerRunning;
  var pauseRunning;
  var allTime = [];
  var beginTime = '';
  var currentTime ='';
  var currentResult;
  var avarageTime = 0;
  var bestTime;
  var waitToClick = false;
  var pause = false;
  var skip = false;
  var height = $('#gamefield').css('width');
  $('#gamecontainer').hide();
  $('#gamefield').css('height', height);
  $('#startBtn').css({'position': 'absolute', 'top': '4%', 'left': '33.3334%'});
  $('#playAgain').css({'position': 'absolute', 'display': 'none', 'left': '33.3334%'});
  $('#startBtn').on('click', function(event) {
    document.getElementById('instaction').style.display = 'none';
    $('#gamefield').css({'backgroundColor': 'rgb(255, 255, 0)', 'border': '5px solid rgb(220, 220, 0)'});
    document.getElementById('currentTime').innerHTML = '';
    document.getElementById('gameResult').innerHTML = '';
    allTime = [];
    var avarageTime = 0;
    event.stopPropagation();
    startGame();
  });
  $('#playAgain').on('click', function(event) {
    document.getElementById('instaction').style.display = 'block';
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('gameResult').innerHTML = '';
    document.getElementById('playAgain').style.display = 'none';
  });
  
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#gamefield').on('touchstart', function() {
      if(waitToClick && !skip) {
        displayCurrentTime();
        allTime.push((currentResult*1000 - 70)/1000);
        clearInterval(timerRunning);
        changeColor();
        startGame();
      } else if(waitToClick && skip) {
        changeColor();
        startGame();
      } else {
        if(pause) {
          alert('ждите смены цвета');
          clearInterval(pauseRunning);
          currentLoop--;
          startGame();
        }
                  
                  
      }
    });
  } else {
    $('#gamefield').mousedown(function() {    
      if(waitToClick && !skip) {
        displayCurrentTime();
        allTime.push(currentResult);
        clearInterval(timerRunning);
        changeColor();
        startGame();
      } else if(waitToClick && skip) {
        changeColor();
        startGame();
      } else {
        if(pause) {
          alert('ждите смены цвета');
          clearInterval(pauseRunning);
          currentLoop--;
          startGame();
        }
                  
                  
      }
    });
  }
  
  function startGame() {
    currentLoop++;
    if(currentLoop > numberOfLoop) {
      gameOver();
      return;
    }
    $('#startBtn').hide();
    pauseRunning = setTimeout(changeColor, setTimeWait());
    pause = true;
  }
  function setTimeWait() {
    return (2000 + Math.round((Math.random() * maxTimeToWait)));
  }
  function changeColor() {


    if($('#gamefield').css('backgroundColor') === 'rgb(255, 255, 0)') {
      $('#gamefield').css({'backgroundColor': 'rgb(255, 0, 0)', 'border': '5px solid rgb(220, 0, 0)'});
      document.getElementById('currentTime').innerHTML = '';
    } else {
      $('#gamefield').css({'backgroundColor': 'rgb(255, 255, 0)', 'border': '5px solid rgb(220, 220, 0)'});
    }
    if(!waitToClick) {
      startTimer();
      pause = false;
    }
    waitToClick = !waitToClick;
    if(skip) {
      skip = false;
    }
    
    
    
  }
  function startTimer() {
    beginTime = new Date();
    beginTime = beginTime.getTime();
    //timerRunning = setInterval(displayCurrentTime, 1);
  }
  function displayCurrentTime() {
    currentTime = new Date();
    currentTime = currentTime.getTime();
    currentResult = (currentTime - beginTime) / 1000;
    if(currentResult > maxTimeToClick) {
      clearInterval(timerRunning);
      currentLoop--;
      skip = true;
      document.getElementById('currentTime').innerHTML = '';
    } else {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.getElementById('currentTime').innerHTML = (currentResult*1000 - 70)/1000;
      } else {
        document.getElementById('currentTime').innerHTML = currentResult;
      }
          
    }
    
  }
  function gameOver() {

    clearInterval(pauseRunning);
    var txt = '<table style="width: 100%;"><caption>Результат игры (время в секундах)</caption><tbody>';
    avarageTime = 0;
    bestTime = allTime[0];
    for(var i = 0; i < allTime.length; i++) {
      if(bestTime > parseFloat(allTime[i])) {
        bestTime = parseFloat(allTime[i]);
      }
      avarageTime += parseFloat(allTime[i]);
      txt += '<tr><td>' + (i + 1) + ') </td><td>' + allTime[i] + '</td></tr>';
    }
    avarageTime = Math.round((avarageTime / allTime.length) * 1000) / 1000;
    txt += '<tr><td>' + 'среднее ' + '</td><td>' + avarageTime + '</td></tr>';
    txt += '<tr><td>' + 'лучшее ' + '</td><td>' + bestTime + '</td></tr></tbody></table>';
      
    document.getElementById('currentTime').innerHTML = '';
    $('#playAgain').css('top', '0%');
    $('#playAgain').show();
    $('#gamefield').css({'backgroundColor': 'rgb(0, 255, 0)', 'border': '5px solid rgb(0, 220, 0)'});
    currentLoop = 0;
    var text;
    for(var i = 0; i < allTime.length; i++) {
      text += (i + 1) + ':' + allTime[i] + ', ';
    }
    $('#gamecontainer').fadeOut();
    $('.pop-up__block__form').delay(500).fadeIn();
    $('.form-game .game').val(text + 'Среднее время: ' + avarageTime + ', Лучшее время: ' + bestTime);

    //Ajax отправка формы
    $('.form-game').submit(function(e) {
      e.preventDefault(); 
      var $form = $(this);
      ajaxMail($form);
    });
    function ajaxMail($form) {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize()
      }).done(function() {
        $('.pop-up__block__form').fadeOut();
        $('.pop-up__block__result').delay(500).fadeIn();
      }).fail(function() {
        $('.pop-up__block__form').fadeOut();
        $('.pop-up__block__result').delay(500).fadeIn();
      });
    }
  }
});
