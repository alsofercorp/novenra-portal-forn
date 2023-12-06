import { StateService } from './../../services/state.service';
import { IState } from './../../interface/IState';
import { IUserRegister } from './../../interface/IUserRegister';
import { SupplierService } from './../../services/supplier.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IViaCep } from './../../interface/IViaCep';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISupplier } from 'src/app/interface/ISupplier';
import { of, switchMap } from 'rxjs';
import { ISerpro } from 'src/app/interface/ISerpro';

@Component({
  selector: 'app-create-user-extra',
  templateUrl: './create-user-extra.component.html',
  styleUrls: ['./create-user-extra.component.scss'],
})
export class CreateUserExtraComponent implements OnInit {

  complementationDataForm: FormGroup = new FormGroup({
    id: new FormControl(0, [Validators.required, Validators.min(1)]),
    cpfcnpj: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    logradouro: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    complemento: new FormControl('', []),
    cidade: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required]),
    idEstado: new FormControl(0, []),
    nomeUsuarioCadastro: new FormControl('SYS', []),
    dataCadastro: new FormControl(new Date(), []),
    nomeUsuarioAlteracao: new FormControl('SYS', []),
    dataAlteracao: new FormControl(new Date(), [])
  });

  stateList: IState[] = [];

  constructor(private commonService: CommonService, private router: Router, private supplierService: SupplierService, private stateService: StateService) { }

  ngOnInit(): void {
    const storage: string | null = localStorage.getItem('userInfo');

    if (storage) {
      const userInfo: IUserRegister = JSON.parse(storage);

      if (userInfo.id > 0) {
        this.complementationDataForm.patchValue({
          id: userInfo.id
        });

        this.complementationDataForm.get('logradouro')?.disable();
        this.complementationDataForm.get('cidade')?.disable();
        this.complementationDataForm.get('uf')?.disable();

        this.stateService
          .getStates()
          .subscribe((states: IState[]) => {
            this.stateList = states;
          }, (err: HttpErrorResponse) => {
            this.commonService.ToastError(err.error);
          });
      } else {
        this.router.navigate(['criar-usuario', 'dados-basicos']);
      }
    } else {
      this.router.navigate(['criar-usuario', 'dados-basicos']);
    }
  }

  fillCompanyData() {

    this.commonService
      .getCompanyInfo(this.complementationDataForm.controls['cnpj'].value)
      .pipe(switchMap((companyInfo: ISerpro) => {
        if (companyInfo.status !== "ERROR") {
          const cep: string = companyInfo.cep.replace('.', '').replace('.', '').replace('-', '');

          this.complementationDataForm.patchValue({
            razaoSocial: companyInfo.nome,
            numero: companyInfo.numero,
            complemento: companyInfo.complemento,
            cep: cep
          });

          return this.commonService.getAddressByCep(cep);
        } else {
          this.commonService.ToastWarning('O CNPJ é invalido');

          this.clearForm();

          return of({} as IViaCep);
        }
      }))
      .subscribe((address: IViaCep) => {
        if (address.cep) {
          this.complementationDataForm.patchValue({
            logradouro: address.logradouro,
            cidade: address.localidade,
            uf: address.uf
          });

          this.complementationDataForm.get('logradouro')?.disable();
          this.complementationDataForm.get('cidade')?.disable();
          this.complementationDataForm.get('uf')?.disable();
        } else {
          this.complementationDataForm.get('logradouro')?.enable();
          this.complementationDataForm.get('cidade')?.enable();
          this.complementationDataForm.get('uf')?.enable();
        }
      }, (err: HttpErrorResponse) => {
        this.clearForm();
      });
  }

  createAccount() {
    const storage: string | null = localStorage.getItem('userInfo');

    if (storage) {
      const userInfo: IUserRegister = JSON.parse(storage);

      this.complementationDataForm.patchValue({
        id: userInfo.id
      });

      this.stateList.forEach((state: IState) => {
        if (this.complementationDataForm.get('uf')?.value === state.siglaEstado) {
          this.complementationDataForm.patchValue({
            idEstado: state.id
          });
        }
      });
    }

    const input: ISupplier = this.complementationDataForm.getRawValue();

    this.supplierService
      .registerSupplier(input)
      .subscribe((supplier: ISupplier) => {
        localStorage.removeItem('userInfo');

        this.commonService.ToastSucess('Cadastro Realizado com');
        this.router.navigate(['auth', 'login'])
      }, (err: HttpErrorResponse) => {
        this.commonService.ToastError(err.error);
      });
  }

  onCepChange() {
    const cep: string = this.complementationDataForm.get('cep')?.value;
    this.commonService
      .getAddressByCep(cep)
      .subscribe((address: IViaCep) => {
        if (address.cep) {
          this.complementationDataForm.patchValue({
            logradouro: address.logradouro,
            complemento: address.complemento,
            cidade: address.localidade,
            uf: address.uf
          });

          this.complementationDataForm.get('logradouro')?.disable();
          this.complementationDataForm.get('cidade')?.disable();
          this.complementationDataForm.get('uf')?.disable();
        } else {
          this.complementationDataForm.get('logradouro')?.enable();
          this.complementationDataForm.get('cidade')?.enable();
          this.complementationDataForm.get('uf')?.enable();

          this.commonService.ToastWarning('Atenção: Não conseguimos encontrar o CEP informado, favor preencher manualmente o endereço.');
        }
      }, (err: HttpErrorResponse) => {
        this.complementationDataForm.get('logradouro')?.enable();
        this.complementationDataForm.get('cidade')?.enable();
        this.complementationDataForm.get('uf')?.enable();

        this.commonService.ToastWarning('Atenção: Não conseguimos encontrar o CEP informado, favor preencher manualmente o endereço.');
      });
  }

  countMaskMinLenght(validator: any): number {
    const valueNoMask: string = validator.mask.requiredMask.replace('^[0-9]', '');

    return valueNoMask.length;
  }

  clearForm() {
    this.complementationDataForm.patchValue({
      logradouro: '',
      cidade: '',
      uf: '',
      razaoSocial: '',
      numero: '',
      complemento: '',
      cep: ''
    });
  }
}
