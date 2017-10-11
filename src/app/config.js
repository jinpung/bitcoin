'use strict';

angular.module('inspinia')
.factory('authInterceptor', function($rootScope, $q, $cookies, $injector) {
  'ngInject';
  var state = void 0;
  return {
    // Add authorization token to headers
    request: function request(config) {
      config.headers = config.headers || {};
      
      if (sessionStorage.token) {
        config.headers['x-auth-token'] = sessionStorage.token;
      }
      return config;
    },
    // Intercept 401s and redirect you to login
    responseError: function responseError(response) {
      if (response.data.status == "UNAUTHORIZED") {
        (state || (state = $injector.get('$state'))).go('public.login');
        sessionStorage.token = "";
      }
      return $q.reject(response);
    }
  };
})
.config(['$httpProvider', function($httpProvider) {
  'ngInject';
  $httpProvider.interceptors.push('authInterceptor');
}])

//added on bitcoin project
.constant('APIENDPOINT', 'http://47.95.238.1/')
  .constant('URL', {
    // bet: 'http://localhost:8000/bet/api',
    bet: 'http://27.255.76.26:8000/bet/api',
    // auth: 'http://localhost:8000/bet/auth',
    auth: 'http://27.255.76.26:8000/bet/auth',
    // parse: 'http://localhost:8000/parse',
    parse: 'http://27.255.76.26:8000/parse',
    // pre: 'http://localhost:8000/pre'
    pre: 'http://27.255.76.26:8000/pre'
  })
  .constant('_', _)
  .constant('$', $)
  .name;
