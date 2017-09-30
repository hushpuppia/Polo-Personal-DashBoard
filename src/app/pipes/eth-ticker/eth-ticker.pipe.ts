import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ethTicker'
})
export class EthTickerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
