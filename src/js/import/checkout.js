//Добавить к заказу
$('.step__add').on('click', function() {
  let crr = $(this).closest('.step');
  crr.removeClass('no-active');
  sumProduct();
  checkProductInCart();
});

$('.step__m__add').on('click', function() {
  let crr = $(this).closest('.step');
  crr.find('.step__m__add').slideUp();
  crr.find('.step__m__slide').delay(500).slideDown();
  crr.removeClass('no-active');
  sumProduct();
  checkProductInCart();
});

//Удалить из заказа
$('.step__delete').on('click', function() {
  let crr = $(this).closest('.step');
  crr.addClass('no-active');
  sumProduct();
  checkProductInCart();
});

$('.step__m__delete').on('click', function() {
  let crr = $(this).closest('.step');
  crr.find('.step__m__slide').slideUp();
  crr.find('.step__m__add').delay(500).slideDown();
  crr.addClass('no-active');
  sumProduct();
  checkProductInCart();
});


//Сумма всех продуктов
function sumProduct() {
  let sum = 0;
  $('.step:visible').each(function() {
    let price = $(this).not('.no-active').find('select option:selected').data('price');
    if (price === undefined) {
      price = 0;
    }
    sum += parseInt(price);
  });

  $('.step__bottom__block span').text(sum);
  $('.step__m__bottom span').text(sum);
  
}
//Пересчитываем сумму после изминения select
$('select').change(function() {
  sumProduct();
});
sumProduct();



function changeStep(href) {
  $('.checkout__step').fadeOut(1000);
  $(`*[data-menu=${href.split('#')[1]}]`).addClass('active');
  $('html, body').animate({scrollTop: 0},500);
  $(href).delay(500).fadeIn(1000);
}


//Добавить
$('.add').on('click', function() {
  Calc($(this));
});

//Отнять
$('.substract').on('click', function() {
  Calc($(this));
});

//Ввод в поле
$('.keyup').keyup(function() {
  limiter($(this));
  checkStep1(getAllSum(), maxSet);
});




//Общая функция Калькулятора
let oldSet;
function Calc(el) {
  //Находим нужный нам input
  let input = findInput(el);
  //Находим старое значние input-a
  let oldValue = findOldValue(input);
  //Задаем новое значение
  setNewValue(el, oldValue, input);
  //Получаем сумму всех input-ов
  getAllSum();
  //Ограничиваем ввод по максимальному набору
  limitInput(getAllSum()); 
  
  checkStep1(getAllSum(), maxSet);
}



//Калькулятор
let maxSet = 20; //Максимальное значние набора

//Записываем максимальное значение в переменную
$('.step__set select, .step__m__set--afc select').change(function() {
  maxSet = parseInt($(this).val());
  limitInput(getAllSum());
  if(maxSet < getAllSum()) {
    resetInput();
    limitInput(getAllSum());
    console.log(2);
  }
});

//Находим текущий input
/**
 * @param {object} el - элемент на который был сделан клик
 */
function findInput(el) {
  return el.siblings('input');
}

//Находим старое значение input
/**
 * @param {object} el - input с которого нам нужно взять старое значение
 */
function findOldValue(el) {
  return parseInt(el.val());
}

//Задаем новое значение input
/**
 * @param {object} el - элемент на который был произведен клик
 * @param {number} oldValue - старое значение input-а 
 * @param {object} input - input в которой нам нужно записать новое значение
 */
function setNewValue(el, oldValue, input) {
  let action = el.attr('class');
  let newValue = ACTIONS[action](oldValue);
  newValue = validateNegativeNumbers(newValue);
  input.val(newValue);
}

// Получаем сумму всех input-ов
function getAllSum() {
  let sum = 0;
  $('.keyup').each(function() {
    let val = $(this).val();
    sum += parseInt(val);
  });
  return sum;
}


//Сложить, вычесть
let ACTIONS = {
  'add':       function(value) {return ++value;},
  'substract': function(value) {return --value;},
  'keyup':     function(value) {return value;}
};

//Обнуляем Input
function resetInput() {
  $('.keyup').val(0);
}

//Провека на максимальный ввод input
/**
 * @param {number} globalSum - глобальная сумма 
 */
function limitInput(globalSum) {
  if(globalSum >= maxSet) {
    $('.add').addClass('stop');
    $('.keyup').addClass('stop');
  } else{
    $('.keyup').removeClass('stop');
    $('.add').removeClass('stop');
  }
}

//Не более двух чисел в input
/**
 * @param {object} $this - элемент который нужно проверить
 */
function limiter($this) {
  // var maxLen = 2;
  // if($this.val().length > maxLen) {
  //   $this.val($this.val().substr(0, maxLen));			
  // }
  if(getAllSum() > maxSet) {
    $('.keyup').val(0);
    $('.keyup').blur();
  } else if(getAllSum() === maxSet) {
    $('.add').addClass('stop');
    $('.keyup').addClass('stop');
  }
}

//Проверка на отрицательные числа
/**
 * @param {number} n - число для проверки.
 */
function validateNegativeNumbers(n) {
  if (n < 0 || isNaN(n)) return 0;
  return parseInt(n);
}

//Проверка первого шага
/**
 * @param {number} sum - сумма всех ведденых полей
 * @param {number} maxSet - количество в наборе
 */

$('.next-2').on('click', function() {
  if(checkStep1(getAllSum(), maxSet) && checkProductInCart()) {
    changeStep($(this).attr('href'));
    checkDelivery();
  }
});

function checkStep1(sum, maxSet) {
  if(sum < maxSet && !$('.step__afc:visible').is('.no-active')) {
    $('.error').addClass('active');
    $('.error span').text(maxSet - sum);
    return false;
  } else{
    $('.error').removeClass('active');
    return true;
  }
}


// Проверка добавлен ли продукт в корзину
function checkProductInCart() {
  let afc = $('.step__afc:visible').is('.no-active');
  let ibc = $('.step__ibc:visible').is('.no-active');

  if (afc) {
    $('.select-first').prop('disabled', true);
  } else{
    $('.select-first').prop('disabled', false);
  }

  if (ibc) {
    $('.select-second').prop('disabled', true);
  } else{
    $('.select-second').prop('disabled', false);
  }

  if(afc && ibc) {
    return false;
  } else{
    return true;
  }

}



//Проверка второго Шага
$('.next-3').on('click', function() {
  checkStep2();
});


function checkStep2() {

  $('.step-2 input').not('#room').each(function() {
    if(!$(this).val()) {
      $(this).addClass('invalid');
    } else{
      $(this).removeClass('invalid');
    }
  });
  $('.step-2 .checkbox').addClass('invalid');
  $('.step-2 .checkbox:checked').removeClass('invalid');
    
  if (!$('.step-2 input').is('.invalid')) {
    changeStep($('.next-3').attr('href'));
  }
  Delivery();
}




//Ajax отправка формы
$('.checkout-button').on('click', function(e) {
  e.preventDefault(); 
  var $form = $(this).closest('form');
  ajaxMail($form);
});
function ajaxMail($form) {
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize()
  }).done(function() {
    document.location.href = 'http://smartlife.eugenee.pro/checkout-thank.html';
  }).fail(function() {
  });
}


//Отображение доставки по введному городу
function Delivery() {
  let city = $('#city').val();
  if (city.indexOf('Москва') + 1 || city.indexOf('москва') + 1 || city.indexOf('Moskva') + 1 || city.indexOf('Мск') + 1 || city.indexOf('МСК') + 1 || city.indexOf('Масква') + 1 || city.indexOf('МОсква') + 1 || city.indexOf('МАсква') + 1 || city.indexOf('МСк') + 1 || city.indexOf('msk') + 1 || city.indexOf('Msk') + 1 || city.indexOf('MSK') + 1 || city.indexOf('Moscow') + 1 || city.indexOf('MOSCOW') + 1 || city.indexOf('МОСКВА') + 1) {
    $('.delivery-1').show();
    $('.delivery-1 input').prop('checked', true);
    $('.delivery-3').hide();
    $('.step__payment__block--1 input').prop('checked', true);
  } else{
    $('.delivery-1').hide();
    $('.delivery-3 input').prop('checked', true);
    $('.step__payment__block--1').hide();
    $('.step__payment__block--2 input').prop('checked', true);
  }
}

function checkDelivery() {
  let afc;
  let ibc;
  function getCount() {
    if (!$('.step__afc:visible').is('.no-active')) {
      afc = parseInt($('.select-afc:visible option:selected').val());
    }
    if (!$('.step__ibc:visible').is('.no-active')) {
      ibc = parseInt($('.select-ibc:visible option:selected').val());
    }
    if (afc === undefined) {
      afc = 0;
    } else if(ibc === undefined) {
      ibc = 0;
    }
  }
  getCount();


  //Функция записи данных
  /**
   * @param {number} msk - сумма доставки курьером по Москве
   * @param {number} pr - сумма доставки курьером Почтой России
   */
  function setDelivery(msk, pr) {
    $('.delivery-1 input').attr('data-delivery-price', msk);
    $('.delivery-1 p span').text(msk);
    $('.delivery-3 input').attr('data-delivery-price', pr);
    $('.delivery-3 p span').text(pr);
  }

  if (afc === 20 && ibc === 0) {
    setDelivery(300, 360);
  } else if(afc === 20 && ibc === 1) {
    setDelivery(400, 400);
  } else if(afc === 0 && ibc === 1) {
    setDelivery(200, 250);
  } else if(afc === 0 && ibc === 2) {
    setDelivery(200, 290);
  } else if(afc >= 30 || ibc >= 3) {
    setDelivery(0, 0);
  }
}
