import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IViaCep } from '../interface/IViaCep';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
}
