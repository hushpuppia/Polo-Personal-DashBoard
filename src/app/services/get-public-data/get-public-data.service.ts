import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GetPublicDataService {

  ticker: any;
  tickerView: any;
  tickerBTC = [];
  columns;
  timer;
  i: number = 0;
  dataChannel: any;
  currencyInfo: any;

  api = {
    'ticker': 'https://poloniex.com/public?command=returnTicker',
    'volume24h': 'https://poloniex.com/public?command=return24hVolume',
    'orderBook': {
      'base': 'https://poloniex.com/public?command=returnOrderBook',
      'param':
      [
        'currencyPair',
        'depth'
      ]
    },
    'currencyList': ' https://poloniex.com/public?command=returnCurrencies',
    'chartData': {
      'base': 'https://poloniex.com/public?command=returnChartData',
      'param': [
        'currencyPair',
        'start',
        'end',
        'period'
      ]
    }
  };

  constructor(private http: Http) {
    this.getCurrencies()
      .subscribe(data => {
        this.currencyInfo = data;
      });
    this.dataChannel = {
      'tickerView': {},
      'chartView' : {}
    };
  }

  getCurrencies() {
    return this.http.get(this.api.currencyList)
      .map(res => res.json());
  }

  getTickerData() {
    // console.log('update');
    let bindingFunction = (function () {
      this.http.get(this.api.ticker)
        .subscribe(data => {
          this.ticker = JSON.parse(data._body);
          // console.log(this.ticker);
          this.updateTicker()
          this.updateTickerView();
        });
    }).bind(this);
    bindingFunction();
  }

  updateTicker() {
    for (let it in this.ticker) {
      if (it.substring(0, 3) == 'USD') {
        let coin = it.substring(5, it.length);
        if (this.currencyInfo[coin]) {
          this.ticker[it]['coinname'] = ((this.currencyInfo[coin]).name);
        }
      }
      else {
        let coin = it.substring(4, it.length);
        if (this.currencyInfo[coin]) {
          this.ticker[it]['coinname'] = ((this.currencyInfo[coin]).name);
        }
      }
    }
  }

  updateTickerView() {
    let tickerView: any = {};
    for (let it in this.ticker) {
      tickerView[it] = {};
      tickerView[it]['coinname'] = this.ticker[it]['coinname'];
      tickerView[it]['last'] = this.ticker[it]['last'];
      tickerView[it]['percentChange'] = this.ticker[it]['percentChange'];
    }
    this.dataChannel.tickerView = tickerView;
  }

  async getChartData(coin, start, end, period) {
    let tmp;
    if (this.ticker) {
      let chartView = {};
      // this.dataChannel.chartView = {}
      for (let it in this.ticker) {
        let bindingFunction = (function () {
          let url = this.api.chartData.base + '&currencyPair=' + it + '&start=1506843429&end=1506844029&period=300';
          this.http.get(url)
            // .map(res => res
            .subscribe(data => {
              // chartView[it] = data;
              chartView[it] = JSON.parse(data['_body']);

            });
        }).bind(this);
        await setTimeout(bindingFunction, 0);
        // console.log(chartView);
      }
      console.log('chartView');
    }
    else {
      console.log('1');
      let bindingFunction = (function () {
        this.getChartData(coin, start, end, period);
      }).bind(this);
      setTimeout(bindingFunction, 2000);
      return tmp;
    }
  }
}
