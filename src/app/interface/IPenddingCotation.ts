export interface IPeddingCotation {
    id: number,
    solicitante: string,
    localEntrega: string,
    dataSolicitacao: string | Date,
    dataEntrega: string | Date,
    quantidadeItensRequisitados: number
}