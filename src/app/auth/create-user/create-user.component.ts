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
    nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
  });

  acceptedPolicy: boolean = false;

  constructor(private router: Router, private authService: AuthService, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  nextStep() {
    this.router.navigate(['usuario', 'dados-complementares']);
  }

  createUser() {
    this.authService
      .passwordValidation(this.userForm.get('password')?.value)
      .pipe(switchMap(() => this.authService.register(this.userForm.value)))
      .subscribe({
        next: (userLogin: IUserRegister) => {
          localStorage.setItem('userInfo', JSON.stringify(userLogin));
          this.nextStep();
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error)
        }
      });
  }

  ValidateFormError(controlName: string): any {
    const error: any = {
      hasError: this.userForm.get(controlName)?.invalid &&
        this.userForm.get(controlName)?.errors &&
        (this.userForm.get(controlName)?.dirty || this.userForm.get(controlName)?.touched),
      errorMsg: ''
    };

    if (error.hasError) {
      if (this.userForm.get(controlName)?.hasError('required')) {
        error.errorMsg = `O campo é obrigatorio.`
      }

      if (this.userForm.get(controlName)?.hasError('email')) {
        error.errorMsg = `O campo deve ser um e-mail valido.`
      }

      if (this.userForm.get(controlName)?.hasError('minlength')) {
        error.errorMsg = `O campo deve ter no minimo ${this.userForm.get(controlName)?.errors?.['minlength'].requiredLength} caracteres.`
      }

      return error;
    }
  }
}
