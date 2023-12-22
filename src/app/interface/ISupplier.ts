export interface ISupplier {
    id: number,
    cnpjCpf: number,
    razaoSocial: string,
    cep: number,
    logradouro: string,
    numero: number,
    complemento: string,
    cidade: string,
    idEstado: number,
    nomeUsuarioCadastro: string,
    dataCadastro: string | Date,
    nomeUsuarioAlteracao: string,
    dataAlteracao: string | Date,
    telefone: number,
    inscricaoEstadual: number | null
}