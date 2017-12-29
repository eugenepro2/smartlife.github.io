
//Добавить к заказку
$('.step__add').on('click', function() {
  let crr = $(this).closest('.step');
  crr.removeClass('no-active');
  sumProduct();
});

//Удалить из заказа
$('.step__delete').on('click', function() {
  let crr = $(this).closest('.step');
  crr.addClass('no-active');
  sumProduct();
});


//Сумма всех продуктов
function sumProduct() {
  let sum = 0;
  $('.step').each(function() {
    let price = $(this).not('.no-active').find('select option:selected').data('price');
    if (price === undefined) {
      price = 0;
    }
    sum += parseInt(price);
  });

  $('.step__bottom__block span').text(sum);
  
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
let maxSet = 10; //Максимальное значние набора

//Записываем максимальное значение в переменную
$('.step__set select').change(function() {
  maxSet = $(this).val();
  limitInput(getAllSum());
  if(maxSet < getAllSum()) {
    resetInput();
    limitInput(getAllSum());
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
  var maxLen = 2;
  if($this.val().length > maxLen) {
    $this.val($this.val().substr(0, maxLen));			
  }
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
  }
});

function checkStep1(sum, maxSet) {
  if(sum < maxSet) {
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
  let afc = $('.step__afc').is('.no-active');
  let ibc = $('.step__ibc').is('.no-active');

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

}


