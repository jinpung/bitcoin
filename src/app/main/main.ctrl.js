'use strict';

angular.module('inspinia')
  .controller('MainCtrl', function ($scope, $rootScope, authSvc) {
        this.logout = function(){
          authSvc.logout();
        };
        
        var that = this;

        authSvc.getCurrentUser().then(function (res) {
          if (res.data && res.data.user) {
            that.user = res.data.user;
          }          
        });
        $scope.$on('user:login', function (event, data) {
            that.user = data.user;
        });
        // $rootScope.$on('userLoggedIn', function(){
        //   that.user = userAuth.getUser();
        // });
        
        // if(userAuth.isLoggedIn()){
        //   this.user = userAuth.getUser();
        // }

    });
