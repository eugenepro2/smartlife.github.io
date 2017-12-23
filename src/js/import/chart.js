import ChartJs from 'chart.js';

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [0, '25-25', '50-55', 0],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: '#58fec2',
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
      data: [NaN, 115, 110],
    },
    {
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
      data: [NaN, 100, 40],
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 115
        }
      }]
    }
  },
});
