import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWeekFilter } from '../interface/IFilter';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl: string = environment.noventaApi;

  constructor(private http: HttpClient) { }

  getDashboardByWeek(idFornecedor: number, id: number): Observable<IWeekFilter> {
    return this.http.get<IWeekFilter>(`${this.apiUrl}/Filtros/ListarDadosDashBoard?idFornecedor=${idFornecedor}&idData=${id}`)
      .pipe(map((res: any) => {
        return {
          pending: res.data.listaCotacoesPendentesDashBoards ? res.data.listaCotacoesPendentesDashBoards : [],
          recently: res.data.listaAtividadesRecentesDashBoards ? res.data.listaAtividadesRecentesDashBoards : [],
          statistic: {
            cotacoesEnviadas: res.data.cotacoesEnviadas,
            cotacoesPendentes: res.data.cotacoesPendentes,
            ocsAprovadas: res.data.ocsAprovadas,
            ocsFinalizadas: res.data.ocsFinalizadas
          }
        } as IWeekFilter;
      }));
  }
}
