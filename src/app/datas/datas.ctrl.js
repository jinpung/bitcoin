'use strict';

angular.module('inspinia').controller('DatasCtrl', function(authSvc, Util, baseSvc, financeSvc) {
  'ngInject';

  var vm = this;
  vm.onInit = function () {
    financeSvc.getVMRates().then(function (res) {
      console.log('vmrates', res.data.results);
      vm.vmRates = res.data.results;
    }).catch(function (res) {});
  };

  vm.onInit();

  vm.onActive = onActive;
  function onActive(value) {
    console.log('active', value);
    if (value.is_use) {
      console.log('true');
    } else {
      console.log('false');
    }
    var vmRate = value;
    vmRate.is_use = !vmRate.is_use;
    // if (vmRate.is_use === 'true') {
    //   vmRate.is_use = 'false';
    // } else {
    //   vmRate.is_use = 'true';
    // }

    financeSvc.putVMRates(vmRate).then(function (res) {
      //baseSvc.alert('success');
    }).catch(function (err) {
      baseSvc.alert('Fail');
    });
  }

  vm.showUrl = showUrl;
  function showUrl(url) {
    baseSvc.alert(url);
  }

  vm.delVMRate = delVMRate;
  function delVMRate(id) {
    financeSvc.delVMRate(id).then(function (res) {
      baseSvc.alert('Success!');
      console.log('res', res);
      vm.vmRates = vm.vmRates.filter(function (x) {
        return x.id !== id;
      });
    }).catch(function (err) {
      baseSvc.alert('Fail!');
    });
  }
})