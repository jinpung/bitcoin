'use strict';
angular.module('inspinia').factory('policySvc', function($http, APIENDPOINT) {
  'ngInject';

  var Obj = {
    get: function () {
      return $http.get(APIENDPOINT + 'api/policies/');
    },
    getAvailableNotofication: function () {
        return $http.get(APIENDPOINT + 'api/policies/getavailable');
    },
    getById: function (id) {
      return $http.get(APIENDPOINT + 'api/policies/?id='+id);
    },
    save:function (row) {
      var obj = angular.copy(row);
      return $http.post(APIENDPOINT + 'api/policies/' + row.id + '/', obj);
    },
    remove:function (id) {
        return $http.delete(APIENDPOINT + 'api/policies/' + id);
    }
  };
  return Obj;
});