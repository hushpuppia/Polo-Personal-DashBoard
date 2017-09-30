import { Component, OnInit, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GetPublicDataService } from '../services/get-public-data/get-public-data.service'

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.css'],
  providers: [GetPublicDataService]
})
export class ChartDataComponent implements OnInit, OnChanges {

  chartObs;
  chartData = [];
  chart = [];
  loadflag;
  selectedCurr;
  selDuration;
  chartDur = [
    { 'label': '6 hour', 'value': 21600 },
    { 'label': '12 hour', 'value': 53200 },
    { 'label': '24 hour', 'value': 106400 },
    { 'label': '2d', 'value': 212800 },
    { 'label': '4d', 'value': 425600 },
    { 'label': '1w', 'value': 744800 },
    { 'label': '2w', 'value': 1489600 }
  ];
  candleDur = [
    { 'label': '5 minutes', 'value': 300 },
    { 'label': '15 minutes', 'value': 900 },
    { 'label': '30 minutes', 'value': 1800 },
    { 'label': '2 hours', 'value': 7200 },
    { 'label': '4 hours', 'value': 14400 },
    { 'label': '6 hours', 'value': 86400 }
  ]
  end;
  period;
  time;
  value: number;
  k;

  coin_pair_original = ['BTC_BCN', 'BTC_BELA', 'BTC_BLK', 'BTC_BTCD', 'BTC_BTM',
    'BTC_BTS', 'BTC_BURST', 'BTC_CLAM', 'BTC_DASH', 'BTC_DGB', 'BTC_DOGE', 'BTC_EMC2',
    'BTC_FLDC', 'BTC_FLO', 'BTC_GAME', 'BTC_GRC', 'BTC_HUC', 'BTC_LTC', 'BTC_MAID', 'BTC_OMNI',
    'BTC_NAUT', 'BTC_NAV', 'BTC_NEOS', 'BTC_NMC', 'BTC_NOTE', 'BTC_NXT', 'BTC_PINK', 'BTC_POT',
    'BTC_PPC', 'BTC_RIC', 'BTC_SJCX', 'BTC_STR', 'BTC_SYS', 'BTC_VIA', 'BTC_XVC', 'BTC_VRC', 'BTC_VTC',
    'BTC_XBC', 'BTC_XCP', 'BTC_XEM', 'BTC_XMR', 'BTC_XPM', 'BTC_XRP', 'BTC_ETH', 'BTC_SC', 'BTC_BCY',
    'BTC_EXP', 'BTC_FCT', 'BTC_RADS', 'BTC_AMP', 'BTC_DCR', 'BTC_LSK', 'BTC_LBC', 'BTC_STEEM', 'BTC_SBD',
    'BTC_ETC', 'BTC_REP', 'BTC_ARDR', 'BTC_ZEC', 'BTC_STRAT', 'BTC_NXC', 'BTC_PASC', 'BTC_GNT', 'BTC_GNO'];
  coin_pair;

  constructor(private http: Http, private getData: GetPublicDataService) { }

  ngOnInit() {
    this.loadflag = true;
    this.k = 100 / 64;
    this.value = 0;
    Observable.timer(1000, 1000)
      .subscribe(t => this.time = new Date());
    this.end = Math.floor((+ new Date()) / 1000);
    this.coin_pair = this.coin_pair_original;
    for (let i = 0; i < this.coin_pair.length; ++i) {
      this.chart[i] = {};
      this.chart[i].coin = (this.coin_pair[i]).substring(4, this.coin_pair[i].length);
    }
    this.selDuration = 21600;
    this.period = 300;
  }

  ngOnChanges() { }

  test() {
    console.log("test");
    const tick = this.http.get("https://poloniex.com/public?command=returnTicker")
      .map(res => res.json());
    tick.subscribe(data => console.log(data),
      error => console.log(error));
  }

  start() {
    this.end = Math.floor((+ new Date()) / 1000);
    this.loadflag = true;
    this.value = 0;
    for (let i = 0; i < this.coin_pair.length; ++i) {
      setTimeout(this.startIt(i), 250);
    }
  }

  startIt(i) {
    const chartUrl = 'https://poloniex.com/public?command=returnChartData&currencyPair=' + this.coin_pair[i] +
      '&start=' + (this.end - this.selDuration) + '&end=' + this.end + '&period=' + this.period;
    const chartObs = this.http.get(chartUrl)
      .map(res => res.json());
    // console.log(chartUrl);
    chartObs.subscribe(data => {
      this.chartData[i] = data;
      console.log('dataLoaded');
      if (i === this.coin_pair.length - 1) {
        this.loadflag = false;
      }
      this.value = this.value + this.k;
    },
      error => {
        this.chartData[i] = error;
        console.log('error');
      });
  }
  load() {
    for (let i = 0; i < this.coin_pair.length; ++i) {
      this.chart[i].coin = (this.coin_pair[i]).substring(4, this.coin_pair[i].length);
      const tmp1 = this.chartData[i][this.chartData.length - 1];
      const tmp2 = this.chartData[i][this.chartData.length - 3];
      const tmp3 = this.chartData[i][this.chartData.length - 6];
      const tmp4 = this.chartData[i][this.chartData.length - 12];
      const tmp5 = this.chartData[i][this.chartData.length - 24];
      const tmp6 = this.chartData[i][this.chartData.length - 48];
      const tmp7 = this.chartData[i][this.chartData.length - 72];


      const tmp = this.chartData[i][0];
      // console.log(tmp.open);

      this.chart[i].change5min = ((tmp1.close - tmp1.open) / tmp1.open) * 100;
      this.chart[i].change15min = ((tmp1.close - tmp2.open) / tmp2.open) * 100;
      this.chart[i].change30min = ((tmp1.close - tmp3.open) / tmp3.open) * 100;
      this.chart[i].change1hr = ((tmp1.close - tmp4.open) / tmp4.open) * 100;
      this.chart[i].change2hr = ((tmp1.close - tmp5.open) / tmp5.open) * 100;
      this.chart[i].change4hr = ((tmp1.close - tmp6.open) / tmp6.open) * 100;
      this.chart[i].change6hr = ((tmp1.close - tmp.open) / tmp.open) * 100;
      this.chart[i].time = tmp1.date;
      // console.log(tmp1.date);
      //console.log(this.chartData[i]);
    }
  }
}
