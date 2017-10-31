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
            $rootScope.user = that.user;
          }          
        });
        $scope.$on('user:login', function (event, data) {
            that.user = data.user;
            $rootScope.user = that.user;
        });



        that.isDahsboard = false;
        $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
            if(toState.name == "app.dashboard"){
                that.isDahsboard = true;
            }else{
                that.isDahsboard = false;
            }

            if(toState.name == "landing"){
                $scope.isLanding = true;
            }else{
                $scope.isLanding = false;
            }
        })
    });
