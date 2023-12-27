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
import { ActivatedRoute, Router } from '@angular/router';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { IUserData } from 'src/app/interface/IUserRegister';
import { FormValidations } from 'src/app/validators/form-validations';

@Component({
  selector: 'app-request-answer',
  templateUrl: './request-answer.component.html',
  styleUrls: ['./request-answer.component.scss']
})
export class RequestAnswerComponent implements OnInit {
  formMaterial: FormGroup = new FormGroup({
    materials: new FormArray([])
  });

  formDelivery: FormGroup = new FormGroup({
    nomeVendedor: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    dataEntrega: new FormControl('', [Validators.required, FormValidations.DateValidator('dataEntrega')]),
    formaPagamento: new FormControl('', [Validators.required]),
    tipoFrete: new FormControl('', [Validators.required]),
    valorFrete: new FormControl(0, [Validators.required]),
    freteForaNota: new FormControl('', []),
    valorSeguro: new FormControl(0, []),
    valorDesconto: new FormControl(0, []),
    outrasDespesas: new FormControl(0, []),
    observacao: new FormControl('', [Validators.maxLength(255)])
  });

  answerData: IAnswerRequest[] = answerDataList;
  cotation: ICotationById = {} as ICotationById;
  materialsList: any;
  userData: IUserData = {} as IUserData;

  portageList: IPortage[] = [];
  paymentList: IPaymentCondition[] = [];

  constructor(private service: CotationService, private route: ActivatedRoute, private commonService: CommonService,
    private loaderService: NoventaLoaderService, private formBuilder: FormBuilder, private portageService: PortageService,
    private paymentService: PaymentConditionService, private router: Router) { }

  ngOnInit(): void {
    this.userData = this.commonService.getUserInfo();

    this.route.params
      .subscribe((params: any) => {
        if (params.id) {
          this.getRequestById(params.id);
        }
      });
  }

  sentRequest(materials: any, user: any) {
    if (this.validateFormArrayError()) {
      this.commonService.ToastWarning('Atencao, existem campos obrigatorios a serem preenchidos');
    } else {
      this.loaderService.show();

    const input: ICotationDraf = {
      id: this.cotation.cotacao.id,
      fornecedor_Id: this.cotation.cotacao.fornecedor_Id,
      erpCotacao_Id: this.cotation.cotacao.idCotacao,
      motivo_Id: this.cotation.cotacao.motivo_Id,
      cotacaoStatus_Id: this.cotation.cotacao.cotacaoStatus_Id,
      vendedor: this.formDelivery.get('nomeVendedor')?.value,
      dataPostagem: this.formDelivery.get('dataEntrega')?.value,
      condicoesPagamento_Id: this.formDelivery.get('formaPagamento')?.value,
      frete_Id: this.formDelivery.get('tipoFrete')?.value,
      outrasDespesas: this.formDelivery.get('outrasDespesas')?.value,
      valorFrete: this.formDelivery.get('valorFrete')?.value,
      valorFreteForaNota: this.formDelivery.get('freteForaNota')?.value,
      valorSeguro: this.formDelivery.get('valorSeguro')?.value,
      valorDesconto: this.formDelivery.get('valorDesconto')?.value,
      prazoMaximoCotacao: this.cotation.cotacao.prazoMaximoCotacao,
      dataEntregaDesejavel: this.cotation.cotacao.dataEntregaDesejavel,
      observacao: this.formDelivery.get('observacao')?.value,
      nomeUsuarioCadastro: this.cotation.cotacao.nomeUsuarioCadastro,
      dataCadastro: this.cotation.cotacao.dataCadastro,
      nomeUsuarioAlteracao: this.userData.user.nome,
      dataAlteracao: new Date(),
      guid: this.cotation.cotacao.guid,
      materialCotacao: (this.formMaterial.get('materials') as FormArray).value
    }

    this.service.postUpdateCotation(input)
      .subscribe({
        next: () => {
          this.loaderService.hidde();

          Swal.fire({
            html: `
            <img src="../../../../assets/img/answer_request.png">
            <h3>Sua cotação foi enviada com sucesso</h3>
            <p>Consulte mais detalhes e acompanhe o status da operação no painel <b>Cotações.</b> Você será notificado caso o solicitante aprove a Ordem de Compra.</p>`,
            customClass: "answerAlert",
            confirmButtonText: "Concluir",
            confirmButtonColor: "#EC7000",
            showCloseButton: true,
          }).then((result: any) => {
            this.router.navigate(['app', 'visao-geral']);
          });
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error.msg);
          this.loaderService.hidde();
        }
      });
    }
  }

  saveDraft() {
    this.loaderService.show();

    const input: ICotationDraf = {
      id: this.cotation.cotacao.id,
      fornecedor_Id: this.cotation.cotacao.fornecedor_Id,
      erpCotacao_Id: this.cotation.cotacao.idCotacao,
      motivo_Id: this.cotation.cotacao.motivo_Id,
      cotacaoStatus_Id: this.cotation.cotacao.cotacaoStatus_Id,
      vendedor: this.formDelivery.get('nomeVendedor')?.value,
      dataPostagem: this.formDelivery.get('dataEntrega')?.value,
      condicoesPagamento_Id: this.formDelivery.get('formaPagamento')?.value,
      frete_Id: this.formDelivery.get('tipoFrete')?.value,
      outrasDespesas: this.formDelivery.get('outrasDespesas')?.value,
      valorFrete: this.formDelivery.get('valorFrete')?.value,
      valorFreteForaNota: this.formDelivery.get('freteForaNota')?.value,
      valorSeguro: this.formDelivery.get('valorSeguro')?.value,
      valorDesconto: this.formDelivery.get('valorDesconto')?.value,
      prazoMaximoCotacao: this.cotation.cotacao.prazoMaximoCotacao,
      dataEntregaDesejavel: this.cotation.cotacao.dataEntregaDesejavel,
      observacao: this.formDelivery.get('observacao')?.value,
      nomeUsuarioCadastro: this.cotation.cotacao.nomeUsuarioCadastro,
      dataCadastro: this.cotation.cotacao.dataCadastro,
      nomeUsuarioAlteracao: this.userData.user.nome,
      dataAlteracao: new Date(),
      guid: this.cotation.cotacao.guid,
      materialCotacao: (this.formMaterial.get('materials') as FormArray).value
    }

    this.service.putSaveDraft(input)
      .subscribe({
        next: () => {
          this.commonService.ToastSucess('Rascunho salvo com sucesso!');
          this.loaderService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error.msg);
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

    cotationMap.resumoCotacao.valorFinalCotacao = (cotationMap.resumoCotacao.subTotalItens + cotationMap.resumoCotacao.valorFrete + cotationMap.resumoCotacao.valorSeguro) - cotationMap.resumoCotacao.valorDesconto + cotationMap.resumoCotacao.outrasDespesas

    this.cotation = cotationMap;
  }

  generateReactiveForm(inputArray: IMaterial[]) {
    const arrayControl = <FormArray>this.formMaterial.controls['materials'];
    let newGroup: FormGroup;

    inputArray.forEach((item: IMaterial) => {
      newGroup = this.formBuilder.group({
        ativo: new FormControl(item.ativo, []),
        cotacao_Id: new FormControl(item.cotacao_Id, [Validators.required]),
        descricao: new FormControl(item.descricao, [Validators.required]),
        id: new FormControl(item.id, [Validators.required]),
        ipiIncluso: new FormControl(item.ipiIncluso, []),
        marca: new FormControl(item.marca, [Validators.required, Validators.maxLength(30)]),
        material_Id: new FormControl(item.cotacao_Id, [Validators.required]),
        nomeFabricante: new FormControl(item.nomeFabricante, [Validators.required]),
        percentualDesconto: new FormControl(item.percentualDesconto, [Validators.required, Validators.max(99.99)]),
        percentualIcms: new FormControl(item.percentualIcms, [Validators.required, Validators.max(99.99)]),
        percentualIpi: new FormControl(item.percentualIpi, []),
        prazoEntrega: new FormControl(item.prazoEntrega, [Validators.required, Validators.min(1)]),
        precoUnitario: new FormControl(item.precoUnitario, [Validators.required, Validators.max(999.9999), Validators.min(0.0001)]),
        quantidadeRequisitada: new FormControl(item.quantidadeRequisitada, []),
        subTotal: new FormControl(item.subTotal, []),
        valorIpi: new FormControl(item.valorIpi, []),
      });

      arrayControl.push(newGroup);
    });

    (this.formMaterial.get('materials') as FormArray).controls.forEach((control: AbstractControl) => {
      if (!control.get('ipiIncluso')?.value) {
        control.get('percentualIpi')?.disable();
      }

      control.get('valorIpi')?.disable();
    });

    this.formDelivery.patchValue({
      nomeVendedor: this.cotation.cotacao.vendedor,
      dataEntrega: this.cotation.cotacao.dataPostagem,
      formaPagamento: this.cotation.cotacao.condicoesPagamento_Id,
      tipoFrete: this.cotation.cotacao.frete_Id,
      valorFrete: this.cotation.cotacao.valorFrete,
      freteForaNota: this.cotation.cotacao.valorFreteForaNota,
      valorSeguro: this.cotation.cotacao.valorSeguro,
      valorDesconto: this.cotation.cotacao.valorDesconto,
      outrasDespesas: this.cotation.resumoCotacao.outrasDespesas,
      observacao: this.cotation.cotacao.observacao
    })

    this.validatePortage();

    if (this.cotation.cotacao.cotacaoExpirada) {
      (this.formMaterial.get('materials') as FormArray).controls.forEach((control: AbstractControl) => {
        control.disable();
      });

      this.formDelivery.disable();
    }

    this.resumeCalc();
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

  validateFormArrayError(): boolean {
    ((this.formMaterial.get('materials') as FormArray).controls as FormGroup[]).forEach((form: FormGroup) => {
      let isActive: boolean = false;

      Object.keys(form.controls).forEach((field: any) => {
        if (field === 'ativo') {
          isActive = form.get(field)?.value
        }

        if (isActive) {
          if (field === 'cotacao_Id') {
            form.get(field)?.setValidators([Validators.required])
          }

          if (field === 'descricao') {
            form.get(field)?.setValidators([Validators.required])
          }

          if (field === 'id') {
            form.get(field)?.setValidators([Validators.required])
          }

          if (field === 'marca') {
            form.get(field)?.setValidators([Validators.required, Validators.maxLength(30)])
          }

          if (field === 'material_Id') {
            form.get(field)?.setValidators([Validators.required])
          }

          if (field === 'nomeFabricante') {
            form.get(field)?.setValidators([Validators.required])
          }

          if (field === 'percentualDesconto') {
            form.get(field)?.setValidators([Validators.required, Validators.max(99.99)])
          }

          if (field === 'percentualIcms') {
            form.get(field)?.setValidators([Validators.required, Validators.max(99.99)])
          }

          if (field === 'prazoEntrega') {
            form.get(field)?.setValidators([Validators.required, Validators.min(1)])
          }

          if (field === 'precoUnitario') {
            form.get(field)?.setValidators([Validators.required, Validators.max(999.9999), Validators.min(0.0001)])
          }

          form.get(field)?.updateValueAndValidity();
          form.get(field)?.markAsTouched();
        } else {
          form.get(field)?.clearValidators();
          form.get(field)?.updateValueAndValidity();
        }
      });
    });

    Object.keys(this.formDelivery.controls).forEach((field: any) => {
      this.formDelivery.get(field)?.markAsTouched();
    });

    debugger

    const formMaterial: any = (this.formMaterial.get('materials') as FormArray);

    return ((!this.formDelivery.valid && !formMaterial.valid) || (this.formDelivery.valid && !formMaterial.valid) || (!this.formDelivery.valid && formMaterial.valid));
  }

  getFormControlValue(field: string, form: number): any {
    return (this.formMaterial.get('materials') as FormArray).controls[form].get(field)?.value
  }

  get getMaterialFormArray() {
    return (this.formMaterial.get('materials') as FormArray).controls;
  }
}
