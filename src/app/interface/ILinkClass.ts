export interface ILinkClass {
    cotacao: string,
    'visao-geral': string
}

export class LinkClass implements ILinkClass {
    cotacao = '';
    'visao-geral' = '';
}