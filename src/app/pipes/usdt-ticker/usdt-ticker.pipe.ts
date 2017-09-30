import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usdtTicker'
})
export class UsdtTickerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
