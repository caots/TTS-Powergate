import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageComponent } from './page.component';
import {ProductsComponent} from './products/products.component'

const routes: Routes = [{
  path: '',
  component: PageComponent,
  children: [
    {
        path: 'product',
        loadChildren: () => import('./products/products.module')
          .then(m => m.ProductsModule),
      },
    // {
    //   path: '',
    //   redirectTo: 'product',
    //   pathMatch: 'full',
    // },
    {
      path: '**',
      component: ProductsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
