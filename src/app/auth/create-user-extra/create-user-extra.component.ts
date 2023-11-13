import { HttpErrorResponse } from '@angular/common/http';
import { IViaCep } from './../../interface/IViaCep';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user-extra',
  templateUrl: './create-user-extra.component.html',
  styleUrls: ['./create-user-extra.component.scss'],
})
export class CreateUserExtraComponent implements OnInit {

  complementationDataForm: FormGroup = new FormGroup({
    cnpj: new FormControl('', []),
    razaoSocial: new FormControl('', []),
    cep: new FormControl('', []),
    logradouro: new FormControl('', []),
    numero: new FormControl('', []),
    complemento: new FormControl('', []),
    cidade: new FormControl('', []),
    uf: new FormControl('', []),
  });

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.complementationDataForm.get('logradouro')?.disable();
    this.complementationDataForm.get('complemento')?.disable();
    this.complementationDataForm.get('cidade')?.disable();
    this.complementationDataForm.get('uf')?.disable();
  }

  createAccount() {
    this.router.navigate(['auth', 'login'])
  }

  onCepChange() {
    const cep: string = this.complementationDataForm.get('cep')?.value;
    this.commonService
      .getAddressByCep(cep)
      .subscribe((address: IViaCep) => {
        this.complementationDataForm.patchValue({
          logradouro: address.logradouro,
          complemento: address.complemento,
          cidade: address.localidade,
          uf: address.uf
        });
      }, (err: HttpErrorResponse) => {
        this.complementationDataForm.get('logradouro')?.enable();
        this.complementationDataForm.get('complemento')?.enable();
        this.complementationDataForm.get('cidade')?.enable();
        this.complementationDataForm.get('uf')?.enable();
      });
  }

}
