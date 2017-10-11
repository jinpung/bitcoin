'use strict';

angular.module('inspinia').controller('ManageUsersCtrl', function ($scope, $state, $timeout, authSvc, Util, baseSvc) {
  'ngInject';

  var vm = this;
  vm.onInit = function () {
    authSvc.getProfiles().then(function (res) {
      console.log(res);
      vm.listData = res.data.results;
    }).catch(function (res) {});
  };

  vm.onInit();

  vm.onActive = onActive;
  function onActive(value) {
    // console.log('active', value);
    if (value.last_date === null) {
      baseSvc.alert('먼저 사용기한을 설정해야합니다.');
      return;
    }
    var user = value.user;
    if (user.is_superuser) {
      baseSvc.alert('you can not change super user');
    } else {
      user.is_staff = !user.is_staff;
      authSvc.putUser(user).then(function (res) {
        baseSvc.alert('Success ' + (user.is_staff?'active':'inactive') + ' \'' + user.username + '\' account');
      }).catch(function (err) {
        baseSvc.alert('Fail');
      });
    }
  }

  vm.onDeadline = onDeadline;
  function onDeadline(value, date) {
    console.log('deadline', value, date);
    var profile = angular.fromJson(angular.toJson(value));
    profile.user = profile.user.id;
    if (date === null || date === undefined) {
      return;
      // console.log('test', profile.birth_date)
    } else {
      profile.last_date = Util.dataToPy(date);
      authSvc.putProfile(profile).then(function (res) {
        value.last_date = profile.last_date;
        baseSvc.alert('Changed user\'s deadline');
      }).catch(function (err) {
        baseSvc.alert('Update fail');
      });
    }
  }

  vm.delUser = delUser;
  function delUser(id) {
    if(!confirm("Do you want to remove this user?")){
      return true;
    }
    var profile = vm.listData.filter(function (x) {
      return x.user.id === id;
    });
    if (profile[0].user.is_superuser) {
      baseSvc.alert('You can not delete Admin');
      return;
    }
    authSvc.delUser(id).then(function (res) {
      baseSvc.alert('Success');
      vm.listData = vm.listData.filter(function (x) {
        return x.user.id !== id;
      });
    }).catch(function (err) {
      baseSvc.alert('Fail');
    });
  }

  vm.delIp = delIp;
  function delIp(value) {
    console.log('profile ip', value);
    var profile = angular.fromJson(angular.toJson(value));
    profile.user = profile.user.id;
    profile.ip_address = null;
    authSvc.putProfile(profile).then(function (res) {
      value.ip_address = null;
      baseSvc.alert('Success clearing ip!');
    }).catch(function (err) {
      baseSvc.alert('fai' + err.data);
    });
  }
})