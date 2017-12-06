'use strict';
angular.module('inspinia').factory('notificationSvc', function($http, APIENDPOINT) {
  'ngInject';

  var Obj = {
    get: function () {
      return $http.get(APIENDPOINT + 'api/notifications/');
    },
    getAvailableNotofication: function () {
        return $http.get(APIENDPOINT + 'api/notifications/getavailable');
    },
    getById: function (id) {
      return $http.get(APIENDPOINT + 'api/notifications/?id='+id);
    },
    save:function (row) {
      var obj = angular.copy(row);
      obj.start_date = moment(obj.start_date).format("YYYY-MM-DD");
      obj.end_date = moment(obj.end_date).format("YYYY-MM-DD");
      return $http.post(APIENDPOINT + 'api/notifications/' + row.id + '/', obj);
    },
    remove:function (id) {
        return $http.delete(APIENDPOINT + 'api/notifications/' + id);
    }
  };
  return Obj;
});