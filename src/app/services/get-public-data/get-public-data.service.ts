import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GetPublicDataService {

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

  constructor(private http: Http) { }

  getTicker() {
    return this.http.get(this.api.ticker)
      .map(res => res.json());
  }
  getCurrencies() {
    return this.http.get(this.api.currencyList)
      .map(res => res.json());
  }
  getChart(coin, start, end, period) {
    return this.http.get(this.api.chartData.base + '&currencyPair=' + coin + '&start=' + start + '&end=' + end + '&period=' + period)
      .map(res => res.json());
  }
}
