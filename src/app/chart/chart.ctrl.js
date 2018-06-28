'use strict';




angular.module('inspinia').controller('ChartCtrl', function ($state, logsSvc, $timeout) {
  var vm = this;

    // split the data set into ohlc and volume
    var ohlc = [],
        volume = [],
        dataLength = data.length,
        // set the allowed units for data grouping
        groupingUnits = [[
          'week',                         // unit name
          [1]                             // allowed multiples
        ], [
          'month',
          [1, 2, 3, 4, 6]
        ]],

        i = 0;

    for (i; i < dataLength; i += 1) {
      ohlc.push([
        data[i].date*1000, // the date
        data[i].open, // open
        data[i].high, // high
        data[i].low, // low
        data[i].close // close
      ]);

      volume.push([
        data[i].date*1000, // the date
        data[i].volume // the volume
      ]);
    }

    console.log(ohlc);


    // create the chart
    Highcharts.stockChart('container', {

      plotOptions: {
        series: {
          marker: {
            enabled: false
          },
          dataGrouping: {
            enabled: false
          },
          point: {
            events: {
              click: function () {
                var annotation = Highcharts.Annotation[this.series.chart.annotating];

                if (annotation && annotation.onPointClick) {
                  annotation.onPointClick(this);
                }
              }
            }
          }
        },
        ema:{

        }
      },

      rangeSelector: {
        enabled:true,
        buttons: [{
          count: 1,
          type: 'hour',
          text: '6h',
          dataGrouping: {
            forced: true,
            units: [['hour', [4]]]
          }
        },{
          count: 24,
          type: 'hour',
          text: '24h',
          dataGrouping: {
            forced: true,
            units: [['hour', [4]]]
          }
        },{

          count: 2,
          type: 'day',
          text: '2d',
          dataGrouping: {
            forced: true,
            units: [['hour', [4]]]
          }
        },{
          type: 'day',
          count: 4,
          text: '4d',
          dataGrouping: {
            forced: true,
            units: [['hour', [4]]]
          }
        },{
          type: 'week',
          count: 1,
          text: '1w',
          dataGrouping: {
            forced: true,
            units: [['hour', [4]]]
          }
        }, { type: 'all', text: 'All' }], selected: 0, allButtonsEnabled: true,
      },

      title: {
        text: 'google chart'
      },

      yAxis: [{
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],

      tooltip: {
        split: true
      },

      series: [{
        type: 'candlestick',
        name: 'AAPL',
        id: 'main',
        data: ohlc,
        dataGrouping: {
          units: groupingUnits
        }
      }, {
        type: 'column',
        name: 'Volume',
        data: volume,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits
        }
      },{
        type:'ema',
        linkedTo: 'main',
        params: {
          period: 5
        },
        },
        {
          type:'sma',
          linkedTo: 'main',
          params: {
            period: 5
          },
        }
      ]
    });

})