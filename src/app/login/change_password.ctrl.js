'use strict';

angular.module('inspinia').controller('ChangePasswordCtrl', function (authSvc, baseSvc) {  
  var self = this;
  this.savePassword = function () {
    var setting = {
      password: this.inputData.newPassword,
      confirm_password: this.inputData.newConfirmPassword
    };
    if (this.inputData.newConfirmPassword !== this.inputData.newPassword) {
      alert('Password doesn\'t match.');
      return;
    }
    this.isSaving = true;
    authSvc.changePassword(setting).then(function (res) {
      self.isSaving = false;
      self.inputData = {};
      self.passwordUpdated = true;
      baseSvc.alert('changed your password succcessfully!');
    }).catch(function (err) {
      self.passwordUpdated = false;
      baseSvc.alert('Change passowrd fail!');
      closeDlg();
      // console.log('change pw fail');
    });
  };

});