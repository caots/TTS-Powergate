import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {

  constructor(private currencyPipe : CurrencyPipe) {}
  transform(value: any, ...args: any[]): unknown {
    if(!value) {
      return '0 VNĐ';
  }
  return this.currencyPipe.transform(value).replace("$", "").replace(".00", "").concat(" VNĐ");
  }

}
