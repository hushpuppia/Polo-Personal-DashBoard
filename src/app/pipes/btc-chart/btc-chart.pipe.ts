import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'btcChart'
})
export class BtcChartPipe implements PipeTransform {

  transform(chart: any, args?: any): any {
    let chartBTC = [];
    let i = 0;
    for (let it in chart) {
      if (it.substring(0, 3) == 'BTC') {
        let j = Object.keys(chart[it]).length-1;
        // console.log(j);
        chartBTC[i] = {}
        chartBTC[i].coin = it.substring(4, it.length);
        chartBTC[i].date = chart[it][j].date;  //new Date(chart[it][0].date*1000);
        chartBTC[i].open = Math.round(chart[it][j].open);
        chartBTC[i].close = chart[it][j].close;
        chartBTC[i].variation = ((chart[it][j].high - chart[it][j].low)/(chart[it][j].high))*100;
        chartBTC[i].change = ((chart[it][j].close - chart[it][j].open)/(chart[it][j].close))*100;
        i = i + 1;
      }
    }
    return chartBTC

  }

}
