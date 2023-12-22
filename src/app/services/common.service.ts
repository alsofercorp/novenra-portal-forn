import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IViaCep } from '../interface/IViaCep';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ISerpro } from '../interface/ISerpro';
import { IUserData, IUserRegister } from '../interface/IUserRegister';

const ToastObj = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  viacep: string = environment.viacepApi;
  serpro: string = environment.serproApi;

  isSelectedLink: EventEmitter<any> = new EventEmitter;

  constructor(private http: HttpClient, private router: Router) { }

  getAddressByCep(cep: string): Observable<IViaCep> {
    return this.http.get<IViaCep>(`${this.viacep}/${cep}/json`);
  }

  getCompanyInfo(cnpj: string): Observable<ISerpro>  {
    return this.http.jsonp<ISerpro>(`${this.serpro}/cnpj/${cnpj}?callback=JSONP_CALLBACK`, 'callback');
  }

  getUserInfo(): IUserData {
    let userData: IUserData = {} as IUserData;

    const storage: string | null = localStorage.getItem('userData');

    if (storage) {
      userData = JSON.parse(storage);
    }

    return userData
  }

  isRouteActive(route: string): void {
    const isActive = this.router.isActive(route, true);
    const selectedClass = isActive ? 'ant-menu-item ant-menu-item-selected' : '';

    this.isSelectedLink.emit({
      route: route.split('/')[2],
      class: selectedClass
    });
  }

  ToastWarning(message: string) {
    ToastObj.fire({
      text: message,
      icon: 'warning'
    })
  }

  ToastError(message: string) {
    ToastObj.fire({
      text: message,
      icon: 'error'
    })
  }

  ToastSucess(message: string) {
    ToastObj.fire({
      text: message,
      icon: 'success'
    })
  }
}
