import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IViaCep } from '../interface/IViaCep';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  viacep: string = environment.viacepApi;

  constructor(private http: HttpClient) { }

  getAddressByCep(cep: string): Observable<IViaCep> {
    return this.http.get<IViaCep>(`${this.viacep}/${cep}/json`);
  }
}
