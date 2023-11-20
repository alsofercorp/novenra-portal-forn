import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IViaCep } from '../interface/IViaCep';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

const ToastObj = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 10000,
  timerProgressBar: true
});

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  viacep: string = environment.viacepApi;
  isSelectedLink: EventEmitter<any> = new EventEmitter;

  constructor(private http: HttpClient, private router: Router) { }

  getAddressByCep(cep: string): Observable<IViaCep> {
    return this.http.get<IViaCep>(`${this.viacep}/${cep}/json`);
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
