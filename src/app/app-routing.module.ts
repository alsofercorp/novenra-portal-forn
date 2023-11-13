import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'criar-usuario',
    loadChildren: () =>
      import('src/app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'app',
    loadChildren: () => import('src/app/pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    relativeLinkResolution: 'legacy',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
