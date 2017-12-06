'use strict';

angular.module('inspinia').controller('PoliicyEditCtrl', function($scope, $stateParams, $state, policySvc) {

    // Editor options.
    $scope.options = {
        language: 'ko',
        allowedContent: true,
        entities: false
    };


    var vm = this;
    vm.info = {id:0}
    var id = $stateParams.id;

    // Called when the editor is completely ready.
    $scope.onReady = function () {
        if(id){
            policySvc.getById(id).then(function (res) {
                vm.info = res.data.data;
            })
        }
    };




    
    vm.save = function () {
        console.log(vm.info);
        policySvc.save(vm.info).then(function () {
            $state.go("app.policies");
        })
    }
})