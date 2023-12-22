import { CommonService } from './../../services/common.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidations } from 'src/app/validators/form-validations';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  recoverForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), FormValidations.equalsTo('password')]),
  });

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  private userEmail: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private service: AuthService, private commonService: CommonService, private loaderService: NoventaLoaderService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userEmail = params.id;
    });
  }

  showPassword() {
    this.passwordFieldType = this.passwordFieldType === 'text' ? 'password' : 'text';
  }

  showConfirmPassword() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'text' ? 'password' : 'text';
  }

  resetPassword() {
    this.loaderService.show('Efetuando a alteração de senha, aguarde!');
    this.service
      .changePassword({password: this.recoverForm.get('password')?.value, email: this.userEmail})
      .subscribe({
        next: () => {
          this.loaderService.hidde();
          this.router.navigate(['usuario', 'confirmacao']);
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error);
          this.loaderService.hidde();
        }
      });
  }
}
