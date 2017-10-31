'use strict';

angular.module('inspinia').controller('UserAddCtrl', function($scope, $state,$stateParams, baseSvc, authSvc, $rootScope) {
  'ngInject';


  var userId = $stateParams.id;

  var vm = this;
  vm.onInit = function () {
    vm.inputData = {}
  };

  vm.onInit();

  vm.save = save;
  function save() {
      var signup = {
          username: vm.inputData.username,
          password: vm.inputData.newPassword
      };
      if($rootScope.user.is_groupadmin){
          signup.group_id = $rootScope.user.group_id
      }
      authSvc.addUser(signup).then(function (res) {
          baseSvc.alert('Success added');
          $state.go("app.users");
      }).catch(function (res) {
          baseSvc.alert('create fail: ' + res.data.message + '');
      });
  }
})