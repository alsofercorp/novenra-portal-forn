import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IState } from '../interface/IState';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private statePath: string = `${environment.noventaApi}/Estado`

  constructor(private http: HttpClient) { }

  getStates(): Observable<IState[]> {
    return this.http.get<IState[]>(`${this.statePath}/ListarEstado`);
  }
}
