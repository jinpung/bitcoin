'use strict';

angular.module('inspinia').controller('exchangeRateCtrl', function($interval, $rootScope, $scope, exRate, $http) {
    var vm = this;
    vm.currency = "CNY";

    vm.stRate = {}
    vm.rate = {
        "KRW":{rate:0, origin:0},
        "USD":{rate:0, origin:0},
        "CNY":{rate:0, origin:0},
        "JPY":{rate:0, origin:0}
    };

    $scope.vmRate = exRate;

    $scope.$watch("vmRate.data", function () {
        var ary = exRate.data;
        if(angular.isArray(ary) && ary.length){
            for(var i =0; i< ary.length; i++){
                vm.stRate[ary[i].currency_name] = ary[i].won_rate/ary[i].currency_unit;
            }
            vm.stRate.KRW = 1;
        }
        vm.updateView()
    }, true)

    vm.changeCurrency = function(){
        vm.updateView();
    }

    vm.updateView = function () {
        var ary = exRate.data;
        if(!angular.isArray(ary) || ary.length == 0){
            return "";
        }
        for(var key in vm.rate){
            var rate =  vm.getRate(key, vm.currency);
            if(rate){
                vm.rate[key].origin = rate.origin;
                vm.rate[key].rate = rate.rate;
            }
        }
    }

    vm.getRate = function(to, from) {
        if(vm.stRate[to] && vm.stRate[from]){
            var rate = vm.stRate[to]/vm.stRate[from];
            var viewRate;
            if(rate < 1){
                viewRate = '1/' + Math.floor(vm.stRate[from]/vm.stRate[to]*10000000)/10000000;
            }else{
                viewRate = Math.floor(rate*10000000)/10000000
            }
            return {rate:viewRate, origin:rate}
        }else{
            return {rate:0, origin:0}
        }
    }
})