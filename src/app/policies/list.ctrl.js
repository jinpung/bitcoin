'use strict';

angular.module('inspinia').controller('PoliciyListCtrl', function ($state, policySvc) {

    var vm = this;
    vm.loadData = function () {
        policySvc.get().then(function (res) {
            vm.list = res.data.list;
        })
    }
    vm.loadData();

    vm.del = function (id) {
        if(confirm("Do you want to remove this row?\nYou cannot rollback after remove this row")){
            policySvc.remove(id).then(function(){
                vm.loadData();
            })
        }
    }

    vm.edit = function (id) {
        $state.go("app.policie-edit", {id:id});
    }


})