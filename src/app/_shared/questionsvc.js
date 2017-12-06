'use strict';
angular.module('inspinia').factory('questionSvc', function($http, APIENDPOINT) {
  'ngInject';

  var Obj = {
    get: function () {
      return $http.get(APIENDPOINT + 'api/questions/getmyquestions/');
    },
    getAllQuestion: function () {
        return $http.get(APIENDPOINT + 'api/questions/');
    },
    getById: function (id) {
      return $http.get(APIENDPOINT + 'api/questions/?id='+id);
    },
    save:function (row) {
      var obj = angular.copy(row);
      return $http.post(APIENDPOINT + 'api/questions/' + row.id + '/', obj);
    },
    remove:function (id) {
        return $http.delete(APIENDPOINT + 'api/questions/' + id);
    }
  };
  return Obj;
});