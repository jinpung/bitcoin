'use strict';

angular.module('inspinia').controller('LoginRestrictedCtrl', function ($scope, $state,$stateParams, baseSvc, authSvc) {
  $scope.signup = function(){    
    if (!$scope.signupEntity.name || $scope.signupEntity.name === '') {
      baseSvc.alert('Fill name');
      return;
    }
    if ($scope.signupEntity.password === $scope.signupEntity.confirmpassword) {
		const signup = {
		username: $scope.signupEntity.name,
		password: $scope.signupEntity.password
		};
		authSvc.createUser(signup).then(function (res) {
		  baseSvc.alert('Thank you for signing up.');
      $state.go("public.login");

		}).catch(function (res) {
		  baseSvc.alert('create fail: ' + res.data.message + '');
		});
    } else {
      baseSvc.alert('Confirm password fail!');
    }
  }
});