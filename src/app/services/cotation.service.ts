import { ICotationModel, ICotationById } from './../interface/ICotation';
import { IStatus } from './../interface/IStatus';
import { IReason } from './../interface/IReason';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICotationFilter } from '../interface/IFilter';

@Injectable({
  providedIn: 'root'
})
export class CotationService {
  apiUrl: string = environment.noventaApi;

  constructor(private http: HttpClient) { }

  getStatus(): Observable<IStatus[]> {
    return this.http.get<any>(`${this.apiUrl}/Filtros/ListarStatus`)
      .pipe(map((res: any) => {
        return res.data.status;
      }))
  }

  getReason(): Observable<IReason[]> {
    return this.http.get<IReason[]>(`${this.apiUrl}/Filtros/ListarMotivo`)
      .pipe(map((res: any) => {
        return res.data.motivo;
      }))
  }

  getCotation(filter: ICotationFilter): Observable<ICotationModel> {
    return this.http.post<ICotationModel>(`${this.apiUrl}/Cotacao/ListarCotacaoFornecedor`, filter);
  }

  getCotationById(id: string): Observable<ICotationById> {
    return this.http.post<ICotationById>(`${this.apiUrl}/Cotacao/ListarCotacaoId?Id=${id}`, {});
  }
}
