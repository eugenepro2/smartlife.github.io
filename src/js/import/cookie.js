import Cookies from 'js-cookie';
import jsrender from 'jsrender';


//Открыть через 15 секунд
// setTimeout(function() {
//   if ($('div').is('#fullpage') && Cookies.get('popup') !== 'true') {
//     $('.pop-up-game').fadeIn();  
//   }
//   Cookies.set('popup', 'true');
// }, 15000);
//Закрыть Popup
$('.btn-close').on('click', function() {
  $('.pop-up').fadeOut();
});
$('.btn__right').on('click', function() {
  $('.pop-up').fadeOut();
});

$('[data-checkout]').on('click', function() {
  $('.pop-up-checkout').fadeIn(); 
});

$('[data-cookie]').on('click', function() {
  let product = $(this).attr('data-cookie');
  Cookies.set('productName', product);
});

//Что отображать первым на странице оформления заказа 'ibc' или 'afc'
if (Cookies.get('productName') === 'ibc') {
  $('.step-1--ibc').addClass('first-xs');
  $('.step-1--ibc').find('.step').removeClass('no-active');
  $('.step-1--afc').addClass('last-xs');
  $('.step-1--afc').find('.step').addClass('no-active');

  $('.step__m .step__ibc').addClass('first-xs');
  $('.step__m .step__ibc').removeClass('no-active');
  $('.step__m .step__ibc .step__m__slide').slideDown();
  $('.step__m .step__ibc .step__m__add').slideUp();
  $('.step__m .step__ibc h2 span').text('1');

  $('.step__m .step__afc').addClass('last-xs');
  $('.step__m .step__afc').addClass('no-active');
  $('.step__m .step__afc .step__m__add').slideDown();
  $('.step__m .step__afc .step__m__slide').slideUp();
  $('.step__m .step__afc h2 span').text('2');
} else if(Cookies.get('productName') === 'afcibc') {
  $('.step-1--ibc').find('.step').removeClass('no-active');
  $('.step__m .step__ibc .step__m__slide').slideDown();
  $('.step__m .step__ibc .step__m__add').slideUp();
  $('.step__m .step__ibc').removeClass('no-active');
}


//Сегодняшняя дата
let date = new Date();
let newDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

//Записываем в Куки все данные с оформления заказа
$('.checkout-button').on('click', function() {
  let address1 = $('#city').val() + ', ' + $('#street').val() + ', ' + $('#house').val() + ', ' + $('#room').val();
  Cookies.set('checkout', { 
    setAfc: $('.step__afc:not(.no-active) .select-first option:selected').val(),
    setIbc: $('.step__ibc:not(.no-active) .select-second option:selected').val(),
    priceAfc: $('.step__afc:not(.no-active) .select-first option:selected').attr('data-price'),
    priceIbc: $('.step__ibc:not(.no-active) .select-second option:selected').attr('data-price'),
    strawberry: $('.step__afc:not(.no-active) .strawberry input').val(),
    mint: $('.step__afc:not(.no-active) .mint input').val(),
    chocolate: $('.step__afc:not(.no-active) .chocolate input').val(),
    cherry: $('.step__afc:not(.no-active) .cherry input').val(),
    name: $('#name').val(), 
    lastName: $('#lastname').val(),
    tel: $('#tel').val(), 
    email: $('#email').val(), 
    address: address1, 
    comment: $('#comment').val(),
    delivery: $('input[name="delivery"]:checked').attr('data-delivery'), 
    priceDelivery: $('input[name="delivery"]:checked').attr('data-delivery-price'), 
    payment: $('input[name="payment"]:checked').attr('data-payment'),
    date: newDate
  });
});

//JS Render
let template = $.templates('#theTmpl');
let htmlOutput = template.render([Cookies.getJSON('checkout')],);
$('#result').html(htmlOutput);

let sumProduct = 0;

function validateNegativeNumbers(n) {
  if (n < 0 || isNaN(n)) return 0;
  return parseInt(n);
}
function getSum() {
  let a = parseInt($('.thank__order__block__sum--1').text());
  let b = parseInt($('.thank__order__block__sum--2').text());
  let c = parseInt($('.thank__order__block__sum--3').text());
  
  a = validateNegativeNumbers(a);
  b = validateNegativeNumbers(b);
  c = validateNegativeNumbers(c);
  sumProduct = a + b + c;

  $('.thank__order__block__sum__all span').text(sumProduct + ' ₽');
}
getSum();

//Удаляем куки после успешного оформления заказа
if (location.pathname === '/checkout-thank.html') {
  Cookies.remove('checkout');
  Cookies.remove('productName');
}
