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
        let j = Object.keys(chart[it]).length - 1;
        // console.log(j);
        let baseVol5min = 0;
        for (let jt = 0; jt < 60; ++jt) {
          baseVol5min += chart[it][j - jt].volume;
        }
        chartBTC[i] = {}
        chartBTC[i].coin = it.substring(4, it.length);
        chartBTC[i].date = chart[it][j].date;  //new Date(chart[it][0].date*1000);
        chartBTC[i].variation5min = parseFloat((((chart[it][j].high - chart[it][j].low) / (chart[it][j].high + chart[it][j].low)) * 200).toFixed(2));
        chartBTC[i].change5min = 0; //((chart[it][j].close - chart[it][j].open) / (chart[it][j].close)) * 100
        chartBTC[i].vol5min = (chart[it][j].volume).toFixed(2);
        if (baseVol5min == 0) {
          chartBTC[i].volspike5min == 0;
        }
        else {
          chartBTC[i].volspike5min = (chartBTC[i].vol5min / baseVol5min).toFixed(2);
        }

        // console.log(typeof chartBTC[i].vol5min);
        // console.log(typeof (chartBTC[i].variation5min))

        let high = 0;
        let tmphigh = 0;
        let low = 100000000;
        let tmplow = 100000000;
        let vol = 0;
        for (let jt = 0; jt < 3; ++jt) {
          tmphigh = chart[it][j - jt].high;
          tmplow = chart[it][j - jt].low;
          vol += chart[it][j - jt].volume;
          if (tmphigh > high) {
            high = tmphigh;
          }
          if (tmplow < low) {
            low = tmplow;
          }
        }
        chartBTC[i].variation15min = parseFloat((((high - low) / (high + low)) * 200).toFixed(2));
        chartBTC[i].change15min = 0;
        chartBTC[i].vol15min = (vol).toFixed(2);
        if (baseVol5min == 0) {
          chartBTC[i].volspike15min == 0;
        }
        else {
          chartBTC[i].volspike15min = (chartBTC[i].vol15min / baseVol5min).toFixed(2);
        }
        vol = 0;
        high = 0;
        tmphigh = 0;
        low = 100000000;
        tmplow = 100000000;
        for (let jt = 0; jt < 6; ++jt) {
          tmphigh = chart[it][j - jt].high;
          tmplow = chart[it][j - jt].low;
          vol += chart[it][j - jt].volume;
          if (tmphigh > high) {
            high = tmphigh;
          }
          if (tmplow < low) {
            low = tmplow;
          }
        }
        chartBTC[i].variation30min = parseFloat((((high - low) / (high + low)) * 200).toFixed(2));
        chartBTC[i].change30min = 0;
        chartBTC[i].vol30min = (vol).toFixed(2);

        vol = 0;
        high = 0;
        tmphigh = 0;
        low = 100000000;
        tmplow = 100000000;
        for (let jt = 0; jt < 12; ++jt) {
          tmphigh = chart[it][j - jt].high;
          tmplow = chart[it][j - jt].low;
          vol += chart[it][j - jt].volume;
          if (tmphigh > high) {
            high = tmphigh;
          }
          if (tmplow < low) {
            low = tmplow;
          }
        }
        chartBTC[i].variation1hr = parseFloat((((high - low) / (high + low)) * 200).toFixed(2));
        chartBTC[i].change1hr = 0;
        chartBTC[i].vol1hr = (vol).toFixed(2);

        vol = 0;
        high = 0;
        tmphigh = 0;
        low = 100000000;
        tmplow = 100000000;
        for (let jt = 0; jt < 24; ++jt) {
          tmphigh = chart[it][j - jt].high;
          tmplow = chart[it][j - jt].low;
          vol += chart[it][j - jt].volume;
          if (tmphigh > high) {
            high = tmphigh;
          }
          if (tmplow < low) {
            low = tmplow;
          }
        }
        chartBTC[i].variation2hr = parseFloat((((high - low) / (high + low)) * 200).toFixed(2));
        chartBTC[i].change2hr = 0;
        chartBTC[i].vol2hr = (vol).toFixed(2);

        vol = 0;
        high = 0;
        tmphigh = 0;
        low = 100000000;
        tmplow = 100000000;
        for (let jt = 0; jt < 48; ++jt) {
          tmphigh = chart[it][j - jt].high;
          tmplow = chart[it][j - jt].low;
          vol += chart[it][j - jt].volume;
          if (tmphigh > high) {
            high = tmphigh;
          }
          if (tmplow < low) {
            low = tmplow;
          }
        }
        chartBTC[i].variation4hr = parseFloat((((high - low) / (high + low)) * 200).toFixed(2));
        chartBTC[i].change4hr = 0;
        chartBTC[i].vol4hr = (vol).toFixed(2);

        vol = 0;
        high = 0;
        tmphigh = 0;
        low = 100000000;
        tmplow = 100000000;
        for (let jt = 0; jt < 72; ++jt) {
          tmphigh = chart[it][j - jt].high;
          tmplow = chart[it][j - jt].low;
          vol += chart[it][j - jt].volume;
          if (tmphigh > high) {
            high = tmphigh;
          }
          if (tmplow < low) {
            low = tmplow;
          }
        }
        chartBTC[i].variation6hr = parseFloat((((high - low) / (high + low)) * 200).toFixed(2));
        chartBTC[i].change6hr = 0;
        chartBTC[i].vol6hr = (vol).toFixed(2);
        // console.log(typeof (chartBTC[i].vol6hr));

        i = i + 1;
      }
    }
    return chartBTC;
  }
}
