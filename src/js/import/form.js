//Ajax отправка формы
$('.home-form form').submit(function(e) {
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
    $('form').fadeOut(500); 
    $('.response').delay(1000).fadeIn();
    $('form input').each(function() {
      $(this).delay(3000).val('');
    });
  }).fail(function() {
    console.log('fail');
  });
}
