'use strict';

angular.module('inspinia').controller('ExrateCtrl', function (financeSvc, $interval, authSvc, $rootScope, $scope, $filter) {
  'ngInject';

    var vm = this;
    vm.siteArray = financeSvc.getSiteArray();
    vm.onInit = function () {
        vm.appInterval = $interval(init, 5000);
    };
    vm.onInit();
    $scope.$on("$destroy", function(){
        $interval.cancel(vm.appInterval);
    })

    vm.loaded = false;
    function init() {
        // console.log('request init');
        financeSvc.getVMRate().then(function (res) {
            var vmRate = {};
            var vmData = res.data.results;
            for(var i=0; i<vmData.length; i++){
              var row = vmData[i];
              if(typeof vmRate[row.site_name] == "undefined"){
                  var arys = $filter("filter")(vm.siteArray, {siteName:row.site_name}, true);
                  if(arys.length){
                      vmRate[row.site_name] = angular.copy(arys[0]);
                  }else{
                      vmRate[row.site_name] = {};
                  }
                  vmRate[row.site_name]['vmData'] = [];
              }
                vmRate[row.site_name]['vmData'].push(row);
            }
            vm.rate = vmRate;
            vm.loaded = true;
        }).catch(function () {});
    }
});