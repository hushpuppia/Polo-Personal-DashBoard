import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BtcTickerPipe } from '../pipes/btc-ticker/btc-ticker.pipe'
import { GetPublicDataService } from '../services/get-public-data/get-public-data.service'

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  providers: [BtcTickerPipe]
})
export class TickerComponent implements OnInit {
  tickerUrl = 'https://poloniex.com/public?command=returnTicker';
  ticker: any;
  tickerBTC = [];
  columns;
  timer;
  i: number = 0;

  currencyInfo: any;

  constructor(private http: Http, private getData: GetPublicDataService, private btcTicker: BtcTickerPipe) { }

  ngOnInit() {
    this.getData.getCurrencies()
      .subscribe(data => {
        this.currencyInfo = data;
      });
  }

  ngOnChanges() {
  }

  async startDashboard() {
    await this.getTickerData();
    console.log('period');
    // await this.getChartData();
  }

  stopDashboard() {
    this.timer = null;
  }

  async getTickerData() {
    let bindingFunction = (async function () {
      await this.getData.getTicker()
        .toPromise()
        .then(data => {
          this.ticker = data;
        });
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
      console.log('period1')
    }).bind(this);
    this.timer = await setTimeout(await bindingFunction, 3000);
    console.log('period2');
  }
  async getChartData() {
    for(let it in this.ticker) {
      let coin, start, end, period;
      this.getData.getChart(coin,start,end,period)
      .toPromise()
      .then(data => {});
    }
  }

}
