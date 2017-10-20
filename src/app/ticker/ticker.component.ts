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
    { label: '6hours', value: '6hours' },
    { label: '24hours', value: '24hours' },
    { label: 'days', value: 'days' },
  ];
  duration;
  date;

  constructor(private http: Http, private getData: GetPublicDataService, private btcTicker: BtcTickerPipe) {
    this.dataChannel = this.getData.dataChannel;
    this.dataChannel.chartFlag = true;
    this.dataChannel.durationActive = this.duration;
  }

  ngOnInit() {
    this.getTicker();
    this.date = Math.round((new Date()).getTime() / 1000);
    this.date = this.date - this.date % 300;
    this.duration = '6hours';
    setInterval(() => this.getChartData(), 1000);
  }

  getTicker() {
    this.timer
      .subscribe(tick => {
        this.getTickerData();
      });
  }

  getTickerData() {
    this.getData.getTickerData();
    // console.log('tick');
  }

  stopDashboard() {
    this.timer = null;
  }

  getChartData() {
    // console.log('chart');
    let date = Math.round((new Date()).getTime() / 1000);
    date = date - date % 300;
    if (this.duration == '6hours') {
      this.dataChannel.durationActive = 86400;
      // console.log(this.duration);
    }
    else if (this.duration == '24hours') {
      this.dataChannel.durationActive = 86700
    }
    else {
      // console.log(this.duration);
      this.dataChannel.durationActive = 9676800;
    }
    if (((date != this.date) || this.dataChannel.chartFlag) && (this.dataChannel.tickerView != null)) {
      // console.log('change');
      this.dataChannel.chartFlag = false;
      this.date = date;
      this.getData.getChartData(this.date - this.dataChannel.durationActive, 9999999999, this.duration);
    }
    else {
      // alert('no updates available');
    }
  }
}
