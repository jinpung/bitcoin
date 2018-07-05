'use strict';

angular.module('inspinia').controller('ChartCtrl', function (financeSvc, $interval, $filter, exportService , $scope, $timeout) {
  'ngInject';

  var vm = this;

  vm.a = 1;

  vm.viewMode=1;

  var ary = financeSvc.getServiceFee();

  var siteAry = {};
  var coinAry = {};

  for(var key in ary){
    var siteName = key.toUpperCase();
    if(!siteAry[siteName]){
      siteAry[siteName] = [];
    }
    for(var coin in ary[key]){
      var coinName = coin.toUpperCase();
      siteAry[siteName].push(coinName);

      if(!coinAry[coinName]){
        coinAry[coinName] = [];
      }
      if(coinAry[coinName].indexOf(siteName) == -1){
        coinAry[coinName].push(siteName);
      }
    }
  }

  vm.siteAry = siteAry;
  vm.coinAry = coinAry;

  $timeout(function () {
    vm.site1 = "BITHUMB";
    vm.coin1 = "";

    vm.coin2 = "BTC";
    vm.site2 = "BITHUMB";
    $scope.$apply();
  },300)




  vm.onInit = function () {
    console.log('app init')
  };

  vm.onInit();

});
