import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'btcTicker'
})
export class BtcTickerPipe implements PipeTransform {

  transform(ticker: any): any {
    let tickerBTC = [];
    let i = 0;
    for (let it in ticker) {
      if (it.substring(0, 3) == 'BTC') {
        tickerBTC[i] = {}
        tickerBTC[i].coin = it.substring(4, it.length);
        tickerBTC[i].id = ticker[it].id;
        tickerBTC[i].price = ticker[it].last;
        tickerBTC[i].change = ((ticker[it].percentChange) * 100).toFixed(2);
        tickerBTC[i].coinname = ticker[it].coinname;
        i = i + 1;
      }
    }
    return tickerBTC;
  }

}
