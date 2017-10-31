'use strict';

angular.module('inspinia').controller('GroupsEditCtrl', function(authSvc,$stateParams, $state, userSvc, Util, baseSvc, groupSvc, $rootScope, $filter, $timeout) {
  'ngInject';


  var userId = $stateParams.id;

  var vm = this;
  vm.row = {id:0};
  var id  = $stateParams.id;
  console.log(id);
  if(id){
      vm.row.id = id;
  }

  vm.users = [];
  vm.onInit = function () {
      authSvc.getProfiles().then(function (res) {
          angular.forEach(res.data.results, function (row) {
              vm.users.push(row.user)
          });
          groupSvc.getGroupById(id).then(function (res) {
              var group = res.data.group;
              vm.row.group_name = group.group_name;
              if(group.admins && group.admins.length){
                  console.log(group.admins);
                  vm.row.admin_id = group.admins[0].id;
              }
          })
      }).catch(function (res) {});
  };

  vm.onInit();

  vm.submit = submit;
  function submit() {
    groupSvc.save(vm.row).then(function (res) {
        baseSvc.alert('Success updated');
        $state.go("app.groups")
    }).catch(function (err) {
        baseSvc.alert('Profile update fail!');
    });
  }
})