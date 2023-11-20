export interface IUserRegisterDto {
    password: number,
    email: string,
    nome: string
}

export interface IUserRegister {
    id: number,
    email: string,
    nome: string,
    ativo: boolean
}