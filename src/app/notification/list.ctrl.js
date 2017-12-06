'use strict';

angular.module('inspinia').controller('NotificationListCtrl', function ($state, notificationSvc) {

    var vm = this;
    vm.loadData = function () {
        notificationSvc.get().then(function (res) {
            vm.list = res.data.list;
        })
    }
    vm.loadData();

    vm.del = function (id) {
        if(confirm("Do you want to remove this row?\nYou cannot rollback after remove this row")){
            notificationSvc.remove(id).then(function(){
                vm.loadData();
            })
        }
    }

    vm.edit = function (id) {
        $state.go("app.notification-edit", {id:id});
    }


})