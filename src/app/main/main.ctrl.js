'use strict';

angular.module('inspinia')
  .controller('MainCtrl', function ($scope, $rootScope, authSvc, userstatusSvc, $interval) {
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

        $interval(function () {
            if(that.user){
                if(that.user.is_superuser){
                    userstatusSvc.update(0);
                }else if(that.user.is_groupadmin){
                    userstatusSvc.update(that.user.group_id);
                }
            }
        }, 5000);



        that.isDahsboard = false;
        $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
            if(toState.name == "app.dashboard"){
                that.isDahsboard = true;
            }else{
                that.isDahsboard = false;
            }

            if(toState.name == "app.users" || toState.name == "app.datas"  || toState.name == "app.groups"
                || toState.name == "app.notifications" || toState.name == "app.policies"
                || toState.name == "app.answers"||toState.name == "app.logs"
                ){
                that.showUserStatus = true;
            }else{
                that.showUserStatus = false;
            }

            if(toState.name == "landing"){
                $scope.isLanding = true;
            }else{
                $scope.isLanding = false;
            }
        })
    });
