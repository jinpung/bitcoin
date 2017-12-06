'use strict';
angular.module('inspinia').factory('userstatusSvc', function($http, APIENDPOINT, $rootScope, $interval) {
  'ngInject';

  var Service = {
    currentUsers:[],
    totalUserCnt:0,
    onlineUserCnt:0,
    todayUserCnt:0,
    update: function (gid) {
      return $http.get(APIENDPOINT + 'api/users/userstatus/?group_id='+gid).then(function (res) {
          Service.currentUsers = res.data.onlineUsers;
          Service.totalUserCnt = res.data.totalUserCnt;
          Service.onlineUserCnt = res.data.onlineUserCnt;
          Service.todayUserCnt = res.data.todayUserCnt;
      });
    }
  };
  return Service;
});