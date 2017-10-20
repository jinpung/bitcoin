'use strict';
angular.module('inspinia').factory('baseSvc', function($rootScope) {
  'ngInject';
  var factory = {
    showDlg: function (tpl, ctrl) {
      // console.log('show dlg', tpl, ctrl);
      // console.log(window.dialogPolyfill)

      // if (!tpl.showModal) {
      //   // dialogPolyfill.registerDialog(tpl);
      //   dialogPolyfill.registerDialog(tpl);
      // }
      // dialog.showModal();
    },
    alert: function (str) {
      $rootScope.alertStr = str;
      alert(str);
    }
  };
  return factory;
});