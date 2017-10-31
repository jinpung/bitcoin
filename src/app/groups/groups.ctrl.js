'use strict';

angular.module('inspinia').controller('ManageGroupsCtrl', function ($state, $filter, groupSvc, baseSvc) {
  'ngInject';

  var vm = this;
  vm.onInit = function () {
    groupSvc.get().then(function (res) {
      vm.listData = res.data.groups;
    }).catch(function (res) {});
  };

  vm.onInit();


  vm.getURL = function (gName) {
      var host = window.location.host;
      var protocal = window.location.protocol;
      return protocal+"//"+host+"/#public/user-register/" + gName + "/signup";
  }

  vm.delGroup = delGroup;
  function delGroup(row) {
      if(!confirm("Do you want to remove this group?")){
          return true;
      }

      groupSvc.remove(row.id).then(function (res) {
          baseSvc.alert('Success');
          var id = row.id;
          vm.listData = vm.listData.filter(function (x) {
              return x.id !== id;
          });
      }).catch(function (err) {
          baseSvc.alert('Fail');
      });
  }

})