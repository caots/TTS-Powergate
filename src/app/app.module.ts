import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import {ProductsService} from './services/products.service'

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ProductsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
