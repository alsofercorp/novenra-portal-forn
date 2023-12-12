import { CommonService } from './../../services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/interface/IUserRegister';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';

@Component({
  selector: 'app-confirm-data',
  templateUrl: './confirm-data.component.html',
  styleUrls: ['./confirm-data.component.scss']
})
export class ConfirmDataComponent implements OnInit {
  private userEmail: string = '';
  maskedEmail: string = '';

  constructor(private router: Router, private service: AuthService, private commonService: CommonService, private loaderService: NoventaLoaderService) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('recoverData');

    if (storage) {
      const userData: IUserRegister = JSON.parse(storage);

      this.userEmail = userData.email;
      this.maskedEmail = this.maskEmail(userData.email);
    }
  }

  confirmAndSenEmail() {
    this.loaderService.show('Aguarda, estamos trabalhando nisso!');

    this.service.confirmRecoverEmail(this.userEmail)
      .subscribe({
        next: () => {
          this.commonService.ToastSucess('Um e-mail foi enviado para sua caixa de correio, com as instruções para recuperação da senha.');

          this.router.navigate(['auth', 'login'])
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error);
          this.loaderService.hidde();
        },
        complete: () => {
          this.loaderService.hidde();
        }
      })

  }

  private maskEmail(str: string): string {
    let resultado = '';

    resultado += str.substring(0, str.indexOf('@') + 4);

    str = str.substring(str.indexOf('@') + 4);

    for (let i = 0; i < str.length; i++) {
      resultado += '*';
    }

    return resultado;
  }

}
