import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUserExtraComponent } from './create-user-extra/create-user-extra.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'dados-basicos', component: CreateUserComponent, title: 'Cadastro - Dados Basicos' },
      { path: 'dados-complementares', component: CreateUserExtraComponent, title: 'Cadastro - Dados Complementares' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
