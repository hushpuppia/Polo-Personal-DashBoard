import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BtcTickerPipe } from '../pipes/btc-ticker/btc-ticker.pipe'
import { BtcChartPipe } from '../pipes/btc-chart/btc-chart.pipe'
import { GetPublicDataService } from '../services/get-public-data/get-public-data.service'
import { RoundPipe } from '../pipes/math/round/round.pipe';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  providers: [BtcTickerPipe, BtcChartPipe]
})
export class TickerComponent implements OnInit {

  tickerView: any;
  tickerBTC = [];
  columns;
  timer: Observable<any> = Observable.timer(0, 1000);
  i: number = 0;
  dataChannel;
  currencyInfo: any;
  durations = [
    { label: '5 min', value: 300 },
    { label: '15 min', value: 900 },
    { label: '30 min', value: 1800 },
    { label: '2 hr', value: 7200 },
    { label: '4 hr', value: 14400 },
    { label: '6 hr', value: 86400 },
    { label: '24 hr', value: 345600},
    { label: '2 day', value: 691200},
    { label: '4 day', value: 1382400},
    { label: '1 week', value: 2419200},
    { label: '2 week', value: 4838400},
    { label: '1 month', value: 9676800}
  ];
  duration;
  date;

  constructor(private http: Http, private getData: GetPublicDataService, private btcTicker: BtcTickerPipe) {
    this.dataChannel = this.getData.dataChannel;
    this.dataChannel.chartFlag = true;
    this.dataChannel.durationActive = 7200;
  }

  ngOnInit() {
    this.getTicker();
    this.date = Math.round((new Date()).getTime() / 1000);
    this.date = this.date - this.date % 300;
    setInterval(() => this.getChartData(), 1000);
  }

  getTicker() {
    console.log('tick');
    this.timer
      .subscribe(tick => {
        this.getTickerData();
      });
  }

  getTickerData() {
    this.getData.getTickerData();
  }

  stopDashboard() {
    this.timer = null;
  }

  getChartData() {
    // console.log('chart');
    let date = Math.round((new Date()).getTime() / 1000);
    date = date - date % 300;
    if (((date != this.date) || this.dataChannel.chartFlag) && (this.dataChannel.tickerView != null)) {
      console.log('change');
      this.dataChannel.chartFlag = false;
      this.date = date;
      this.getData.getChartData(this.date - this.dataChannel.durationActive, 9999999999, this.duration);
    }
    else {
      // alert('no updates available');
    }
  }
}
