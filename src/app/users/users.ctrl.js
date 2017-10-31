'use strict';

angular.module('inspinia').controller('ManageUsersCtrl', function ($scope, $state, $timeout, authSvc, Util, baseSvc, $filter, financeSvc, groupSvc, $rootScope) {
  'ngInject';

  var vm = this;
  vm.$rootScope = $rootScope;
  vm.groups = [];
  vm.onInit = function () {
    vm.siteArray = financeSvc.getSiteArray();

    groupSvc.get().then(function (res) {
        vm.groups = res.data.groups;
    }).catch(function (res) {});

    authSvc.getProfiles().then(function (res) {
      vm.listData = res.data.results;
      angular.forEach(vm.listData, function (row) {
        row.sites = [];
        if(row.use_site && row.use_site !== ''){
            var ary = angular.fromJson(row.use_site);
            for(var i=0; i<ary.length; i++){
              var fAry = $filter("filter")(vm.siteArray, {id:ary[i]}, true);
              if(fAry.length){
                  row.sites.push(fAry[0].siteName);
              }
            }
        }
      })
    }).catch(function (res) {});
  };

  vm.onInit();

  vm.getURL = function (user) {
      if(!user || typeof user.group_id == "undefined"){
        return "";
      }
      var groupName = vm.getGroupName(user.group_id);
      var host = window.location.host;
      var protocal = window.location.protocol;
      return protocal+"//"+host+"/#public/user-register/" + groupName + "/signup";
  }

  vm.getData = function (list) {
      if(vm.$rootScope.user && vm.$rootScope.user.is_superuser){
          return list;
      }else if(vm.$rootScope.user && vm.$rootScope.user.is_groupadmin){
          var groupId = vm.$rootScope.user.group_id;
          var rows = [];
          if(list && list.length){
            list.forEach(function (row) {
                if(row && row.user && row.user.group_id == groupId){
                  rows.push(row)
                }
            })
          }
          return rows;
      }else{
          return [];
      }
  }


  vm.getGroupName = function (groupId) {
    if(!groupId){
      return "";
    }
    var rows = $filter("filter")(vm.groups,{id:groupId}, true)
    if(rows.length){
      var row = rows[0];
      return row.group_name;
    }
    return "";
  }

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

  vm.editUser = editUser;
  function editUser(id) {
      var profile = vm.listData.filter(function (x) {
          return x.user.id === id;
      });
      if (profile[0].user.is_superuser) {
          baseSvc.alert('You can not edit Supper Admin');
          return;
      };
      $state.go("app.useredit", {id:id})
  }

  vm.delIp = delIp;
  function delIp(value) {
    console.log('profile ip', value);
    var profile = angular.fromJson(angular.toJson(value));
    profile.user = profile.user.id;
    profile.ip_address = '';
    authSvc.putProfile(profile).then(function (res) {
      value.ip_address = null;
      baseSvc.alert('Success clearing ip!');
    }).catch(function (err) {
      baseSvc.alert('fai' + err.data);
    });
  }
})