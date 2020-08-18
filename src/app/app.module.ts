import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import {RouterModule, Routes } from '@angular/router';

import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { CurrencyPipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
