'use strict';

angular.module('inspinia').controller('CalcuCtrl', function (financeSvc, $interval, $filter, exportService , $scope) {
  'ngInject';

  var vm = this;

  vm.a = 1;

  vm.onInit = function () {
    console.log('app init');

    vm.enableSave = false;

    vm.row = {};
    vm.row.sell_vmrows = [];
    vm.row.sell_vmrows[0] = { sell_amount: 0, sell_price: 0, sell_budget: 0 };
    vm.stMoney = {};
    vm.use_sites = [];
    vm.sell_height = 200;
    vm.calc = {};
    vm.exRate = [];
    vm.siteArray = financeSvc.getSiteArray();
    vm.siteFee = financeSvc.getServiceFee();
    vm.currencyArray = financeSvc.getCurrencies();
    financeSvc.getExchangeRate().then(function (res) {
      console.log('exchange rate', res.data.results);
      vm.exRate = res.data.results;
    });

    var countries = [];
    for (var i = 0; i < vm.siteArray.length; i++) {
      var countryName = vm.siteArray[i].country;
      if (countries.indexOf(countryName) == -1) {
        countries.push(countryName);
      }
    }
    vm.countries = countries;
    vm.coins = ["BTC", "LTC", "ETC", "ETH", "XRP", "DASH"];
    vm.appInterval = $interval(init, 5000);
  };

  vm.onInit();

  function getExRate(std_currency, buy_currency, sell_currency) {
    // console.log('get exrate init', currency_name, value);
    var moneyObj = [];
    var stdrate = 1;
    var buyrate = 1;
    var sellrate = 1;

    if (std_currency !== 'KRW') {
      moneyObj = vm.exRate.filter(function (x) {
        return x.currency_name === std_currency;
      });
      stdrate = moneyObj[0].won_rate / moneyObj[0].currency_unit;
    }

    if (std_currency !== buy_currency) {
      if (buy_currency !== 'KRW') {
        moneyObj = vm.exRate.filter(function (x) {
          return x.currency_name === buy_currency;
        });
        buyrate = moneyObj[0].won_rate / moneyObj[0].currency_unit;
      }
      buyrate = buyrate / stdrate;
    }

    if (std_currency !== sell_currency) {
      if (sell_currency !== 'KRW') {
        moneyObj = vm.exRate.filter(function (x) {
          return x.currency_name === sell_currency;
        });
        sellrate = moneyObj[0].won_rate / moneyObj[0].currency_unit;
      }
      sellrate = sellrate / stdrate;
    }

    vm.row.sell_rate = sellrate;
    vm.row.buy_rate = buyrate;
  }

  vm.getsites = function (country) {
    return $filter("filter")(vm.siteArray, { country: country });
  };

  vm.buy_filter_change = function () {
    vm.row.buy_vmrow = {};
    if (vm.row.buy_site && vm.row.coin) {
      var rows = $filter("filter")(vm.vmRate, { site_name: vm.row.buy_site, vm_name: vm.row.coin });
      if (rows && rows.length) {
        vm.row.buy_vmrow = rows[0];
        vm.row.buy_price = vm.row.buy_vmrow.vm_rate_sell;
      } else {}
    };
  };

  vm.stdcurrency_filter_change = function () {
    console.log('exchangeRateArray =>' + vm.exRate);
  };

  vm.sell_filter_change = function () {
    if (vm.row.buy_site && vm.row.coin) {
      var rows = $filter("filter")(vm.vmRate, { site_name: vm.row.sell_site, vm_name: vm.row.coin });
      if (rows && rows.length) {
        vm.row.sell_vmrow = rows[0];
        vm.row.sell_vmrows[0].sell_amount = vm.row.toSellAmount;
        vm.row.sell_price = rows[0].vm_rate_buy;
        vm.row.sell_vmrows[0].sell_price = vm.row.sell_price;
      } else {}
    };
  };

  vm.getBuyBudget = function (price, amount) {
    if (price && amount) {
      vm.row.buy_budget = price * amount;
      return vm.row.buy_budget;
    } else {
      return "";
    }
  };

  // vm.getSellBudget = function(price, amount){
  //   vm.row.sellMoney = 0;
  //   if(price && amount){
  //     vm.row.sellMoney = price*amount;
  //     return price*amount;
  //   }else{
  //     return "";
  //   }
  // }

  vm.getBuyFee = function (site, coin, amount) {
    vm.row.buy_fee = 0;
    if (site && coin && amount) {
      site = site.toLowerCase();
      var fee = vm.siteFee[site][coin]['buy'];
      var buyfee = fee * amount * 0.01;
      vm.row.buy_fee = buyfee;
      return buyfee;
    } else {
      "";
    }
  };

  vm.getServiceFee = function (site, coin, amount) {
    vm.row.service_fee = 0;
    if (site && coin && amount) {
      site = site.toLowerCase();
      var fee = vm.siteFee[site][coin]['transfer'];
      var feeType = vm.siteFee[site][coin]['transfer_unit'];
      var serviceFee = 0;
      if (feeType == "1") {
        serviceFee = fee;
      } else if (feeType == "1%") {
        serviceFee = fee * amount * 0.01;
      }
      vm.row.service_fee = serviceFee;
      return serviceFee;
    } else {
      "";
    }
  };

  vm.getSellFee = function (site, coin, amount) {
    vm.row.sellfee = 0;
    if (site && coin && amount) {
      site = site.toLowerCase();
      var fee = vm.siteFee[site][coin]['sale'];
      var sellfee = fee * amount * 0.01;
      vm.row.sellfee = sellfee;
      return sellfee; // + "("+vm.row.sell_vmrow.currency_name+")";
    } else {
      "";
    }
  };

  vm.getRealSellBudget = function () {
    var rsellmoney = 0;
    if (vm.row.sellfee && vm.row.sell_budget_sum) {
      rsellmoney = vm.row.sell_budget_sum - vm.row.sellfee;
      vm.row.real_sell_budget = rsellmoney;
      return rsellmoney; // + "("+vm.row.sell_vmrow.currency_name+")";
    } else {
      "";
    }
  };

  vm.getSellAmount = function () {
    var amount = vm.row.buy_amount - vm.row.buy_fee - vm.row.service_fee;
    vm.row.toSellAmount = 0;
    if (amount == 0) {
      return "";
    } else {
      vm.row.toSellAmount = amount;
      return amount;
    }
  };

  vm.addSellRow = function () {
    vm.row.sell_vmrows.push({});
    vm.sell_height += 35;
    var selllen = vm.row.sell_vmrows.length;
    var curidx = selllen - 1;
    vm.row.sell_vmrows[curidx].sell_price = vm.row.sell_vmrows[curidx - 1].sell_price;
    vm.row.sell_vmrows[curidx].sell_amount = vm.row.toSellAmount;
    for (var i = 0; i < selllen - 1; i++) {
      vm.row.sell_vmrows[curidx].sell_amount -= vm.row.sell_vmrows[i].sell_amount;
    }
  };

  vm.deleteSellRow = function (delIndex) {
    vm.row.sell_vmrows.splice(delIndex, 1);
    vm.sell_height -= 35;
    vm.getSellAmountSum();
  };

  vm.getSellAmountSum = function () {
    var coinsum = 0;
    var moneysum = 0;
    var selllen = 0;
    if (vm.row.sell_vmrows) selllen = vm.row.sell_vmrows.length;
    for (var i = 0; i < selllen; i++) {
      coinsum += 1 * vm.row.sell_vmrows[i].sell_amount;
      moneysum += 1 * vm.row.sell_vmrows[i].sell_budget;
    };
    vm.row.sell_amount_sum = coinsum;
    vm.row.sell_budget_sum = moneysum;
    return coinsum;
  };

  vm.enableSave = false;
  vm.Calculate = function () {
    getExRate(vm.row.std_currency, vm.row.buy_vmrow.currency_name, vm.row.sell_vmrow.currency_name);
    vm.calc.calc_pay_money = 1 * vm.row.buy_budget * vm.row.buy_rate;
    vm.calc.calc_purchase_coins = vm.row.toSellAmount;
    vm.calc.calc_sell_money = 1 * vm.row.real_sell_budget * vm.row.sell_rate;
    vm.calc.calc_sell_coins = vm.row.sell_amount_sum;
    vm.calc.calc_profit = vm.calc.calc_sell_money - vm.calc.calc_pay_money;
    vm.enableSave = true;
  };

  $scope.$on("$destroy", function(){
      $interval.cancel(vm.appInterval);
  })

  vm.downloasAsCsv = function () {

      var ary = [];
      console.log(vm.row.sell_vmrows)
      var header = ['날자','시간','기준화페', '코인종류', '구입나라', '싸이트', '구입가격','구입개수', '구입금액', '구입료','이체료','실지구입개수','판매나라','싸이트'];
      for(var i=0; i<vm.row.sell_vmrows.length;i++){
          header = header.concat(['판매가격','판매개수','판매금액']);
      }
      header = header.concat(['판매수수료','실지판매금액','총구입개수','총지출금액','총판매개수','총판매금액','실제수익']);

      var data = [
          moment().format("YYYY-MM-DD"),//날자
          moment().format("hh:mm:ss"),//시간
          vm.row.std_currency,
          vm.row.coin,
          vm.row.buy_country,
          vm.row.buy_site,
          vm.row.buy_price,
          vm.row.buy_amount,
          vm.getBuyBudget(vm.row.buy_price, vm.row.buy_amount)+ '(' + vm.row.buy_vmrow.currency_name + ')',//구입금액
          vm.getBuyFee(vm.row.buy_site, vm.row.coin, vm.row.buy_amount),//구입료
          vm.getServiceFee(vm.row.buy_site, vm.row.coin, vm.row.buy_amount),//이체료
          vm.getSellAmount(),//실지구입개수
          vm.row.sell_country,
          vm.row.sell_site
      ];
      for(var i=0; i<vm.row.sell_vmrows.length;i++){
          var sellrow = vm.row.sell_vmrows[i];
          data.push(sellrow.sell_price);
          data.push(sellrow.sell_amount)
          data.push(sellrow.sell_price*sellrow.sell_amount)
      }

      data.push(vm.getSellFee(vm.row.sell_site, vm.row.coin, vm.row.sell_budget_sum))//판매수수료;
      data.push(vm.getRealSellBudget()+ '(' + vm.row.sell_vmrow.currency_name + ')');//실지판매금액

      data.push(vm.calc.calc_purchase_coins);//총구입개수
      data.push(vm.calc.calc_pay_money+ '(' + vm.row.std_currency + ')');//총지출금액

      data.push(vm.calc.calc_purchase_coins);//총판매개수
      data.push(vm.calc.calc_sell_money+ '(' + vm.row.std_currency + ')');//총판매금액

      data.push(vm.calc.calc_profit+ '(' + vm.row.std_currency + ')');//실제수익


      ary.push(header);
      ary.push(data);
      console.log(ary);
      exportService.downloadAsCsv(ary, '계산표.csv');
  }

  function init() {
    // console.log('request init');
    financeSvc.getVMRate().then(function (res) {
      vm.vmRate = res.data.results;
      financeSvc.getExchangeRate().then(function (res) {
        vm.exRate = res.data.results;
      }).catch(function () {});
    }).catch(function () {});
  }
})