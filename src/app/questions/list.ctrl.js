'use strict';

angular.module('inspinia').controller('QuestionsListCtrl', function ($state, questionSvc) {

    var vm = this;
    vm.loadData = function () {
        questionSvc.get().then(function (res) {
            vm.list = res.data.list;
            vm.list.forEach(function (row) {
                if(row.reg_date){
                    row.reg_date = moment(row.reg_date).format("YYYY-MM-DD H:m");
                }
                if(row.response_date){
                    row.response_date = moment(row.response_date).format("YYYY-MM-DD H:m");
                }
            })
        })
    }
    vm.loadData();

    vm.del = function (id) {
        if(confirm("Do you want to remove this row?\nYou cannot rollback after remove this row")){
            questionSvc.remove(id).then(function(){
                vm.loadData();
            })
        }
    }

    vm.edit = function (id) {
        $state.go("app.question-edit", {id:id});
    }


})