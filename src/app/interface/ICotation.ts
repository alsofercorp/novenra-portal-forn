export interface ICotationModel {
  cotacoes: ICotationList[],
  totalPage: number
}

export interface ICotationList {
  id: string
  solicitante: string,
  localDestino: string,
  dataSolicitacao: string,
  dataEntrega: string,
  motivo: string,
  contato: string,
  status: any,
  cotacoesPendentesPageCount: number
}

export class CotationById implements ICotationById {
  cotacao: ICotation
  dadosSolicitante: IRequesterData
  material: IMaterial[]
  resumoCotacao: IResume

  constructor() {
    this.material = [] as IMaterial[];

    this.resumoCotacao = {
      formaPagamento: '',
      outrasDespesas: 0,
      subTotalItens: 0,
      valorDesconto: 0,
      valorFinalCotacao: 0,
      valorFrete: 0,
      valorSeguro: 0,
    }

    this.dadosSolicitante = {
      cep: '',
      cidade: '',
      cnpj: '',
      contato: '',
      dataEntrega: '',
      dataSolicitacao: '',
      email: '',
      endereco: '',
      estado: '',
      id: 0,
      idCotacao: '',
      nome: '',
      telefone: '',
    }

    this.cotacao = {
      idCotacao: '0',
      condicoesPagamento_Id: 0,
      cotacaoStatus_Id: 0,
      dataAlteracao: '',
      dataCadastro: '',
      dataEntregaDesejavel: '',
      dataPostagem: '',
      fornecedor_Id: 0,
      frete_Id: 0,
      id: 0,
      motivo_Id: 0,
      nomeCondicaoPagamento: '',
      nomeFornecedor: '',
      nomeFrete: '',
      nomeMotivo: '',
      nomeStatus: '',
      nomeUsuarioAlteracao: '',
      nomeUsuarioCadastro: '',
      observacao: '',
      outrasDespesas: '',
      prazoMaximoCotacao: '',
      valorDesconto: 0,
      valorFrete: 0,
      valorFreteForaNota: 0,
      valorSeguro: 0,
      vendedor: ''
    }
  }
}

export interface ICotationById {
  cotacao: ICotation,
  dadosSolicitante: IRequesterData,
  material: IMaterial[],
  resumoCotacao: IResume,
}

interface IResume {
  formaPagamento: string
  outrasDespesas: number,
  subTotalItens: number,
  valorDesconto: number,
  valorFinalCotacao: number,
  valorFrete: number,
  valorSeguro: number
}

export interface IMaterial {
  ativo: boolean,
  cotacao_Id: number,
  descricao: string,
  id: number,
  ipiIncluso: boolean,
  marca: string,
  material_Id: number,
  nomeFabricante: string,
  percentualDesconto: number,
  percentualIcms: number,
  percentualIpi: number,
  prazoEntrega: string,
  precoUnitario: number,
  quantidadeRequisitada: number,
  subTotal: number,
  valorIpi: number
}

interface IRequesterData {
  cep: string,
  cidade: string,
  cnpj: string,
  contato: string,
  dataEntrega: string,
  dataSolicitacao: string,
  email: string,
  endereco: string,
  telefone: string,
  estado: string,
  id: number,
  idCotacao: string,
  nome: string
}

interface ICotation {
  condicoesPagamento_Id: number,
  cotacaoStatus_Id: number,
  dataAlteracao: string | Date,
  dataCadastro: string | Date,
  dataEntregaDesejavel: string | Date,
  dataPostagem: string | Date,
  fornecedor_Id: number,
  frete_Id: number,
  id: number,
  idCotacao: string,
  motivo_Id: number,
  nomeCondicaoPagamento: string,
  nomeFornecedor: string,
  nomeFrete: string,
  nomeMotivo: string,
  nomeStatus: string,
  nomeUsuarioAlteracao: string,
  nomeUsuarioCadastro: string,
  observacao: string,
  outrasDespesas: string | null,
  prazoMaximoCotacao: string | Date,
  valorDesconto: number,
  valorFrete: number,
  valorFreteForaNota: number,
  valorSeguro: number,
  vendedor: string
}
