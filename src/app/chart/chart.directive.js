'use strict';

angular.module('inspinia').directive('coinChart', function (candlesticksvc) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      siteName: '=',
      coinName: '='
    },
    template: '<div class="wrapper wrapper-content  animated fadeInRight chart-widget" style="padding-bottom: 0px;">' +
    '             <div class="loading" ng-if="loading"> {{siteName}}  {{coinName}} &nbsp;&nbsp;&nbsp;<i class="fa fa-spin fa-spinner" aria-hidden="true"></i> </div>' +
    '             <div class="row">' +
    '               <div class="col-sm-12">' +
    '                 <div class="ibox">' +
    '                   <div class="ibox-content">' +
    '                     <div class="chart-container" style="height: 400px;">' +
    '                     </div>' +
    '                   </div>' +
    '                 </div>' +
    '             </div>' +
    '           </div>' +
    '         </div>',
    link: function (scope, element) {
      console.log(scope.siteName);
      console.log(scope.coinName);
      var ele = $(".chart-container", element)[0];



      function createDateAsUTC(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
      }

      function drawChart() {
        scope.loading = true;
        candlesticksvc.getData(scope.siteName, scope.coinName).then(function (res) {
          scope.loading = false;
          var data = res.data.candlestick;

          var ohlc = [];
          var dataLength = data.length;
          var start = '';

          var groupingUnits = [[
            'week',                         // unit name
            [1]                             // allowed multiples
          ], [
            'month',
            [1, 2, 3, 4, 6]
          ]];

          for (var i=0; i < dataLength; i++) {
            ohlc.push([
              (createDateAsUTC((new Date((createDateAsUTC((new Date(data[i].vm_record_time)))).valueOf())))).valueOf(), // the date
              data[i].vm_rate_start*1, // open
              data[i].vm_rate_high*1, // high
              data[i].vm_rate_low*1, // low
              data[i].vm_rate_end*1 // close
            ]);
          }
          if(dataLength){
            start = data[dataLength-1].vm_record_time;
          }

          Highcharts.stockChart(ele, {
            chart: {
              events: {
                load: function () {

                  // set up the updating of the chart each second
                  var series = this.series[0];
                  setInterval(function () {
                    candlesticksvc.getData(scope.siteName, scope.coinName, start).then(function (res) {
                      var data = res.data.candlestick;
                      var dataLength = data.length;
                      for (var i=0; i < dataLength; i++) {
                        series.addPoint([
                          (createDateAsUTC((new Date((createDateAsUTC((new Date(data[i].vm_record_time)))).valueOf())))).valueOf(), // the date
                          data[i].vm_rate_start*1, // open
                          data[i].vm_rate_high*1, // high
                          data[i].vm_rate_low*1, // low
                          data[i].vm_rate_end*1 // close
                        ], true, true);
                      }
                      if(dataLength){
                        start = data[dataLength-1].vm_record_time;
                      }
                    })
                  }, 5*60*1000);
                }
              }
            },

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
                count: 6,
                type: 'hour',
                text: '6h',
                dataGrouping: {
                  forced: false,
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
                  forced: false,
                  units: [['hour', [4]]]
                }
              },{
                type: 'day',
                count: 4,
                text: '4d',
                dataGrouping: {
                  forced: false,
                  units: [['hour', [4]]]
                }
              },{
                type: 'week',
                count: 1,
                text: '1w',
                dataGrouping: {
                  forced: false,
                  units: [['hour', [4]]]
                }
              }, { type: 'all', text: 'All' }], selected: 0, allButtonsEnabled: true,
            },

            title: {
              text: scope.siteName + " " + scope.coinName
            },

            yAxis: [{
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: 'price'
              },
              height: '100%',
              lineWidth: 2,
              resize: {
                enabled: true
              }
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
              type:'ema',
              linkedTo: 'main',
              params: {
                period: 30
              },
            },
              {
                type:'sma',
                linkedTo: 'main',
                params: {
                  period: 30
                },
              }
            ]
          });

        })
      }

      drawChart();

      scope.$watch("siteName", function (newValue, oldValue) {
        if(oldValue && oldValue != newValue){
          drawChart();
        }
      })

      scope.$watch("coinName", function (newValue, oldValue) {
        if(oldValue && oldValue != newValue){
          drawChart();
        }
      })

    }
  };
});
