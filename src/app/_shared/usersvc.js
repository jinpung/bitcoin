'use strict';
angular.module('inspinia').factory('userSvc', function($log, $http, URL, $cookies, APIENDPOINT) {
  'ngInject';

  var User = {
    get: function () {
      // $log.log('get me');
      // const token = $cookies.get('csrftoken');
      // $log.log('token-->', token);
      // $http.defaults.headers.common['Authorization'] = 'Token ' + token;
      return $http.get(APIENDPOINT + 'api/auth/me');
    },
    getUserById: function (id) {
      return $http.get(APIENDPOINT + 'api/users/'+id);
    }
  };
  return User;
})