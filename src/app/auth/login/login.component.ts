import { CommonService } from './../../services/common.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserRegister } from '../../interface/IUserRegister';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService
      .authenticate(this.loginForm.value)
      .subscribe((user: IUserRegister) => {
        localStorage.setItem('userData', JSON.stringify(user));
        this.authService.userInfo.emit(user);
        
        this.router.navigate(['app', 'visao-geral']);
      }, (err: HttpErrorResponse) => {
        this.commonService.ToastError(err.error);
      });
  }

}
