'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

angular.module('inspinia').controller('dashboardCtrl', function(financeSvc, $interval, authSvc, $rootScope, $scope, exRate) {
  'ngInject';

  var vm = this;
  vm.exRate = 0;

  vm.onInit = function () {
    vm.tab='all'
    console.log('app init');
    vm.stMoney = {
      // name: 'KRW',
      // value: 1
    };
    vm.use_sites = [];
    vm.siteArray = financeSvc.getSiteArray();
    authSvc.getCurrentUser().then(function (res) {
      vm.currentUser = res.data;
      vm.user = vm.currentUser;
      var currentProfile = authSvc.getCurrentProfileSync();

      vm.profile = currentProfile;
      if (currentProfile.use_site === '') {
        vm.use_sites = getDefaultUseSites();
      } else {
        vm.use_sites = angular.fromJson(currentProfile.use_site);
      }
      // console.log('vm.profile', vm.profile);
      // console.log('vm.use_sites', vm.use_sites);
      // init();
      console.log('req init');
      vm.appInterval = $interval(init, 5000);
    });
    // let appInterval = $interval(init, 15000000);
    // $interval.cancel(appInterval);
  };

  vm.onInit();

  $scope.$on("$destroy", function(){
    $interval.cancel(vm.appInterval);
  })  

  vm.getVmRow = function(data, key){
    for(var i=0;i<data.length;i++){
      if(data[i]['vmName'] == key){        
        return data[i];
      }
    }
    return {};
  }

  vm.changeOrder = changeOrder;
  function changeOrder(type, value) {
    // console.log('change order', type, value);
    // vm.viewArray;vm.stMoney
    var currentIndex = value.number - 1;
    if (type === 'up' && currentIndex === 1) {
      changeST(value);
    }
    if (type === 'down' && currentIndex === 0) {
      changeST(value);
    }
    if (type === 'up' && currentIndex !== 0) {
      vm.viewArray[currentIndex].number--;
      vm.viewArray[currentIndex - 1].number++;
    } else if (type === 'down' && currentIndex !== vm.viewArray.length - 1) {
      vm.viewArray[currentIndex].number++;
      vm.viewArray[currentIndex + 1].number--;
    }
    vm.viewArray.sort(function (a, b) {
      return a.number - b.number;
    });
    updateView();
    updateUseSite();
  }

  function updateUseSite() {
    // vm.use_sites
    var newUseSites = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = vm.viewArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var array = _step.value;

        newUseSites.push(array.id);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    vm.use_sites = newUseSites;
    var profile = angular.fromJson(angular.toJson(vm.profile));
    profile.user = profile.user.id;
    profile.use_site = angular.toJson(vm.use_sites);
    // console.log('update use_site', profileUpdated);
    authSvc.putProfile(profile).then(function (res) {
      $rootScope.$broadcast('profile:update');
      // console.log('profile update success', res);
    }).catch(function (err) {
      // console.log('profile update err', err);
    });
  }

  function changeST(value) {
    if (value.currencyName !== vm.stMoney.name) {
      vm.stMoney.name = value.currencyName;
      if (value.currencyName === 'KRW') {
        vm.stMoney.value = 1;
      } else {
        var moneyObj = vm.exRate.filter(function (x) {
          return x.currency_name === value.currencyName;
        });
        // console.log('change st', moneyObj);
        vm.stMoney.value = moneyObj[0].won_rate / moneyObj[0].currency_unit;
      }
    }
  }

  function init() {
    // console.log('request init');
    financeSvc.getVMRate().then(function (res) {
      // console.log('vmrates->', res.data.results)
      if (angular.isUndefined(vm.viewArray)) {
        vm.viewArray = getSiteValues();
        // console.log('view array', vm.viewArray);
      }
      createViewSet(res.data.results);
      financeSvc.getExchangeRate().then(function (res) {
        // console.log('exchange rate', res.data.results);
        vm.exRate = res.data.results;
        exRate.data =  res.data.results;
        if (vm.stMoney.name === undefined) {
          var value = vm.siteArray.filter(function (x) {
            return x.id === vm.use_sites[0];
          });
          changeST(value[0]);
        }
        updateView();
      }).catch(function () {});
    }).catch(function () {});
  }

  function createViewSet(vmArray) {
    // console.log('createViewSet start', vmArray, vm.viewArray);
    // for (let [index, value] of vm.viewArray.entries()) {
    //  vm.viewArray[index].data = [];
    // }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var vmItem = _step2.value;

        // console.log('first for loop');
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = vm.viewArray.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2),
                index = _step3$value[0],
                value = _step3$value[1];

            // console.log('second for loop', index);
            if (vmItem.site_name === value.siteName && vmItem.country === value.country) {
              // console.log('pushed');
              var newIndex = vm.viewArray[index].data.findIndex(function (x) {
                return x.vmName === vmItem.vm_name;
              });
              // console.log('length 0', newIndex);
              // check if exist already or first
              if (newIndex < 0) {
                // console.log('length 0', newIndex);
                vm.viewArray[index].data.push({ vmName: vmItem.vm_name, vmRate: vmItem.vm_rate, vmRateBuy: vmItem.vm_rate_buy, vmRateSell: vmItem.vm_rate_sell });
                // console.log('no update', vmItem.updated);
                // console.log('no update', (new Date(vmItem.updated)).getTime());
              } else {
                var itemIndex = vm.viewArray[index].data.findIndex(function (x) {
                  return x.vmName === vmItem.vm_name;
                });
                if (vm.viewArray[index].data[itemIndex].vmRate === vmItem.vm_rate) {
                  var dateObj = new Date(vmItem.updated);
                  dateObj.toUTCString();
                  var oldUTime = dateObj.getTime();
                  var newDayObj = new Date();
                  newDayObj.toUTCString();
                  var newUTime = newDayObj.getTime();
                  // console.log('oldUTime', oldUTime)
                  // console.log('newUTime', newUTime)
                  var deltaTime = newUTime - oldUTime;
                  // console.log('delta', deltaTime)
                  // setting up 5min as limit condition time 5s, 30s, 1min, 5min
                  var litmit = [5000, 150000, 300000, 1500000];
                  if (deltaTime > litmit[2]) {
                    vm.viewArray[index].data[itemIndex].noUpdate = true;
                  }
                } else {
                  vm.viewArray[index].data[itemIndex].vmRate = vmItem.vm_rate;
                  vm.viewArray[index].data[itemIndex].vmRateSell = vmItem.vm_rate_sell;
                  vm.viewArray[index].data[itemIndex].vmRateBuy = vmItem.vm_rate_buy;
                  vm.viewArray[index].data[itemIndex].noUpdate = false;
                  // console.log('value update', vmItem.site_name, vmItem.vm_name, vmItem.vm_rate);
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      };

      for (var _iterator2 = vmArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
      }
      // console.log('created view array', vm.viewArray);
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  function updateView() {
    // console.log('update', vm.viewArray)
    var stBTC = void 0;
    var stETH = void 0;
    var stETC = void 0;
    var stLTC = void 0;
    var stXRP = void 0;
    var stDASH = void 0;
    var stBCH = void 0;
    var stXMR = void 0;
    var stZEC = void 0;
    var stQTUM = void 0;
    var stBCC = void 0;
    var stNEO = void 0;
    var stOMG = void 0;
    var stBTG = void 0;


    var stBTCBuy = void 0;
    var stETHBuy = void 0;
    var stETCBuy = void 0;
    var stLTCBuy = void 0;
    var stXRPBuy = void 0;
    var stDASHBuy = void 0;
    var stBCHBuy = void 0;
    var stXMRBuy = void 0;
    var stZECBuy = void 0;
    var stQTUMBuy = void 0;
    var stBCCBuy = void 0;
    var stNEOBuy = void 0;
    var stOMGBuy = void 0;
    var stBTGBuy = void 0;


    var stBTCSell = void 0;
    var stETHSell = void 0;
    var stETCSell = void 0;
    var stLTCSell = void 0;
    var stXRPSell = void 0;
    var stDASHSell = void 0;
    var stBCHSell = void 0;
    var stXMRSell = void 0;
    var stZECSell = void 0;
    var stQTUMSell = void 0;
    var stBCCSell = void 0;
    var stNEOSell = void 0;
    var stOMGSell = void 0;
    var stBTGSell = void 0;




    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = vm.viewArray.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _step4$value = _slicedToArray(_step4.value, 2),
            siteIndex = _step4$value[0],
            siteValue = _step4$value[1];

        // exchange rate
        var currencyName = vm.viewArray[siteIndex].currencyName;
        // console.log('site loop', siteIndex, siteValue)

        var _getExRate = getExRate(currencyName, 1),
            rate = _getExRate.rate,
            originRate = _getExRate.originRate;

        vm.viewArray[siteIndex].exRate = rate;
        vm.viewArray[siteIndex].originRate = originRate;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = vm.viewArray[siteIndex].data.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _step5$value = _slicedToArray(_step5.value, 2),
                vmIndex = _step5$value[0],
                vmValue = _step5$value[1];

            var vmRate = vm.viewArray[siteIndex].data[vmIndex].vmRate;
            var vmRateBuy = vm.viewArray[siteIndex].data[vmIndex].vmRateBuy;
            var vmRateSell = vm.viewArray[siteIndex].data[vmIndex].vmRateSell;
            vm.viewArray[siteIndex].data[vmIndex].chVMRate = vmRate * rate;
            vm.viewArray[siteIndex].data[vmIndex].chVMRateBuy = vmRateBuy * rate;
            vm.viewArray[siteIndex].data[vmIndex].chVMRateSell = vmRateSell * rate;
            // creating real virtual money rate like as no 1
            if (siteIndex === 0) {
              var name = vm.viewArray[siteIndex].data[vmIndex].vmName;
              var value = vm.viewArray[siteIndex].data[vmIndex].chVMRate;
              var valueBuy = vm.viewArray[siteIndex].data[vmIndex].chVMRateBuy;
              var valueSell = vm.viewArray[siteIndex].data[vmIndex].chVMRateSell;
              // console.log('index 0', name, value)
              vm.viewArray[siteIndex].data[vmIndex].realVMRate = 0;
              vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = 0;
              vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = 0;
              switch (name) {
                case 'BTC':
                  stBTC = value;
                  stBTCBuy = valueBuy;
                  stBTCSell = valueSell;
                  break;
                case 'ETH':
                  stETH = value;
                  stETHBuy = valueBuy;
                  stETHSell = valueSell;
                  break;
                case 'ETC':
                  stETC = value;
                  stETCBuy = valueBuy;
                  stETCSell = valueSell;
                  break;
                case 'LTC':
                  stLTC = value;
                  stLTCBuy = valueBuy;
                  stLTCSell = valueSell;
                  break;
                case 'XRP':
                  stXRP = value;
                  stXRPBuy = valueBuy;
                  stXRPSell = valueSell;
                  break;
                case 'DASH':
                  stDASH = value;
                  stDASHBuy = valueBuy;
                  stDASHSell = valueSell;
                  break;
                case 'BCH':
                    stBCH = value;
                    stBCHBuy = valueBuy;
                    stBCHSell = valueSell;
                    break;
                 case 'XMR':
                    stXMR = value;
                    stXMRBuy = valueBuy;
                    stXMRSell = valueSell;
                    break;
                 case 'ZEC':
                    stZEC = value;
                    stZECBuy = valueBuy;
                    stZECSell = valueSell;
                    break;
                  case 'QTUM':
                    stQTUM = value;
                    stQTUMBuy = valueBuy;
                    stQTUMSell = valueSell;
                    break;
                  case 'BCC':
                      stBCC = value;
                      stBCCBuy = valueBuy;
                      stBCCSell = valueSell;
                      break;
                  case 'NEO':
                      stNEO = value;
                      stNEOBuy = valueBuy;
                      stNEOSell = valueSell;
                  case 'OMG':
                      stOMG = value;
                      stOMGBuy = valueBuy;
                      stOMGSell = valueSell;
                      break;
                  case 'BTG':
                      stBTG = value;
                      stBTGBuy = valueBuy;
                      stBTGSell = valueSell;
                      break;

                default:
                  break;
              }
              vm.viewArray[siteIndex].data[vmIndex].revRate = 0;
              vm.viewArray[siteIndex].data[vmIndex].revRateSend = 0;
              vm.viewArray[siteIndex].data[vmIndex].revRateRecv = 0;
            } else {
              // console.log('number 1 value', stBTC, stETH, stETC, stLTC, stXRP);
              var chVMRate = vm.viewArray[siteIndex].data[vmIndex].chVMRate;
              var chVMRateBuy = vm.viewArray[siteIndex].data[vmIndex].chVMRateBuy;
              var chVMRateSell = vm.viewArray[siteIndex].data[vmIndex].chVMRateSell;
              // add real virtual money rate like as no 1
              var vmName = vm.viewArray[siteIndex].data[vmIndex].vmName;
              switch (vmName) {
                case 'BTC':
                  vm.viewArray[siteIndex].data[vmIndex].realVMRate = stBTC - chVMRate;
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stBTCSell;
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stBTCBuy - chVMRateSell;
                  break;
                case 'ETH':
                  vm.viewArray[siteIndex].data[vmIndex].realVMRate = stETH - chVMRate;
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stETHSell;
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stETHBuy - chVMRateSell;
                  break;
                case 'ETC':
                  vm.viewArray[siteIndex].data[vmIndex].realVMRate = stETC - chVMRate;
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stETCSell;
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stETCBuy - chVMRateSell;
                  break;
                case 'LTC':
                  vm.viewArray[siteIndex].data[vmIndex].realVMRate = stLTC - chVMRate;
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stLTCSell
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stLTCBuy - chVMRateSell;
                  break;
                case 'XRP':
                  vm.viewArray[siteIndex].data[vmIndex].realVMRate = stXRP - chVMRate;
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stXRPSell
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stXRPBuy - chVMRateSell;
                  break;
                case 'DASH':
                  vm.viewArray[siteIndex].data[vmIndex].realVMRate = stDASH - chVMRate;
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stDASHSell
                  vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stDASHBuy - chVMRateSell;
                  break;

                case 'BCH':
                    vm.viewArray[siteIndex].data[vmIndex].realVMRate = stBCH - chVMRate;
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stBCHSell
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stBCHBuy - chVMRateSell;
                    break;
                case 'XMR':
                    vm.viewArray[siteIndex].data[vmIndex].realVMRate = stXMR - chVMRate;
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stXMRSell
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stXMRBuy - chVMRateSell;
                    break;
                case 'ZEC':
                    vm.viewArray[siteIndex].data[vmIndex].realVMRate = stZEC - chVMRate;
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stZECSell
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stZECBuy - chVMRateSell;
                    break;
                case 'QTUM':
                    vm.viewArray[siteIndex].data[vmIndex].realVMRate = stQTUM - chVMRate;
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stQTUMSell
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stQTUMBuy - chVMRateSell;
                    break;
                case 'BCC':
                    vm.viewArray[siteIndex].data[vmIndex].realVMRate = stBCC - chVMRate;
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stBCCSell
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stBCCBuy - chVMRateSell;
                    break;
                case 'NEO':
                    vm.viewArray[siteIndex].data[vmIndex].realVMRate = stNEO - chVMRate;
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stNEOSell
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stNEOBuy - chVMRateSell;
                    break;
                case 'OMG':
                    vm.viewArray[siteIndex].data[vmIndex].realVMRate = stOMG - chVMRate;
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stOMGSell
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stOMGBuy - chVMRateSell;
                    break;
                case 'BTG':
                    vm.viewArray[siteIndex].data[vmIndex].realVMRate = stBTG - chVMRate;
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateSend = chVMRateBuy - stBTGSell
                    vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv = stBTGBuy - chVMRateSell;
                    break;

                  default:
                  break;
              }
              var realVMRate = vm.viewArray[siteIndex].data[vmIndex].realVMRate;
              var realVMRateSend = vm.viewArray[siteIndex].data[vmIndex].realVMRateSend;
              var realVMRateRecv = vm.viewArray[siteIndex].data[vmIndex].realVMRateRecv;
              if (chVMRate === 0) {
                vm.viewArray[siteIndex].data[vmIndex].revRate = 0;
                vm.viewArray[siteIndex].data[vmIndex].revRateRecv = 0;
                vm.viewArray[siteIndex].data[vmIndex].revRateSend = 0;
              } else {
                vm.viewArray[siteIndex].data[vmIndex].revRate = realVMRate / chVMRate * 100;
                vm.viewArray[siteIndex].data[vmIndex].revRateSend = realVMRateSend / chVMRate * 100;
                vm.viewArray[siteIndex].data[vmIndex].revRateRecv = realVMRateRecv / chVMRate * 100;
              }
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }

      // console.log('updated view', vm.viewArray)
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    for(var i=0;i<vm.viewArray.length;i++){
      var data = vm.viewArray[i]['data'];
      var dataObj = {};
      for(var j=0;j<data.length;j++){
        dataObj[data[j].vmName] = data[j];
      }
      vm.viewArray[i]['dataObj'] = dataObj;
    }
    vm.viewDataSet = vm.viewArray;
  }

  function getExRate(currency_name, value) {
    // console.log('get exrate init', currency_name, value);
    var moneyObj = {};
    var krw = 0;
    var originRate = 0;
    if (currency_name === 'KRW') {
      krw = value;
      // moneyObj = vm.exRate.filter(x => x.currency_name === currency_name);
      originRate = vm.stMoney.value;
    } else {
      moneyObj = vm.exRate.filter(function (x) {
        return x.currency_name === currency_name;
      });
      // console.log('money obj', moneyObj);
      krw = moneyObj[0].won_rate * value / moneyObj[0].currency_unit;
      originRate = moneyObj[0].currency_unit * vm.stMoney.value / moneyObj[0].won_rate;
    }
    var stValue = krw / vm.stMoney.value;
    return { rate: stValue, originRate: originRate };
  }

  function getSiteValues() {
    var values = [];
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      var _loop2 = function _loop2() {
        var _step6$value = _slicedToArray(_step6.value, 2),
            index = _step6$value[0],
            value = _step6$value[1];

        var site = vm.siteArray.filter(function (x) {
          return x.id === value;
        });
        site[0].number = index + 1;
        values.push(site[0]);
      };

      for (var _iterator6 = vm.use_sites.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        _loop2();
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    return values;
  }

  function getDefaultUseSites() {
    var values = [];
    var siteArray = financeSvc.getSiteArray();
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = siteArray[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var _value = _step7.value;

        values.push(_value.id);
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return) {
          _iterator7.return();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    return values;
  }

  vm.selectRow = "";
  vm.getLiClassName = function (key) {
      return key;
  }
})