import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CreateUserExtraComponent } from './create-user-extra/create-user-extra.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    AuthComponent,
    CreateUserComponent,
    CreateUserExtraComponent,
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NzCheckboxModule,
    HttpClientJsonpModule,
    NgxMaskModule.forRoot(),
  ]
})
export class AuthModule { }
