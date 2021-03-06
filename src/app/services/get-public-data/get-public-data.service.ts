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
      'chartView': {},
      'progress': 0
    };
  }

  getCurrencies() {
    return this.http.get(this.api.currencyList)
      .map(res => res.json());
  }

  getTickerData() {
    let bindingFunction = (function () {
      this.http.get(this.api.ticker)
        .subscribe(data => {
          this.ticker = JSON.parse(data._body);
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

  async getChartData(start, end, period) {
    let tmp;
    if (this.ticker) {
      let chartView = {};
      let i = Object.keys(this.ticker).length;
      const c = Object.keys(this.ticker).length;
      this.dataChannel.progress = 1 - i / c;
      for (let it in this.ticker) {
        let bindingFunction = (function () {
          let url = this.api.chartData.base + '&currencyPair=' + it + '&start=' + start + '&end=' + end + '&period=300';
          this.http.get(url)
            .subscribe(data => {
              chartView[it] = JSON.parse(data['_body']);
              i = i - 1;
              this.dataChannel.progress = 1 - i / c;
              if (i == 0) {
                this.dataChannel.chartView = chartView;
              }
            });
        }).bind(this);
        await setTimeout(bindingFunction, 0);
      }
    }
    else {
      let bindingFunction = (function () {
        this.getChartData(start, end, period);
      }).bind(this);
      setTimeout(bindingFunction, 2000);
      return tmp;
    }
  }
}
