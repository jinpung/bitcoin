'use strict';
angular.module('inspinia').factory('Util', function ($window, $document) {
  'ngInject';

  var Util = {
    dataToPy: function (date) {
      date = new Date(date);
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //  January is 0
      var yyyy = date.getFullYear();
      dd = dd < 10 ? '0' + dd : dd;
      mm = mm < 10 ? '0' + mm : mm;
      var newdate = yyyy + '-' + mm + '-' + dd;

      return newdate;
    },
    dateToJs: function (dateStr) {
      var newdate = new Date(dateStr);
      // console.log('dateStr =>', dateStr);
      return newdate;
    },

    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    safeCb: function (cb) {
      return angular.isFunction(cb) ? cb : angular.noop;
    },


    /**
     * Parse a given url with the use of an anchor element
     *
     * @param  {String} url - the url to parse
     * @return {Object}     - the parsed url, anchor element
     */
    urlParse: function (url) {
      var a = $document[0].createElement('a');
      a.href = url;

      // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
      if (a.host === '') {
        a.href = a.href;
      }

      return a;
    },


    /**
     * Test whether or not a given url is same origin
     *
     * @param  {String}           url       - url to test
     * @param  {String|String[]}  [origins] - additional origins to test against
     * @return {Boolean}                    - true if url is same origin
     */
    isSameOrigin: function (url, origins) {
      url = Util.urlParse(url);
      origins = origins && [].concat(origins) || [];
      origins = origins.map(Util.urlParse);
      origins.push($window.location);
      origins = origins.filter(function (o) {
        var hostnameCheck = url.hostname === o.hostname;
        var protocolCheck = url.protocol === o.protocol;
        // 2nd part of the special treatment for IE fix (see above):
        // This part is when using well-known ports 80 or 443 with IE,
        // when $window.location.port==='' instead of the real port number.
        // Probably the same cause as this IE bug: https://goo.gl/J9hRta
        var portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url.port === '443');
        return hostnameCheck && protocolCheck && portCheck;
      });
      return origins.length >= 1;
    }
  };

  return Util;
})