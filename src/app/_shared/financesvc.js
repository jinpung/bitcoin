'use strict';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
  } else {
    obj[key] = value;
  }
  return obj;
}

angular.module('inspinia').factory('financeSvc', function (APIENDPOINT, $http) {
  'ngInject';

  var factory = {
    getVMRate: function () {
      return $http.get(APIENDPOINT + 'api/vm_rate/?is_use=true');
    },
    getVMRates: function () {
      return $http.get(APIENDPOINT + 'api/vm_rate/');
    },
    putVMRates: function (vmRate) {
      return $http.post(APIENDPOINT + 'api/vm_rate/' + vmRate.id + '/', vmRate);
    },
    delVMRate: function (id) {
      return $http.delete(APIENDPOINT + 'api/vm_rate/' + id + '/');
    },
    getExchangeRate: function () {
      return $http.get(APIENDPOINT + 'api/exchange_rate/?usage=1');
    },
    getSiteArray: function () {
      var array = [{
        number: 1,
        id: 1,
        country: 'KOREA',
        currencyName: 'KRW',
        siteName: 'BITHUMB',
        data: [],
        siteURL: 'https://www.bithumb.com'
      }, {
        number: 2,
        id: 2,
        country: 'USA',
        currencyName: 'USD',
        siteName: 'KRAKEN',
        data: [],
        siteURL: 'https://www.kraken.com'
      }, {
        number: 3,
        id: 3,
        country: 'HONGKONG',
        currencyName: 'USD',
        siteName: 'GDAX',
        data: [],
        siteURL: 'https://www.gdax.com/'
      }, {
        number: 4,
        id: 4,
        country: 'USA',
        currencyName: 'USD',
        siteName: 'POLONIEX',
        data: [],
        siteURL: 'https://poloniex.com/'
      }, {
        number: 5,
        id: 5,
        country: 'KOREA',
        currencyName: 'KRW',
        siteName: 'COINONE',
        data: [],
        siteURL: 'https://coinone.co.kr/'
      }, {
        number: 6,
        id: 6,
        country: 'KOREA',
        currencyName: 'KRW',
        siteName: 'KORBIT',
        data: [],
        siteURL: 'https://www.korbit.co.kr/'
      }, {
        number: 7,
        id: 7,
        country: 'JAPAN',
        currencyName: 'JPY',
        siteName: 'QUOINE',
        data: [],
        siteURL: 'https://quoine.com/'
      }, {
        number: 8,
        id: 8,
        country: 'CHINA',
        currencyName: 'USD',
        siteName: 'OKEX',
        data: [],
        siteURL: 'https://www.okex.com/'
      }, {
        number: 9,
        id: 9,
        country: 'CHINA',
        currencyName: 'USD',
        siteName: 'HUOBI',
        data: [],
        siteURL: 'https://www.huobi.pro/'
      }, {
        number: 10,
        id: 10,
        country: 'USA',
        currencyName: 'USD',
        siteName: 'BITFINEX',
        data: [],
        siteURL: 'https://www.bitfinex.com/'
      }, {
        number: 11,
        id: 11,
        country: 'KOREA',
        currencyName: 'KRW',
        siteName: 'CPDAX',
        data: [],
        siteURL: 'https://www.cpdax.com/'
      }, {
        number: 12,
        id: 12,
        country: 'USA',
        currencyName: 'USD',
        siteName: 'BITSTAMP',
        data: [],
        siteURL: 'https://www.bitstamp.com/'
      }, {
        number: 13,
        id: 13,
        country: 'HONGKONG',
        currencyName: 'USD',
        siteName: 'OKCOIN_H',
        data: [],
        siteURL: 'https://www.okcoin.com/'
      }, {
        number: 14,
        id: 14,
        country: 'HONGKONG',
        currencyName: 'USD',
        siteName: 'BITTREX',
        data: [],
        siteURL: 'https://www.bittrex.com/'
      }, {
        number: 15,
        id: 15,
        country: 'KOREA',
        currencyName: 'KRW',
        siteName: 'UPBIT',
        data: [],
        siteURL: 'https://www.upbit.com/'
      },{
        number: 16,
        id: 16,
        country: 'KOREA',
        currencyName: 'USD',
        siteName: 'BINANCE',
        data: [],
        siteURL: 'https://www.binance.com/'
      }];

      return array;
    },
    getServiceFee: function () {
      var _array;

      var array = {
        huobi: {
          BTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.005,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.2,
            sale: 0.1,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.0001,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.1,
            transfer_unit: '1'
          },
          EOS: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.5,
            transfer_unit: '1'
          },
          OMG: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.1,
            transfer_unit: '1'
          },
          ZEC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          TRX: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          VEN: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ELF: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          HSR: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.2,
            transfer_unit: '1'
          },
          IOTA: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.5,
            transfer_unit: '1'
          },
          GNT: {
            buy: 0.15,
            sale: 0.15,
            transfer: 5,
            transfer_unit: '1'
          },
          ZIL: {
            buy: 0.15,
            sale: 0.15,
            transfer: 100,
            transfer_unit: '1'
          },
          STEEM: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.5,
            transfer_unit: '1'
          },
          NEO: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          }
        },
        gdax: {
          BTC: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.0005,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1%'
          },
          ETH: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          }
        },
        cpdax: {
          BTC: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.0005,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.001,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.01,
            transfer_unit: '1'
          }
        },
        okcoin: {
          BTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.002,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.05,
            sale: 0.05,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.05,
            sale: 0.05,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0,
            sale: 0,
            transfer: 0,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0,
            sale: 0,
            transfer: 0,
            transfer_unit: '1'
          }
        },
        okex: {
          BTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.005,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.005,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.0005,
            transfer_unit: '1'
          },
          QTUM: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ZEC: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.001,
            transfer_unit: '1'
          },
          EOS: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.5,
            transfer_unit: '1'
          },
          OMG: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.1,
            transfer_unit: '1'
          },
          IOTA: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.5,
            transfer_unit: '1'
          },
          NEO: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.025,
            transfer_unit: '1'
          },
          ELF: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.025,
            transfer_unit: '1'
          },
          ICX: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.025,
            transfer_unit: '1'
          },
          KNC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.025,
            transfer_unit: '1'
          },
          MCO: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.025,
            transfer_unit: '1'
          },
          MITH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.025,
            transfer_unit: '1'
          },
          TRX: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.025,
            transfer_unit: '1'
          },
          XMR: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.025,
            transfer_unit: '1'
          },
          HSR: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.2,
            transfer_unit: '1'
          },
          GNT: {
            buy: 0.15,
            sale: 0.15,
            transfer: 5,
            transfer_unit: '1'
          },
          ZIL: {
            buy: 0.15,
            sale: 0.15,
            transfer: 20,
            transfer_unit: '1'
          },
          PAY: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.5,
            transfer_unit: '1'
          },
          LRC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 7,
            transfer_unit: '1'
          },
          GTO: {
            buy: 0.15,
            sale: 0.15,
            transfer: 10,
            transfer_unit: '1'
          }

        },
        okcoin_h: {
          BTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.0004,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          }
        },
        bithumb: {
          BTC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.0005,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BTG: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ICX: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          VEN: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          TRX: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ELF: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          MITH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          MCO: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          OMG: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          KNC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          HSR: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.2,
            transfer_unit: '1'
          },
          GNT: {
            buy: 0.15,
            sale: 0.15,
            transfer: 12,
            transfer_unit: '1'
          },
          ZIL: {
            buy: 0.15,
            sale: 0.15,
            transfer: 30,
            transfer_unit: '1'
          },
          ETHOS: {
            buy: 0.15,
            sale: 0.15,
            transfer: 30,
            transfer_unit: '1'
          },
          PAY: {
            buy: 0.15,
            sale: 0.15,
            transfer: 2.4,
            transfer_unit: '1'
          },
          WAX: {
            buy: 0.15,
            sale: 0.15,
            transfer: 5,
            transfer_unit: '1'
          },
          POWR: {
            buy: 0.15,
            sale: 0.15,
            transfer: 5,
            transfer_unit: '1'
          },
          LRC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 10,
            transfer_unit: '1'
          },
          GTO: {
            buy: 0.15,
            sale: 0.15,
            transfer: 15,
            transfer_unit: '1'
          },
          STEEM: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          STRAT: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.2,
            transfer_unit: '1'
          }
        },
        korbit: {
          BTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.05,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.2,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.2,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0,
            sale: 0,
            transfer: 0,
            transfer_unit: '1'
          },
          BTG: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ZIL: {
            buy: 0.15,
            sale: 0.15,
            transfer: 30,
            transfer_unit: '1'
          }
        },
        coinone: {
          BTC: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.0005,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0,
            sale: 0,
            transfer: 0,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.01,
            transfer_unit: '1'
          },
          QTUM: {
            buy: 0.1,
            sale: 0.1,
            transfer: 0.01,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0,
            sale: 0,
            transfer: 0,
            transfer_unit: '1'
          },
          OMG: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          EOS: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          }
        },
        bitfinex: {
          BTC: {
            buy: 0.1,
            sale: 0.2,
            transfer: 0.0004,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.1,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.1,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.1,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0.1,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.1,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XMR: {
            buy: 0.1,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0.1,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BTG: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.001,
            transfer_unit: '1'
          },
          EOS: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.1,
            transfer_unit: '1'
          },
          OMG: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.1,
            transfer_unit: '1'
          },
          NEO: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ELF: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.1,
            transfer_unit: '1'
          },
          TRX: {
            buy: 0.2,
            sale: 0.2,
            transfer: 0.01,
            transfer_unit: '1'
          },
          GNT: {
            buy: 0.15,
            sale: 0.15,
            transfer: 3.49,
            transfer_unit: '1'
          },
          WAX: {
            buy: 0.15,
            sale: 0.15,
            transfer: 10.16,
            transfer_unit: '1'
          },
          LRC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 3.12,
            transfer_unit: '1'
          },
          KNC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 1.28,
            transfer_unit: '1'
          },
          MIT: {
            buy: 0.15,
            sale: 0.15,
            transfer: 2.46,
            transfer_unit: '1'
          }
        },
        poloniex: {
          BTC: {
            buy: 0.15,
            sale: 0.25,
            transfer: 0.0001,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.15,
            sale: 0.25,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.15,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.15,
            sale: 0.25,
            transfer: 0.005,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0.15,
            sale: 0.25,
            transfer: 0.15,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.15,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XMR: {
            buy: 0.15,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0.15,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          }
        },
        kraken: {
          BTC: {
            buy: 0.16,
            sale: 0.26,
            transfer: 0.0004,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.16,
            sale: 0.26,
            transfer: 0.001,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.16,
            sale: 0.26,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.16,
            sale: 0.26,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0.16,
            sale: 0.26,
            transfer: 0.15,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0.16,
            sale: 0.26,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XMR: {
            buy: 0.16,
            sale: 0.26,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.16,
            sale: 0.26,
            transfer: 0.01,
            transfer_unit: '1'
          }
        },
        bittrex: {
          BTC: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.0004,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
          ZEC: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XMR: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
          DASH: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
          QTUM: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BCH: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.001,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0.25,
            sale: 0.25,
            transfer: 0.01,
            transfer_unit: '1'
          },
        },
        upbit: {
          BTC: {
            buy: 0.14,
            sale: 0.14,
            transfer: 0.0005,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.14,
            sale: 0.14,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BTG: {
            buy: 0.14,
            sale: 0.14,
            transfer: 0.001,
            transfer_unit: '1'
          },

        },
        binance: {
          BTC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.0005,
            transfer_unit: '1'
          },
          ETH: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          EOS: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.3,
            transfer_unit: '1'
          },
          BNB: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.3,
            transfer_unit: '1'
          },
          TRX: {
            buy: 0.15,
            sale: 0.15,
            transfer: 70,
            transfer_unit: '1'
          },
          ADA: {
            buy: 0.15,
            sale: 0.15,
            transfer: 1,
            transfer_unit: '1'
          },
          LTC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          BCC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.001,
            transfer_unit: '1'
          },
          XRP: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.25,
            transfer_unit: '1'
          },
          ONT: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.1,
            transfer_unit: '1'
          },
          ICX: {
            buy: 0.15,
            sale: 0.15,
            transfer: 1.5,
            transfer_unit: '1'
          },
          IOTA: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.5,
            transfer_unit: '1'
          },
          ETC: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          TUSD: {
            buy: 0.15,
            sale: 0.15,
            transfer: 2.9,
            transfer_unit: '1'
          },
          NEO: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          XLM: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          },
          QTUM: {
            buy: 0.15,
            sale: 0.15,
            transfer: 0.01,
            transfer_unit: '1'
          }
        }
      };
      return array;
    },
    getCurrencies: function () {
      var array = ['USD', 'KRW', 'CNY', 'JPY'];
      return array;
    }
  };

  return factory;
})
