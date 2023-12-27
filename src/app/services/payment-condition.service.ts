import { IPaymentCondition } from './../interface/IPaymentCondition';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentConditionService {
  private apiUrl: string = `${environment.noventaApi}/CondicaoPagamento`;

  constructor(private http: HttpClient) { }

  getPaymentContion(cotationId: string): Observable<IPaymentCondition[]> {
    return this.http.get<IPaymentCondition[]>(`${this.apiUrl}/ListarIdCotacaoCondicaoPagamentoCotacao?IdCotacao=${cotationId}`);
  }
}
