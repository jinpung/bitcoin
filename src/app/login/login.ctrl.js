'use strict';

angular.module('inspinia').controller('LoginCtrl', function loginCtrl($scope, $state, authSvc, $rootScope, baseSvc) {
  'ngInject';  
	$scope.loginEntity = {
	  // name: 'boss',
	  // password: 'password123'
	};

  $scope.login =  function() {
    console.log('login', $scope.loginEntity);
    var login = {
      username: $scope.loginEntity.name,
      password: $scope.loginEntity.password
    };
    authSvc.login(login).then(function (res) {
      if (res.data.user.is_staff) {
        // console.log('login succcess', authSvc.checkIpSync());
        $rootScope.$broadcast('user:login', res.data);
        if (authSvc.checkAvail()) {
          $state.go('app.dashboard');
        }else{
            if(!authSvc.checkIpSync()){
                baseSvc.alert('Your Ip address is not allowed');
            }
            if(!authSvc.checkLast()){
                baseSvc.alert('Your account was expired');
            }
        }
      } else {
        baseSvc.alert('관리자의 승인을 받아야합니다.');
      }
    }).catch(function (err) {
      console.log('login fail', err);
      baseSvc.alert('Fail: ' + err.message);
      // vm.loginEntity.fail = res.data.message;
    });
  }
});