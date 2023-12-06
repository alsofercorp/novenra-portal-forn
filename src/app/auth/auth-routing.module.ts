import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUserExtraComponent } from './create-user-extra/create-user-extra.component';
import { LoginComponent } from './login/login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ConfirmDataComponent } from './confirm-data/confirm-data.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmPasswordChangeComponent } from './confirm-password-change/confirm-password-change.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'dados-basicos', component: CreateUserComponent, title: 'Cadastro - Dados Basicos' },
      { path: 'dados-complementares', component: CreateUserExtraComponent, title: 'Cadastro - Dados Complementares' },
      { path: 'validar-usuario', component: ForgottenPasswordComponent, title: 'Senha - Validação de usuario' },
      { path: 'confirmar-dados', component: ConfirmDataComponent, title: 'Senha - Validação de usuario' },
      { path: 'alterar-senha/:id', component: ChangePasswordComponent, title: 'Senha - Validação de usuario' },
      { path: 'confirmacao', component: ConfirmPasswordChangeComponent, title: 'Senha - Validação de usuario' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
