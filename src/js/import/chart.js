import ChartJs from 'chart.js';

var ctx = document.getElementById('myChart').getContext('2d');


// var x1 = 20, y1 = 100, x2, y2, angle = 360,length = 50;
// x2 = x1 + Math.cos(angle) * length;
// y2 = y1 + Math.sin(angle) * length;
var gradientFill1 = ctx.createLinearGradient(300, 0, 100, 500);
gradientFill1.addColorStop(0, 'rgba(88, 254, 194, 0.6)');
gradientFill1.addColorStop(1, 'rgba(18, 11, 15, 0.6)');

var gradientFill2 = ctx.createLinearGradient(500, 0, 100, 0);
gradientFill2.addColorStop(0, 'rgba(227, 85, 115, 0.27)');
gradientFill2.addColorStop(1, 'rgba(18, 11, 15, 0.6)');

var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [0, '25-25', '50-55', 0],
    datasets: [{
      label: 'My First dataset',
      borderColor: 'rgba(88, 254, 194, 0.6)',
      backgroundColor: gradientFill1,
      data: [NaN, 115, 110],
      fill: 1
    },
    {
      label: 'My First dataset',
      backgroundColor: gradientFill2,
      borderColor: 'rgba(227, 85, 115, 0.6)',
      data: [NaN, 100, 40],
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'rgba(255,255,255,1)',
          min: 0,
          max: 115
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'rgba(255,255,255,1)',
        }
      }]
    }
  },
});
