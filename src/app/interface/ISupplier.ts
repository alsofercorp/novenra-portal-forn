export interface ISupplier {
    id: number,
    cnpj: string,
    razaosocial: string,
    cep: string,
    logradouro: string,
    numero: string,
    complemento: string,
    cidade: string,
    idEstado: number,
    nomeUsuarioCadastro: string,
    dataCadastro: Date | string,
    nomeUsuarioAlteracao: string,
    dataAltercacao: Date | string
}