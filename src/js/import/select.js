import Select from 'tether-select';


$('select').each(function() {
  var selectInstance = new Select({
    el: this,
    className: 'select-theme-default',
  });
});
