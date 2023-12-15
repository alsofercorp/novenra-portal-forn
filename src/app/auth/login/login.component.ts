import { CommonService } from './../../services/common.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserRegister } from '../../interface/IUserRegister';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoventaLoaderComponent } from 'src/app/components/noventa-loader/noventa-loader.component';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.maxLength(15)]),
  });

  constructor(private router: Router, private authService: AuthService, private commonService: CommonService, private loaderService: NoventaLoaderService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  login() {
    this.loaderService.show(null);

    this.authService
      .authenticate(this.loginForm.value)
      .subscribe({
        next: (user: IUserRegister) => {
          localStorage.setItem('userData', JSON.stringify(user));
          this.authService.userInfo.emit(user);
          this.loaderService.hidde();
          this.router.navigate(['app', 'visao-geral']);
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error);
          this.loaderService.hidde();
        }
      });
  }

}
