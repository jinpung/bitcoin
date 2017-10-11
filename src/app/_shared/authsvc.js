'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _User = function _User() {
  _classCallCheck(this, _User);
  this._id = '';
  this.name = '';
  this.email = '';
  this.role = '';
  this.$promise = undefined;
};

angular.module('inspinia').factory('authSvc', function(_, $, URL, APIENDPOINT, $rootScope, $http, Util, userSvc, $cookies, $location, $state, $q, baseSvc) {
  'ngInject';

  var safeCb = Util.safeCb;
  var currentUser = new _User();
  var syncUser = new _User();
  var syncProfile = new _User();
  var syncIp = '';
  var userRoles = ['admin', 'user'];
  // var userRoles = appConfig.userRoles || [];
  /**
   * Check if userRole is >= role
   * @param {String} userRole - role of current user
   * @param {String} role - role to check against
   */
  var _hasRole = function (userRole, role) {
    return userRoles.indexOf(userRole) >= userRoles.indexOf(role);
  };

  $rootScope.$on('profile:update', function (event, data) {
    console.log('update profile');
    init();
  });

  if (sessionStorage.token && $location.path() !== '/logout') {
    init();
  }

  function init() {
    currentUser = userSvc.get();
    currentUser.then(function (user) {
      syncUser = user.data.user;
      syncProfile = user.data.profile;
      syncIp = user.data.ip;
      if (Auth.checkAvail()) {
        if ($state.current.name === 'login') {
          $state.go('dashboard');
        }
      } else {
        $state.go('login');
      }
    });
    // User.get()
    //   .then(res => {
    //     currentUser = res.data;
    //     // $log.log('me', currentUser);
    //   })
  }

  var Auth = {
    /**
    * Authenticate user and save token
    * @param  {Object}   user     - login info
    * @param  {Function} callback - function(error, user)
    * @return {Promise}
    */
    login: function (_ref) {
      var username = _ref.username,
          password = _ref.password;

      return $http.post(APIENDPOINT + 'api/auth/login', {
        username: username,
        password: password
      }).then(function (res) {
        syncUser = res.data.user;

        syncIp = res.data.ip;
        syncProfile = res.data.profile;
        currentUser = res;
        //$cookies.put('csrftoken', res.data.user.token);
        sessionStorage.token = res.data.token;
        // console.log('logged in', res, syncProfile);
        // $log.log('headers', res.headers());
        return res;
      }).catch(function (err) {
        // console.log('login err', err);
        // Auth.logout();
        return $q.reject(err.data);
      });
    },


    /**
     * Delete access token and user info
     */
    logout: function () {
      $http.post(APIENDPOINT + 'api/auth/logout').then(function () {
        // baseSvc.alert('logout success');
        sessionStorage.token = "";
        currentUser = new _User();
        syncUser = new _User();
        $state.go('public.login');
      }).catch(function (err) {
        sessionStorage.token = "";
        currentUser = new _User();
        syncUser = new _User();
        $state.go('public.login');
      });
    },


    /**
     * @param  {Object}   user     - user info
     * @param  {Function} callback - function(error, user)
     * @return {Promise}
     */
    createUser: function (user) {
      return $http.post(APIENDPOINT + 'api/auth/signup', user);
    },
    getUsers: function () {
      return $http.get(APIENDPOINT + 'api/users/');
    },
    putUser: function (user) {
      return $http.post(APIENDPOINT + 'api/users/' + user.id + '/', user);
    },
    delUser: function (id) {
      return $http.delete(APIENDPOINT + 'api/users/' + id + '/');
    },
    getProfiles: function () {
      return $http.get(APIENDPOINT + 'api/profile_lists/');
    },
    putProfile: function (profile) {
      return $http.post(APIENDPOINT + 'api/profiles/' + profile.id + '/', profile);
    },


    /**
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - function(error, user)
     * @return {Promise}
     */
    changePassword: function (setting) {
      return $http.post(APIENDPOINT + 'api/auth/me', setting);
    },
    getCurrentUser: function (callback) {
      var value = _.get(currentUser, '$promise') ? currentUser.$promise : currentUser;

      return $q.when(value).then(function (user) {
        safeCb(callback)(user);
        return user;
      }, function () {
        safeCb(callback)({});
        return {};
      });
    },


    /**
     * Gets all available info on a user
     * @return {Object}
     */
    getCurrentUserSync: function () {
      return syncUser;
    },
    getCurrentProfileSync: function () {
      return syncProfile;
    },


    /**
     * Check if a user is logged in
     * @param  {Function} [callback] - function(is)
     * @return {Promise}
     */
    isLoggedIn: function (callback) {
      return Auth.getCurrentUser(undefined).then(function (user) {
        console.log(user);
        console.log('currentUser in is logged in', user);
        if (angular.isUndefined(user.data)) {
          return false;
        } else {
          user = user.data.user; // get user data from response
          var is = _.get(user, 'is_staff');

          safeCb(callback)(is);
          return is;
        }
      });
    },


    /**
     * Check if a user is logged in
     * @return {Bool}
     */
    isLoggedInSync: function isLoggedInSync() {
      return Boolean(_.get(syncUser, 'is_staff'));
    },


    /**
     * Check if a user has a specified role or higher
     * @param  {String}     role     - the role to check against
     * @param  {Function} [callback] - function(has)
     * @return {Promise}
     */
    hasRole: function hasRole(role, callback) {
      return Auth.getCurrentUser(undefined).then(function (user) {
        var has = _hasRole(_.get(user, 'role'), role);

        safeCb(callback)(has);
        return has;
      });
    },


    /**
     * Check if a user has a specified role or higher
     * @param  {String} role - the role to check against
     * @return {Bool}
     */
    hasRoleSync: function hasRoleSync(role) {
      // return hasRole(_.get(syncUser, 'role'), role);
      return Boolean(_.get(syncUser, role));
    },


    /**
     * Check if a user is an admin
     *   (synchronous|asynchronous)
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
    isAdmin: function isAdmin() {
      return Auth.hasRole.apply(Auth, _toConsumableArray([].concat.apply(['is_superuser'], arguments)));
    },


    /**
     * Check if a user is an admin
     * @return {Bool}
     */
    isAdminSync: function isAdminSync() {
      return Auth.hasRoleSync('is_superuser');
    },


    /**
     * Get auth token
     * @return {String} - a token string used for authenticating
     */
    getToken: function getToken() {
      return $cookies.get('csrftoken');
    },
    checkIpSync: function checkIpSync() {
      var checkIp = false;
      if (!syncProfile.ip_address || syncProfile.ip_address === syncIp) {
        checkIp = true;
      }
      if (syncUser.is_superuser) {
        checkIp = true;
      }

      return checkIp;
    },
    checkLast: function checkLast() {
      var checkLast = false;
      if (typeof syncProfile.last_date == "undefined" || !syncProfile.last_date === null) {
        checkLast = true;
      } else {
        var lastDate = Util.dateToJs(syncProfile.last_date);
        // console.log('last Date',syncProfile.last_date, lastDate);
        lastDate.toUTCString();
        var lastUTime = lastDate.getTime();
        var nowDayObj = new Date();
        nowDayObj.toUTCString();
        var nowUTime = nowDayObj.getTime();
        // console.log('oldUTime', oldUTime)
        // console.log('newUTime', newUTime)
        var deltaTime = lastUTime - nowUTime;
        if (deltaTime > 10) {
          checkLast = true;
        }
      }
      return checkLast;
    },
    checkAvail: function checkAvail() {
      return Auth.checkIpSync() && Auth.checkLast();
    }
  };
  return Auth;
})