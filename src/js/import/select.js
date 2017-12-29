import Select from 'tether-select';


$('select.select-first').each(function() {
  var selectInstance = new Select({
    el: this,
    className: 'select-theme-default',
  });
});


$('select.select-second').each(function() {
  var selectInstance = new Select({
    el: this,
    className: 'select-theme-default-2',
  });
});
