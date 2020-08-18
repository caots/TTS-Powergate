import { NgModule } from '@angular/core';
import {LoginPageModule} from './login/login.module'
import {ProductsModule} from './products/products.module'
import { PagesRoutingModule } from './pages-routing.module';
import {PageComponent} from './page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PageComponent,
  ],
})
export class PagesModule {
}
 