'use strict';
angular.module('inspinia').factory('logsSvc', function($http, APIENDPOINT) {
  'ngInject';

  var Obj = {
    get: function () {
      return $http.get(APIENDPOINT + 'api/accesslog/');
    }
  };
  return Obj;
});