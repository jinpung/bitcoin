'use strict';

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource',
  'ui.router', 'ui.bootstrap', 'firebase', 'ui.select'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'components/common/content.html'
      })
      .state('app.changePwd', {
        url: '/changepwd',
        templateUrl: 'app/login/change_password.html',
        controller: 'ChangePasswordCtrl as pwdCtrl',
        data: {pageTitle: 'Change Password'}
      })
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'dashboardCtrl as dashboardCtrl',
        data: {pageTitle: 'Dahsboard'}
      })
      .state('app.users', {
        url: '/users',
        templateUrl: 'app/users/list.html',
        controller: 'ManageUsersCtrl as userCtrl',
        data: {pageTitle: 'Users registered'}
      })
      .state('app.datas', {
        url: '/datas',
        templateUrl: 'app/datas/list.html',
        controller: 'DatasCtrl as dataCtrl',
        data: {pageTitle: 'Datas parsed'}
      })
      .state('app.account', {
        url: '/account',
        templateUrl: 'app/account/profile.html',
        controller: 'AccountCtrl as accountCtrl',
        data: {pageTitle: 'User Infomaion'}
      })      
      .state('app.professionals', {
        url: '/professionals',
        templateUrl: 'app/professionals/list.html',
        controller: 'ManageProfessionalsCtrl as proCtrl',
        data: {pageTitle: 'Manage Professionals'}
      })      
      .state('public', {
        abstract: true,
        url: '/public',
        templateUrl: 'components/common/public.html'
      })
      .state('public.login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        data: {pageTitle: 'Login', specialClass: 'gray-bg'}
      })
      .state('public.restricted', {
        url: '/restricted',
        templateUrl: 'app/login/restricted.html',
        controller: 'LoginRestrictedCtrl'
      })
    $urlRouterProvider.otherwise('/public/login');

  })

  .run(function ($rootScope, authSvc, $location, $state) {
      $rootScope.$on('$stateChangeStart', function (ev, toState) {        
        //check login protected pages
        if (toState.name.indexOf('public.') !== 0 && !sessionStorage.token) {
          $state.go("public.login");
          ev.preventDefault();
          return;
        }
      });

  });