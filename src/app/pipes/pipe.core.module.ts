import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { FormatMoneyPipe } from './format-money.pipe';
import { FormatStatusPipe } from './format-status.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ FormatMoneyPipe, FormatStatusPipe,],
  exports: [ FormatMoneyPipe,FormatStatusPipe],
  providers: [
    CurrencyPipe
  ]
})
export class PipeCoreModule {}