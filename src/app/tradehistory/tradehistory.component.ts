import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-tradehistory',
  templateUrl: './tradehistory.component.html',
  styleUrls: ['./tradehistory.component.css']
})
export class TradehistoryComponent implements OnInit {

  trHistAr = [];
  trHistObs;
  trHistUrl = 'https://poloniex.com/public?command=returnTradeHistory';
  i = 0;
  columns;
  coin_pair = ['BTC_BCN', 'BTC_BELA', 'BTC_BLK', 'BTC_BTCD', 'BTC_BTM',
    'BTC_BTS', 'BTC_BURST', 'BTC_CLAM', 'BTC_DASH', 'BTC_DGB', 'BTC_DOGE', 'BTC_EMC2',
    'BTC_FLDC', 'BTC_FLO', 'BTC_GAME', 'BTC_GRC', 'BTC_HUC', 'BTC_LTC', 'BTC_MAID', 'BTC_OMNI',
    'BTC_NAUT', 'BTC_NAV', 'BTC_NEOS', 'BTC_NMC', 'BTC_NOTE', 'BTC_NXT', 'BTC_PINK', 'BTC_POT',
    'BTC_PPC', 'BTC_RIC', 'BTC_SJCX', 'BTC_STR', 'BTC_SYS', 'BTC_VIA', 'BTC_XVC', 'BTC_VRC', 'BTC_VTC',
    'BTC_XBC', 'BTC_XCP', 'BTC_XEM', 'BTC_XMR', 'BTC_XPM', 'BTC_XRP', 'BTC_ETH', 'BTC_SC', 'BTC_BCY',
    'BTC_EXP', 'BTC_FCT', 'BTC_RADS', 'BTC_AMP', 'BTC_DCR', 'BTC_LSK', 'BTC_LBC', 'BTC_STEEM', 'BTC_SBD',
    'BTC_ETC', 'BTC_REP', 'BTC_ARDR', 'BTC_ZEC', 'BTC_STRAT', 'BTC_NXC', 'BTC_PASC', 'BTC_GNT', 'BTC_GNO'];


  duration = [
    { 'label': '15 min', 'value': 900 },
    { 'label': '30 min', 'value': 1800 },
    { 'label': '45 min', 'value': 2700 },
    { 'label': '1 hr', 'value': 3600 },
    { 'label': '1.5 hr', 'value': 5400 },
    { 'label': '2 hr', 'value': 7200 },
  ];
  selecteddur;
  end;
  constructor(private http: Http) { }

  ngOnInit() {
    this.selecteddur = 1800;
  }

  refresh() {
    console.log(this.selecteddur);
    for (let i = 0; i < 64; ++i) {
      this.trHistAr[i] = {};
      this.trHistAr[i].coin = (this.coin_pair[i]).substring(4, this.coin_pair[i].length);
    }
    // const timer = Observable.timer(500, 250);
    // timer.subscribe(t => {
    // });
    for (let i = 0; i < 64; ++i) {
      this.end = Math.floor((+ new Date()) / 1000);
      const histUrl = this.trHistUrl + '&currencyPair=' + this.coin_pair[i] + '&start='
        + (this.end - this.selecteddur) + '&end=' + this.end;
      const trHistObs = this.http.get(histUrl);
      let tradeH;
      trHistObs.subscribe(data => {
        const it = i;
        tradeH = data;
        const tmp = JSON.parse(tradeH._body);
        this.trHistAr[it].price = tmp[0].rate;
        this.trHistAr[it].timeE = tmp[0].date;
        this.trHistAr[it].timeS = tmp[tmp.length - 1].date;
        this.trHistAr[it].change = (((tmp[0]).rate - (tmp)[tmp.length - 1].rate) / tmp[tmp.length - 1].rate) * 100;
      },
        error => tradeH = error);
      setTimeout(1000);
      this.i = (this.i + 1) % 64;
    }
  }
}
