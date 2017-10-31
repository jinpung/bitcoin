'use strict';
angular.module('inspinia').factory('groupSvc', function($http, APIENDPOINT) {
  'ngInject';

  var Obj = {
    get: function () {
      return $http.get(APIENDPOINT + 'api/groups/');
    },
    getGroupById: function (id) {
      return $http.get(APIENDPOINT + 'api/groups/?id='+id);
    },
    save:function (group) {
      return $http.post(APIENDPOINT + 'api/groups/' + group.id + '/', group);
    },
    remove:function (id) {
        return $http.delete(APIENDPOINT + 'api/groups/' + id);
    }
  };
  return Obj;
});