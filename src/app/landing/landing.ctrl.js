'use strict';

angular.module('inspinia').controller('LandingCtrl', function($scope, $timeout, notificationSvc, policySvc, $filter) {
  'ngInject';
    $scope.$on('$viewContentLoaded', function(){
      $timeout(function () {
          $(document).ready(function () {
              // Page scrolling feature
              $('a.page-scroll').bind('click', function(event) {
                  var link = $(this);
                  $('html, body').stop().animate({
                      scrollTop: $(link.attr('href')).offset().top - 50
                  }, 500);
                  event.preventDefault();
                  if($('body').hasClass('body-small')) {
                      $('#navbar').collapse('toggle');
                  }
              });

              // Activate WOW.js plugin for animation on scroll
              new WOW().init();
          });

          var cbpAnimatedHeader = (function() {
              var docElem = document.documentElement,
                  header = document.querySelector( '.navbar-default' ),
                  didScroll = false,
                  changeHeaderOn = 200;
              function init() {
                  window.addEventListener( 'scroll', function( event ) {
                      if( !didScroll ) {
                          didScroll = true;
                          setTimeout( scrollPage, 250 );
                      }
                  }, false );
              }
              function scrollPage() {
                  var sy = scrollY();
                  if ( sy >= changeHeaderOn ) {
                      $(header).addClass('navbar-scroll')
                  }
                  else {
                      $(header).removeClass('navbar-scroll')
                  }
                  didScroll = false;
              }
              function scrollY() {
                  return window.pageYOffset || docElem.scrollTop;
              }
              init();

          })();
      },500)


      notificationSvc.getAvailableNotofication().then(function (res) {
          if(window.localStorage.readnotifcations){
              var readnotifcations = JSON.parse(window.localStorage.readnotifcations);
          }else{
              var readnotifcations = [];
          }
          $scope.notifications = [];
          var rows = res.data.list;
          if(rows.length){
              rows.forEach(function (row) {
                if(readnotifcations.indexOf(row.id) == -1){
                    $scope.notifications.push(row);
                }
              })
          }
      })

      $scope.policies  = [];
      $scope.selectedItem = {};
      policySvc.get().then(function (res) {
          $scope.policies = res.data.list;
          $scope.selectedItem = $scope.policies[0];
      })
      $scope.selectRow = function (item) {
        $scope.selectedItem = item;
      }

    });

    $scope.readNotifcation = function (id) {
        $scope.notifications = $filter("filter")($scope.notifications, {id:'!' + id}, true);
        if(window.localStorage.readnotifcations){
            var readnotifcations = JSON.parse(window.localStorage.readnotifcations);
        }else{
            var readnotifcations = [];
        }
        readnotifcations.push(id);
        window.localStorage.readnotifcations = JSON.stringify(readnotifcations);
    }

});