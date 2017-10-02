import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BtcTickerPipe } from '../pipes/btc-ticker/btc-ticker.pipe'
import { GetPublicDataService } from '../services/get-public-data/get-public-data.service'
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  providers: [BtcTickerPipe]
})
export class TickerComponent implements OnInit {

  tickerView: any;
  tickerBTC = [];
  columns;
  timer:Observable<any> = Observable.timer(2000,1000);
  i: number = 0;
  dataChannel;

  currencyInfo: any;

  constructor(private http: Http, private getData: GetPublicDataService, private btcTicker: BtcTickerPipe) {
    this.dataChannel = this.getData.dataChannel;
  }

  ngOnInit() {
  }

  ngOnChanges(simplechanges) {
    console.log('update');
  }

  getTicker() {
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
    this.getData.getChartData('BTC_NXT',140000,1500000,300);
  }
}
