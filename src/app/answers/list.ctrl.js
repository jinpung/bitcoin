'use strict';

angular.module('inspinia').controller('AnswersListCtrl', function ($state, questionSvc) {

    var vm = this;
    vm.loadData = function () {
        questionSvc.getAllQuestion().then(function (res) {
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

    vm.edit = function (id) {
        $state.go("app.answer-edit", {id:id});
    }


})