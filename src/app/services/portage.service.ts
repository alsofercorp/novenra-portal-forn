import { IPortage } from './../interface/IPortage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortageService {
  private apiUrl: string = `${environment.noventaApi}/Frete`;

  constructor(private http: HttpClient) { }

  getPortage(cotationId: string): Observable<IPortage[]> {
    return this.http.get<IPortage[]>(`${this.apiUrl}/ListarFreteCotacao?IdCotacao=${cotationId}`);
  }
}
