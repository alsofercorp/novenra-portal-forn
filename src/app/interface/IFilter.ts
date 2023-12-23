import { IPeddingCotation } from "./IPenddingCotation";
import { IRecentlyActive } from "./IRecentlyActive";

export interface IWeekFilter {
    pending: IPeddingCotation[],
    recently: IRecentlyActive[],
    statistic: IStatistic,
    totalPendingCotationPage: number,
    totalRecentlyCotationPage: number
}

export interface IStatistic {
    cotacoesEnviadas: number,
    cotacoesPendentes: number,
    ocsAprovadas: number,
    ocsFinalizadas: number
}

export interface ICotationFilter {
    idFornecedor: number,
    solicitacao: string | null,
    statusId: number[] | null,
    motivoId: number[] | null,
    dataInicio: string | Date | null,
    dataTermino: string | Date | null
    page: number
  }