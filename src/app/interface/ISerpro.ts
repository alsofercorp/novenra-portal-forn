export interface ISerpro {
    abertura: string,
    situacao: string,
    tipo: string,
    nome: string,
    fantasia: string,
    porte: string,
    natureza_juridica: string,
    atividade_principal: IAtividadePrincipal[],
    logradouro: string,
    numero: string,
    municipio: string,
    bairro: string,
    uf: string,
    cep: string,
    email: string,
    telefone: string,
    data_situacao: string,
    cnpj: string,
    ultima_atualizacao: string,
    status: string,
    complemento: string,
    efr: string,
    motivo_situacao: string,
    situacao_especial: string,
    data_situacao_especial: string,
    capital_social: string,
    qsa: any[],
    extra: any,
    billing: IBilling
}

interface IAtividadePrincipal {
    code: string,
    text: string
}

interface IBilling {
    free: boolean,
    database: boolean
}