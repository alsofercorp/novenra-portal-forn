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
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';

@Component({
  selector: 'app-create-user-extra',
  templateUrl: './create-user-extra.component.html',
  styleUrls: ['./create-user-extra.component.scss'],
})
export class CreateUserExtraComponent implements OnInit {

  complementationDataForm: FormGroup = new FormGroup({
    id: new FormControl(0, [Validators.required, Validators.min(1)]),
    cnpjCpf: new FormControl('', [Validators.required]),
    inscricaoEstadual: new FormControl('', []),
    telefone: new FormControl('', [Validators.required]),
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

  constructor(private commonService: CommonService, private router: Router, private supplierService: SupplierService, private stateService: StateService, private loadService: NoventaLoaderService) { }

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
        this.router.navigate(['usuario', 'dados-basicos']);
      }
    } else {
      this.router.navigate(['usuario', 'dados-basicos']);
    }
  }

  fillCompanyData() {
    if (this.complementationDataForm.controls['cnpjCpf'].value.length > 11) {
      this.loadService.show();

      this.complementationDataForm.controls['razaoSocial'].enable();
      this.complementationDataForm.controls['inscricaoEstadual'].enable();

      this.commonService
        .getCompanyInfo(this.complementationDataForm.controls['cnpjCpf'].value)
        .pipe(switchMap((companyInfo: ISerpro) => {
          if (companyInfo.status !== "ERROR") {
            const cep: string = companyInfo.cep.replace('.', '').replace('.', '').replace('-', '');

            this.complementationDataForm.patchValue({
              razaoSocial: companyInfo.nome,
              telefone: companyInfo.telefone,
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
        .subscribe({
          next: (address: IViaCep) => {
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

            this.loadService.hidde();
          },
          error: (err: HttpErrorResponse) => {
            this.clearForm();
            this.loadService.hidde();
          }
        });
    } else {
      this.complementationDataForm.patchValue({
        razaoSocial: 'Não se aplica',
        inscricaoEstadual: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        cidade: '',
        uf: '',
        idEstado: 0
      });

      this.complementationDataForm.controls['razaoSocial'].disable();
      this.complementationDataForm.controls['inscricaoEstadual'].disable();
    }
  }

  createAccount() {
    this.loadService.show();

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
      .subscribe({
        next: (supplier: ISupplier) => {
          localStorage.removeItem('userInfo');

          this.commonService.ToastSucess('Cadastro realizado com sucesso');
          this.router.navigate(['auth', 'login']);
          this.loadService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error);
          this.loadService.hidde();
        }
      });
  }

  onCepChange() {
    this.loadService.show('Consultando o CEP, aguarde!');

    const cep: string = this.complementationDataForm.get('cep')?.value;

    this.commonService
      .getAddressByCep(cep)
      .subscribe({
        next: (address: IViaCep) => {
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

          this.loadService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          this.complementationDataForm.get('logradouro')?.enable();
          this.complementationDataForm.get('cidade')?.enable();
          this.complementationDataForm.get('uf')?.enable();

          this.commonService.ToastWarning('Atenção: Não conseguimos encontrar o CEP informado, favor preencher manualmente o endereço.');

          this.loadService.hidde();
        }
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
