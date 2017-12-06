'use strict';

angular.module('inspinia').controller('LogsListCtrl', function ($state, logsSvc, $timeout) {

    var vm = this;
    vm.loadData = function () {
        logsSvc.get().then(function (res) {
            vm.list = res.data.logs;
            vm.list.forEach(function (row) {
                if(row.login_time){
                    row.login_time = moment(row.login_time).format("YYYY-MM-DD H:m");
                }
                if(row.logout_time){
                    row.logout_time = moment(row.logout_time).format("YYYY-MM-DD H:m");
                }
            })

            var chartData = res.data.chartData;
            var xKeys = [];
            var yValue = [];
            for(var i in res.data.chartData){
                xKeys.push(i);
                yValue.push(res.data.chartData[i]);
            }
            $timeout(function () {
                Highcharts.chart('container', {
                    title: {
                        text: 'User Connection'
                    },

                    yAxis: {
                        title: {
                            text: 'Number of Users'
                        }
                    },
                    xAxis: {
                        categories: xKeys
                    },
                    series: [{
                        name: 'logs',
                        data: yValue
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }

                });

            },300)
        })
    }
    vm.limit = 20;
    vm.step = 20;
    vm.loadData();


})