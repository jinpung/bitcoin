'use strict';

angular.module('inspinia').controller('UserEditCtrl', function(authSvc,$stateParams, $state, userSvc, Util, baseSvc, financeSvc, $rootScope, $filter, $timeout) {
  'ngInject';


  var userId = $stateParams.id;

  var vm = this;
  vm.onInit = function () {
    vm.use_sites = [];
    vm.selectedSites = [];
    vm.siteArray = financeSvc.getSiteArray();
    userSvc.getUserById(userId).then(function (res) {
        var user  = res.data.user;
        vm.user = user;
        vm.profile = user.profile;
        vm.profile.user = user;
        if(vm.profile.birth_date){
            vm.profile.birth_date = moment(vm.profile.birth_date).toDate();
        }
        if (vm.profile.use_site && vm.profile.use_site !== '') {
            vm.use_sites = angular.fromJson(vm.profile.use_site);
        }else{
            vm.use_sites = [1,2,3,4,5,6,7,8,9,10];
        }

        if(vm.use_sites.length){
          var newAry = []
          for(var i=0; i<vm.use_sites.length;i++){
            var arys = $filter("filter")(vm.siteArray, {id:vm.use_sites[i]}, true);
            if(arys.length){
              newAry.push(arys[0]);
            }
          }

          $timeout(function () {
              vm.selectedSites = newAry;
          },800)

        }
    });
  };

  vm.onInit();

  vm.submit = submit;
  function submit() {
    console.log('submit', vm.profile);
    if (vm.profile.ip_address === '') {
      vm.profile.ip_address = null;
    }
    var lprofile = angular.copy(vm.profile);
    var user = lprofile.user;
    lprofile.user = lprofile.user.id;

    var useSite = [];
    for(var i=0;i<vm.selectedSites.length;i++){
      if(useSite.indexOf(vm.selectedSites[i].id) === -1){
          useSite.push(vm.selectedSites[i].id);
      }
    }

    lprofile.use_site = angular.toJson(useSite);

    if (lprofile.birth_date !== null) {
      console.log('test', lprofile.birth_date);
      lprofile.birth_date = Util.dataToPy(lprofile.birth_date);
    }
    authSvc.putUser(user).then(function (res) {
      authSvc.putProfile(lprofile).then(function (res) {
        baseSvc.alert('Updated profile successfully');
        $state.go("app.users");
      }).catch(function (err) {
          baseSvc.alert('Profile update fail!');
      });
    }).catch(function (err) {
      if (err.data.email) {
        baseSvc.alert('Profile update fail: ' + err.data.email);
      } else {
        baseSvc.alert('Profile update fail!');
      }
    });
  }
})