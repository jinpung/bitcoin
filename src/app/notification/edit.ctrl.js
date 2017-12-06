'use strict';

angular.module('inspinia').controller('NotificationEditCtrl', function($stateParams, $state, notificationSvc) {

    var vm = this;
    vm.info = {id:0}
    var id = $stateParams.id;
    if(id){
        notificationSvc.getById(id).then(function (res) {
            vm.info = res.data.data;
        })
    }
    
    vm.save = function () {
        console.log(vm.info);
        notificationSvc.save(vm.info).then(function () {
            $state.go("app.notifications");
        })
    }
})