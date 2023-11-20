export interface ILinkClass {
    cotacao: string,
    'visao-geral': string,
    'ordem-de-compra': string;
}

export class LinkClass implements ILinkClass {
    cotacao = '';
    'visao-geral' = '';
    'ordem-de-compra' = '';
}