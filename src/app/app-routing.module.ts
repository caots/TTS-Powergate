import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {PageComponent} from './pages/page.component'
import {AuthGuard } from './guards/auth.guard'

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
    .then(m => m.LoginPageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/page.module')
      .then(m => m.PagesModule),
      canActivate: [AuthGuard],
  },

  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

// const config: ExtraOptions = {
//   useHash: false,
// };

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
