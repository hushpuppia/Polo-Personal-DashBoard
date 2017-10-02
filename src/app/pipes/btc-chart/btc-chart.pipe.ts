import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'btcChart'
})
export class BtcChartPipe implements PipeTransform {

  transform(chart: any, args?: any): any {
    let chartBTC = [];
    let i = 0;
    console.log(chart);
    for (let it in chart) {
      if (it.substring(0, 3) == 'BTC') {
        chartBTC[i] = {}
        chartBTC[i].coin = it.substring(4, it.length);
        chartBTC[i].id = chart[it].id;
        chartBTC[i].price = chart[it].last;
        chartBTC[i].change = chart[it].percentChange;
        chartBTC[i].coinname = chart[it].coinname;
        i = i + 1;
      }
    }
    return chartBTC

  }

}
