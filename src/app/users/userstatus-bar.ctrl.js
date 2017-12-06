'use strict';

angular.module('inspinia').controller('userStatusCtrl', function(userstatusSvc) {
    var vm = this;
    vm.userstatusSvc = userstatusSvc;
})