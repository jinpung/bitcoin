'use strict';
angular.module('inspinia').factory('candlesticksvc', function($http, APIENDPOINT) {
  'ngInject';

  var Obj = {
    getData: function (siteName, coinName, start) {
      var url = APIENDPOINT + 'api/candlestick?sitename='+siteName+'&coinname='+coinName;
      if(start){
        url += '&start=' + start;
      }
      return $http.get(url);
    }
  };
  return Obj;
});
