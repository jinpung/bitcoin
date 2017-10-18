'use strict';

angular.module('inspinia').controller('AccountCtrl', function(authSvc, Util, baseSvc, financeSvc, $rootScope) {
  'ngInject';

  var vm = this;

  vm.onInit = function () {
    vm.use_sites = [];
    vm.siteArray = financeSvc.getSiteArray();
    //console.log(vm.siteArray);
    authSvc.getCurrentUser().then(function (res) {
      vm.currentUser = res.data;
      vm.user = vm.currentUser;
      console.log(vm.user);
      var currentProfile = authSvc.getCurrentProfileSync();
      vm.profile = angular.fromJson(angular.toJson(currentProfile));
      if (vm.profile.birth_date !== null) {
        vm.profile.birth_date = Util.dateToJs(vm.profile.birth_date);
      }
      if (vm.profile.use_site !== '') {
        vm.use_sites = angular.fromJson(vm.profile.use_site);
      }

      // console.log('account', vm.profile);
      // console.log('vm.user', vm.user);
    });
    // authSvc.getProfiles()
    // .then(res => {
    //   console.log('profiles', res);
    // })
  };

  vm.onInit();

  vm.submit = submit;
  function submit() {
    console.log('submit', vm.profile);
    if (vm.profile.ip_address === '') {
      vm.profile.ip_address = null;
    }
    var lprofile = angular.fromJson(angular.toJson(vm.profile));
    var user = lprofile.user;
    lprofile.user = lprofile.user.id;
    //lprofile.use_site = angular.toJson(vm.use_sites);    
    if (lprofile.birth_date !== null) {
      console.log('test', lprofile.birth_date);
      lprofile.birth_date = Util.dataToPy(lprofile.birth_date);
    }
    authSvc.putUser(user).then(function (res) {
      // console.log('user update success', res);
      authSvc.putProfile(lprofile).then(function (res) {
        baseSvc.alert('Updated your profile successfully');
        console.log('profile update success', res);
        $rootScope.$broadcast('profile:update');
      }).catch(function (err) {
        if (err.data.ip_address) {
          baseSvc.alert('Profile update fail: ' + err.data.ip_address);
        } else {
          baseSvc.alert('Profile update fail!');
        }
        // console.log('profile update err', err);
      });
    }).catch(function (err) {
      if (err.data.email) {
        baseSvc.alert('Profile update fail: ' + err.data.email);
      } else {
        baseSvc.alert('Profile update fail!');
      }
      // console.log('Profile update err', err);
    });
  }

  vm.setMoney = setMoney;
  function setMoney(val) {
    console.log('set money->', val);
    vm.profile.use_money = val;
  }

  vm.setSite = setSite;
  function setSite(id) {
    console.log('set site', id);
    // vm.profile.use_site = id;
    vm.use_sites.push(id);
  }

  vm.getFilteredSites = getFilteredSites;
  function getFilteredSites() {
    return vm.siteArray.filter(function (x) {
      return vm.use_sites.indexOf(x.id) < 0;
    });
  }

  vm.getSiteValues = getSiteValues;
  function getSiteValues() {
    var lvalues = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var value = _step.value;

        var site = vm.siteArray.filter(function (x) {
          return x.id === value;
        });
        lvalues.push(site[0]);
      };

      for (var _iterator = vm.use_sites[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return lvalues;
  }

  vm.delSite = delSite;
  function delSite(id) {
    vm.use_sites = vm.use_sites.filter(function (x) {
      return x !== id;
    });
  }

  vm.getCurrentIp = getCurrentIp;
  function getCurrentIp() {
    vm.profile.ip_address = vm.user.ip;
  }
})