import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidations } from 'src/app/validators/form-validations';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  recoverForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), FormValidations.equalsTo('password')]),
  });

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showPassword() {
    this.passwordFieldType = this.passwordFieldType === 'text' ? 'password' : 'text';
  }

  showConfirmPassword() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'text' ? 'password' : 'text';
  }

  resetPassword() {
    this.router.navigate(['esqueci-minha-senha', 'confirmacao']);
  }

  teste() {
    debugger
    this.recoverForm
  }
}
