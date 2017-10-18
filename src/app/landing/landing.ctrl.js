'use strict';

angular.module('inspinia').controller('LandingCtrl', function($scope, $timeout) {
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
    });
});