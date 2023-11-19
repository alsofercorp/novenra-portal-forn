import { CommonService } from './../../services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { IUserRegister } from '../../interface/IUserRegister';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required])
  });

  acceptedPolicy: boolean = false;

  constructor(private router: Router, private authService: AuthService, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  nextStep() {
    this.router.navigate(['criar-usuario', 'dados-complementares']);
  }

  createUser() {
    if (this.acceptedPolicy) {
      if (this.userForm.valid) {
        this.authService
        .passwordValidation(this.userForm.get('password')?.value)
        .pipe(switchMap(() => this.authService.register(this.userForm.value)))
        .subscribe((userLogin: IUserRegister) => {
          localStorage.setItem('userInfo', JSON.stringify(userLogin));
          this.nextStep();
        }, (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error)
        });
      }
    } else {
      this.commonService.ToastWarning('Você deve aceitar as termos de uso.')
    }
  }
}
