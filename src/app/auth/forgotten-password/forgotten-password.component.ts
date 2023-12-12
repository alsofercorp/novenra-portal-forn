import { CommonService } from './../../services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/interface/IUserRegister';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  forgottenForm: FormGroup = new FormGroup({
    cpfcnpj: new FormControl('', [Validators.required]),
  });


  constructor(private router: Router, private service: AuthService, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  requestPasswordNewKey() {
    this.service.recoverAccess(this.forgottenForm.get('cpfcnpj')?.value)
      .subscribe({
        next: (user: IUserRegister) => {
          localStorage.setItem('recoverData', JSON.stringify(user));
          this.router.navigate(['usuario', 'confirmar-dados']);
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error);
        }
      })
  }

  countMaskMinLenght(validator: any): number {
    const valueNoMask: string = validator.mask.requiredMask.replace('^[0-9]', '');

    return valueNoMask.length;
  }
}
