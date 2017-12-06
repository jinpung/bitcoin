'use strict';

angular.module('inspinia').controller('AnswerEditCtrl', function($stateParams, $state, questionSvc, $rootScope) {

    var vm = this;
    vm.info = {id:0}
    var id = $stateParams.id;
    if(id){
        questionSvc.getById(id).then(function (res) {
            vm.info = res.data.data;
        })
    }
    
    vm.save = function () {
        console.log(vm.info);
        questionSvc.save(vm.info).then(function () {
            $state.go("app.answers");
        })
    }
})