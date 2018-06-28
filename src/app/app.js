'use strict';

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource',
  'ui.router', 'ui.bootstrap','ui.select','ckeditor'])
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
      .state('app.useredit', {
          url: '/edituser?id',
          templateUrl: 'app/users/edit.html',
          controller: 'UserEditCtrl as userCtrl',
          data: {pageTitle: 'Users registered'}
      })
      .state('app.useradd', {
        url: '/add-user',
        templateUrl: 'app/users/add.html',
        controller: 'UserAddCtrl as userCtrl',
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
      .state('app.groups', {
          url: '/groups',
          templateUrl: 'app/groups/list.html',
          controller: 'ManageGroupsCtrl as groupCtrl',
          data: {pageTitle: 'Group Manage'}
      })
      .state('app.group-edit', {
        url: '/group-edit?id',
        templateUrl: 'app/groups/edit.html',
        controller: 'GroupsEditCtrl as groupCtrl',
        data: {pageTitle: 'Group Manage'}
      })
      .state('app.notifications', {
        url: '/notifications',
        templateUrl: 'app/notification/list.html',
        controller: 'NotificationListCtrl as vm',
        data: {pageTitle: 'Notification Manage'}
      })
      .state('app.notification-edit', {
        url: '/edit-notification?id',
        templateUrl: 'app/notification/edit.html',
        controller: 'NotificationEditCtrl as vm',
        data: {pageTitle: 'Notification Edit'}
      })

      .state('app.policies', {
        url: '/policies',
        templateUrl: 'app/policies/list.html',
        controller: 'PoliciyListCtrl as vm',
        data: {pageTitle: 'Policy Manage'}
      })
      .state('app.policie-edit', {
        url: '/edit-policy?id',
        templateUrl: 'app/policies/edit.html',
        controller: 'PoliicyEditCtrl as vm',
        data: {pageTitle: 'Policy Edit'}
      })

      .state('app.questions', {
          url: '/questions',
          templateUrl: 'app/questions/list.html',
          controller: 'QuestionsListCtrl as vm',
          data: {pageTitle: 'Questions Manage'}
      })
      .state('app.question-edit', {
          url: '/edit-questions?id',
          templateUrl: 'app/questions/edit.html',
          controller: 'QuestionEditCtrl as vm',
          data: {pageTitle: 'Question Edit'}
      })
      .state('app.answers', {
          url: '/answers',
          templateUrl: 'app/answers/list.html',
          controller: 'AnswersListCtrl as vm',
          data: {pageTitle: 'Answers Manage'}
      })
      .state('app.answer-edit', {
          url: '/edit-answer?id',
          templateUrl: 'app/answers/edit.html',
          controller: 'AnswerEditCtrl as vm',
          data: {pageTitle: 'Answer Edit'}
      })
      .state('app.logs', {
        url: '/logs',
        templateUrl: 'app/logs/list.html',
        controller: 'LogsListCtrl as vm',
        data: {pageTitle: 'Access Log'}
      })
      .state('app.chart', {
        url: '/chart',
        templateUrl: 'app/chart/chart.html',
        controller: 'ChartCtrl as vm',
        data: {pageTitle: 'Chart'}
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
      // .state('public.restricted', {
      //   url: '/restricted',
      //   templateUrl: 'app/login/restricted.html',
      //   controller: 'LoginRestrictedCtrl'
      // })
      .state('public.singup', {
          url: '/user-register/:groupname/:singup',
          templateUrl: 'app/login/restricted.html',
          controller: 'LoginRestrictedCtrl'
      })
      .state('landing', {
          url: '/',
          templateUrl: 'app/landing/landing.html',
          controller: 'LandingCtrl'
      })
    $urlRouterProvider.otherwise('/');

  })

  .run(function ($rootScope, authSvc, $location, $state) {
      $rootScope.$on('$stateChangeStart', function (ev, toState) {        
        //check login protected pages
        if ((toState.name.indexOf('public.') !== 0 && toState.name.indexOf('landing') !== 0 )&& !sessionStorage.token) {
          $state.go("public.login");
          ev.preventDefault();
          return;
        }
      });

  });