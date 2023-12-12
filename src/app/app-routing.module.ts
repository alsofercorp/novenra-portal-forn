import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('src/app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
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
