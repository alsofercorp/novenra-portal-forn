import { IPaymentCondition } from './../../../interface/IPaymentCondition';
import { PaymentConditionService } from './../../../services/payment-condition.service';
import { IPortage } from './../../../interface/IPortage';
import { PortageService } from './../../../services/portage.service';
import { CommonService } from './../../../services/common.service';
import { ICotationById, ICotationDraf, IMaterial } from './../../../interface/ICotation';
import { CotationService } from './../../../services/cotation.service';
import Swal from 'sweetalert2';
import { answerDataList } from './../../../../assets/data/answerData';
import { IAnswerRequest } from './../../../interface/IAnswerRequest';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-request-answer',
  templateUrl: './request-answer.component.html',
  styleUrls: ['./request-answer.component.scss']
})
export class RequestAnswerComponent implements OnInit {
  answerData: IAnswerRequest[] = answerDataList;
  cotation: ICotationById = {} as ICotationById;
  subscription: EventEmitter<IMaterial[]> = new EventEmitter();

  value: number = 0;

  resumeSubTotalItens: number = 0;

  formMaterial: FormGroup = new FormGroup({
    materials: new FormArray([])
  });

  materialsList: any;

  portageList: IPortage[] = [];
  paymentList: IPaymentCondition[] = [];

  formDelivery: FormGroup = new FormGroup({
    nomeVendedor: new FormControl('', [Validators.required]),
    dataEntrega: new FormControl('', [Validators.required]),
    formaPagamento: new FormControl('', [Validators.required]),
    tipoFrete: new FormControl('', [Validators.required]),
    valorFrete: new FormControl(0, [Validators.required]),
    freteForaNota: new FormControl('', [Validators.required]),
    valorSeguro: new FormControl(0, [Validators.required]),
    valorDesconto: new FormControl(0, [Validators.required]),
    outrasDespesas: new FormControl(0, [Validators.required]),
    observacao: new FormControl('', [])
  });

  constructor(private service: CotationService, private route: ActivatedRoute, private commonService: CommonService,
    private loaderService: NoventaLoaderService, private formBuilder: FormBuilder, private portageService: PortageService,
    private paymentService: PaymentConditionService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: any) => {
        if (params.id) {
          this.getRequestById(params.id);
        }
      });
  }

  sentRequest(materials: any, user: any) {
    debugger
    Swal.fire({
      html: `
      <img src="../../../../assets/img/answer_request.png">
      <h3>Sua cotação foi enviada com sucesso</h3>
      <p>Consulte mais detalhes e acompanhe o status da operação no painel <b>Cotações.</b> Você será notificado caso o solicitante aprove a Ordem de Compra.</p>`,
      customClass: "answerAlert",
      confirmButtonText: "Concluir",
      confirmButtonColor: "#EC7000",
      showCloseButton: true
    });
  }

  saveDraft() {
    this.loaderService.show();

    const input: ICotationDraf = {
      id: this.cotation.cotacao.id,
      fornecedor_Id: this.cotation.cotacao.fornecedor_Id,
      erpCotacao_Id: '',
      motivo_Id: this.cotation.cotacao.motivo_Id,
      cotacaoStatus_Id: this.cotation.cotacao.cotacaoStatus_Id,
      vendedor: this.formDelivery.get('nomeVendedor')?.value,
      dataPostagem: this.cotation.cotacao.dataPostagem,
      condicoesPagamento_Id: this.cotation.cotacao.condicoesPagamento_Id,
      frete_Id: this.cotation.cotacao.frete_Id,
      outrasDespesas: this.formDelivery.get('outrasDespesas')?.value,
      valorFrete: this.formDelivery.get('valorFrete')?.value,
      valorFreteForaNota: this.formDelivery.get('freteForaNota')?.value,
      valorSeguro: this.formDelivery.get('valorSeguro')?.value,
      valorDesconto: this.formDelivery.get('valorDesconto')?.value,
      prazoMaximoCotacao: this.cotation.cotacao.prazoMaximoCotacao,
      dataEntregaDesejavel: this.formDelivery.get('dataEntrega')?.value,
      observacao: this.formDelivery.get('observacao')?.value,
      nomeUsuarioCadastro: this.cotation.cotacao.nomeUsuarioCadastro,
      dataCadastro: this.cotation.cotacao.dataCadastro,
      nomeUsuarioAlteracao: this.cotation.cotacao.nomeUsuarioAlteracao,
      dataAlteracao: this.cotation.cotacao.dataAlteracao,
      guid: this.cotation.cotacao.guid,
      materialCotacao: (this.formMaterial.get('materials') as FormArray).value
    }

    this.service.putSaveDraft(input)
      .subscribe({
        next: () => {
          debugger
          this.loaderService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          debugger
          this.commonService.ToastError(err.error.title);
          this.loaderService.hidde();
        }
      })
  }

  getRequestById(id: string) {
    this.loaderService.show();

    this.portageService.getPortage(id)
      .pipe(switchMap((portages: IPortage[]) => {
        this.portageList = portages;

        return this.paymentService.getPaymentContion(id);
      }))
      .pipe(switchMap((payments: IPaymentCondition[]) => {
        this.paymentList = payments;

        return this.service.getCotationById(id);
      }))
      .subscribe({
        next: (cotation: ICotationById) => {
          this.cotation = cotation;

          this.generateReactiveForm(cotation.material);

          this.loaderService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error);
          this.loaderService.hidde();
        }
      })
  }

  updateMaterial(form: number) {
    // (Subtotal do Item) = (Quantidade Requisitada) x (Preço unitário) - (Valor calculado caso o fornecedor informe algum % de desconto) + (Valor do IPI, caso o item possua valor de IPI e a coluna “Incluso IPI” esteja ativa)
    const formSelected: AbstractControl = (this.formMaterial.get('materials') as FormArray).controls[form];
    let subTotal: number = 0;

    const grossValue: number = (formSelected.get('quantidadeRequisitada')?.value * formSelected.get('precoUnitario')?.value);
    subTotal = grossValue - (grossValue * (formSelected.get('percentualDesconto')?.value / 100));

    if (formSelected.get('ipiIncluso')?.value) {
      const percentIpi: number = (formSelected.get('percentualIpi')?.value / 100);
      const valorComIpi: number = (grossValue * percentIpi);

      formSelected.patchValue({
        valorIpi: valorComIpi
      })

      subTotal = subTotal + valorComIpi;
    }

    subTotal += (grossValue * (formSelected.get('percentualIcms')?.value / 100))

    formSelected.patchValue({
      subTotal: subTotal
    });

    this.resumeCalc();
  }

  resumeCalc() {
    const cotationMap: ICotationById = { ...this.cotation };

    cotationMap.resumoCotacao.subTotalItens = 0;
    cotationMap.resumoCotacao.valorFinalCotacao = 0;

    (this.formMaterial.get('materials') as FormArray).controls.forEach((control: AbstractControl) => {
      cotationMap.resumoCotacao.subTotalItens += control.get('subTotal')?.value;
    });

    cotationMap.resumoCotacao.valorFrete = this.formDelivery.get('valorFrete')?.value;
    cotationMap.resumoCotacao.valorSeguro = this.formDelivery.get('valorSeguro')?.value;
    cotationMap.resumoCotacao.valorDesconto = this.formDelivery.get('valorDesconto')?.value;
    cotationMap.resumoCotacao.outrasDespesas = this.formDelivery.get('outrasDespesas')?.value;

    cotationMap.cotacao.valorFrete = this.formDelivery.get('valorFrete')?.value;
    cotationMap.cotacao.valorSeguro = this.formDelivery.get('valorSeguro')?.value;
    cotationMap.cotacao.valorDesconto = this.formDelivery.get('valorDesconto')?.value;
    cotationMap.cotacao.outrasDespesas = this.formDelivery.get('outrasDespesas')?.value;
    cotationMap.cotacao.valorFreteForaNota = this.formDelivery.get('freteForaNota')?.value;

    const hasPayment: IPaymentCondition | undefined = this.paymentList.find((pl: IPaymentCondition) => pl.id === this.formDelivery.get('formaPagamento')?.value);

    cotationMap.resumoCotacao.formaPagamento = hasPayment ? hasPayment.statusCondicoesPagamento : '';

    cotationMap.resumoCotacao.valorFinalCotacao = (cotationMap.resumoCotacao.subTotalItens + (cotationMap.resumoCotacao.valorFrete - cotationMap.cotacao.valorFreteForaNota) + cotationMap.resumoCotacao.valorSeguro) - cotationMap.resumoCotacao.valorDesconto + cotationMap.resumoCotacao.outrasDespesas

    this.cotation = cotationMap;
  }

  generateReactiveForm(inputArray: IMaterial[]) {
    const arrayControl = <FormArray>this.formMaterial.controls['materials'];
    let newGroup: FormGroup;

    inputArray.forEach((item: IMaterial) => {
      newGroup = this.formBuilder.group({
        ativo: new FormControl(item.ativo, [Validators.required]),
        cotacao_Id: new FormControl(item.cotacao_Id, [Validators.required]),
        descricao: new FormControl(item.descricao, [Validators.required]),
        id: new FormControl(item.id, [Validators.required]),
        ipiIncluso: new FormControl(item.ipiIncluso, [Validators.required]),
        marca: new FormControl(item.marca, [Validators.required]),
        material_Id: new FormControl(item.cotacao_Id, [Validators.required]),
        nomeFabricante: new FormControl(item.nomeFabricante, [Validators.required]),
        percentualDesconto: new FormControl(item.percentualDesconto, [Validators.required]),
        percentualIcms: new FormControl(item.percentualIcms, [Validators.required]),
        percentualIpi: new FormControl(item.percentualIpi, [Validators.required]),
        prazoEntrega: new FormControl(item.prazoEntrega, [Validators.required]),
        precoUnitario: new FormControl(item.precoUnitario, [Validators.required, Validators.max(9999)]),
        quantidadeRequisitada: new FormControl(item.quantidadeRequisitada, [Validators.required]),
        subTotal: new FormControl(item.subTotal, [Validators.required]),
        valorIpi: new FormControl(item.valorIpi, [Validators.required]),
      });

      arrayControl.push(newGroup);
    });

    (this.formMaterial.get('materials') as FormArray).controls.forEach((control: AbstractControl) => {
      control.get('percentualIpi')?.disable();
      control.get('valorIpi')?.disable();
    });

    this.validatePortage();

    if (!this.cotation.cotacao.cotacaoExpirada) {
      (this.formMaterial.get('materials') as FormArray).controls.forEach((control: AbstractControl) => {
        control.disable();
      });

      this.formDelivery.disable();
    }
  }

  hasShortDescription(form: any): any | null {
    const description: string = form.get('descricao')?.value;
    const shortNumber = 34;

    let shortnes: any = {
      short: null,
      desc: description
    }

    if (description.length > shortNumber) {
      shortnes.short = description.substring(0, shortNumber);
    }

    return shortnes;
  }

  allowIpiPercent(form: number) {
    const hasIpi: Boolean = this.getFormControlValue('ipiIncluso', form);

    if (hasIpi) {
      (this.formMaterial.get('materials') as FormArray).controls[form].get('percentualIpi')?.enable();
    } else {
      (this.formMaterial.get('materials') as FormArray).controls[form].get('percentualIpi')?.disable();
      (this.formMaterial.get('materials') as FormArray).controls[form].patchValue({
        percentualIpi: 0,
        valorIpi: 0
      });
    }

    this.updateMaterial(form);
  }

  validatePortage() {
    if (this.formDelivery.get('tipoFrete')?.value === 1) {
      this.formDelivery.get('valorFrete')?.enable();
      this.formDelivery.get('freteForaNota')?.enable();
    } else {
      this.formDelivery.get('valorFrete')?.disable();
      this.formDelivery.get('freteForaNota')?.disable();

      this.formDelivery.patchValue({
        valorFrete: 0,
        freteForaNota: 0
      })
    }

    this.resumeCalc();
  }

  get getMaterialFormArray() {
    return (this.formMaterial.get('materials') as FormArray).controls;
  }

  getFormControlValue(field: string, form: number): any {
    return (this.formMaterial.get('materials') as FormArray).controls[form].get(field)?.value
  }
}
