import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import {PipeCoreModule} from './../../pipes/pipe.core.module'

const routers: Routes = [
  {
    path: 'product',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeCoreModule,
    RouterModule.forChild(routers),
  ],
  declarations: [
    ProductsComponent,
  ],
  providers: [
    
  ]
})
export class ProductsModule {}
