import { CotationService } from './../../services/cotation.service';
import { SupplierService } from './../../services/supplier.service';
import { ISupplier } from './../../interface/ISupplier';
import { CommonService } from './../../services/common.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserRegister } from '../../interface/IUserRegister';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';
import { switchMap } from 'rxjs';

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

  userData: any = {
    user: null,
    supplier: null
  };

  remenberUser: boolean = false;

  cotationRequestId: string = '';
  private cotationId: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, 
    private supplierService: SupplierService, private commonService: CommonService, private loaderService: NoventaLoaderService,
    private cotationService: CotationService) { }

  ngOnInit(): void {
    localStorage.clear();

    this.route.params
      .subscribe((params: any) => {
        if (params.guid) {
          this.cotationRequestId = params.guid
        }
      });

    if (this.commonService.getCookie('userEmail')) {
      this.loginForm.patchValue({
        email: this.commonService.getCookie('userEmail')
      });

      this.remenberUser = true;
    }
  }

  login() {
    this.loaderService.show();

    if (this.cotationRequestId !== '') {
      this.authService
        .authenticate(this.loginForm.value)
        .pipe(switchMap((user: IUserRegister) => {
          this.userData.user = user;

          return this.cotationService.getCotationByGuid(this.cotationRequestId);
        }))
        .pipe(switchMap((cotationId: number) => {
          this.cotationId = cotationId;

          return this.supplierService.getSupplierById(this.userData.user.id);
        }))
        .subscribe({
          next: (supplier: ISupplier) => {
            this.userData.supplier = supplier;

            this.remenberMe();

            localStorage.setItem('userData', JSON.stringify(this.userData));
            this.authService.userInfo.emit(this.userData.user);
            this.router.navigate(['app', 'visao-geral', 'responder-solicitacao', this.cotationId]);
            this.loaderService.hidde();
          },
          error: (err: HttpErrorResponse) => {
            this.commonService.ToastError(err.error.msg);
            this.loaderService.hidde();
          }
        });
    } else {
      this.authService
        .authenticate(this.loginForm.value)
        .pipe(switchMap((user: IUserRegister) => {
          this.userData.user = user;

          return this.supplierService.getSupplierById(user.id);
        }))
        .subscribe({
          next: (supplier: ISupplier) => {
            this.userData.supplier = supplier;

            localStorage.setItem('userData', JSON.stringify(this.userData));
            this.authService.userInfo.emit(this.userData.user);
            this.router.navigate(['app', 'visao-geral']);
            this.loaderService.hidde();
          },
          error: (err: HttpErrorResponse) => {
            this.commonService.ToastError(err.error.msg);
            this.loaderService.hidde();
          }
        });
    }
  }

  remenberMe() {
    if (this.remenberUser) {
      this.commonService.setCookie('userEmail', this.loginForm.get('email')?.value);
    } else {
      debugger
      this.commonService.deleteCookie('userEmail');
    }
  }
}
