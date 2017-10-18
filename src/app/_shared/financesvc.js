'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

angular.module('inspinia').factory('financeSvc', function(APIENDPOINT, $http) {
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
                country: 'CHINA',
                currencyName: 'CNY',
                siteName: 'JUBI',
                data: [],
                siteURL: 'https://www.jubi.com/'
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
                currencyName: 'CNY',
                siteName: 'OKCOIN',
                data: [],
                siteURL: 'https://www.okcoin.cn/'
            }, {
                number: 9,
                id: 9,
                country: 'CHINA',
                currencyName: 'CNY',
                siteName: 'HUOBI',
                data: [],
                siteURL: 'https://www.huobi.com/'
            }, {
                number: 10,
                id: 10,
                country: 'USA',
                currencyName: 'USD',
                siteName: 'BITFINEX',
                data: [],
                siteURL: 'https://www.bitfinex.com/'
            }];

            return array;
        },
        getServiceFee: function () {
            var _array;

            var array = (_array = {
                huobi: {
                    BTC: {
                        buy: 0.2,
                        sale: 0.2,
                        transfer: 0.0001,
                        transfer_unit: '1'
                    },
                    LTC: {
                        buy: 0.2,
                        sale: 0.2,
                        transfer: 0.001,
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
                jubi: {
                    BTC: {
                        buy: 0.2,
                        sale: 0.2,
                        transfer: 0.0005,
                        transfer_unit: '1'
                    },
                    LTC: {
                        buy: 0.2,
                        sale: 0.2,
                        transfer: 1,
                        transfer_unit: '1%'
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
                        transfer: 1,
                        transfer_unit: '1%'
                    },
                    DASH: {
                        buy: 0,
                        sale: 0,
                        transfer: 0,
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
                btcchina: {
                    BTC: {
                        buy: 0.2,
                        sale: 0.2,
                        transfer: 0.0002,
                        transfer_unit: '1'
                    },
                    LTC: {
                        buy: 0.2,
                        sale: 0.2,
                        transfer: 0.001,
                        transfer_unit: '1'
                    },
                    ETC: {
                        buy: 0,
                        sale: 0,
                        transfer: 0,
                        transfer_unit: '1'
                    },
                    ETH: {
                        buy: 0.1,
                        sale: 0.1,
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
                    DASH: {
                        buy: 0.15,
                        sale: 0.15,
                        transfer: 0.01,
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
                        buy: 0,
                        sale: 0,
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
                    DASH: {
                        buy: 0,
                        sale: 0,
                        transfer: 0,
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
                    DASH: {
                        buy: 0,
                        sale: 0,
                        transfer: 0,
                        transfer_unit: '1'
                    }
                }
            }, _defineProperty(_array, 'coinone', {
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
                DASH: {
                    buy: 0.15,
                    sale: 0.25,
                    transfer: 0.01,
                    transfer_unit: '1'
                }
            }), _defineProperty(_array, 'bitfinex', {
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
                DASH: {
                    buy: 0.1,
                    sale: 0.2,
                    transfer: 0.01,
                    transfer_unit: '1'
                }
            }), _defineProperty(_array, 'kraken', {
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
                }
            }), _array);
            return array;
        },
        getCurrencies: function () {
            var array = ['USD', 'KRW', 'CNY', 'JPY'];
            return array;
        }
    };

    return factory;
})