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

  COOKIE_PATH: string = environment.COOKIE_PATH;
  COOKIE_EXPIRE_TIME: number = environment.COOKIE_EXPIRE_TIME;

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

  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  deleteCookie(name: string) {
    document.cookie = `${name}=${''}; Max-Age=0`;
  }

  setCookie(
    name: string,
    value: string,
  ) {
    let d: Date = new Date();

    d.setTime(d.getTime() + this.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000);

    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = this.COOKIE_PATH ? `; path=${this.COOKIE_PATH}` : '';

    document.cookie = `${name}=${value}`; `${expires}${cpath}`;
  }
}
