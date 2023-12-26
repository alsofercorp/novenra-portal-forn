import { CommonService } from './../../../services/common.service';
import { ICotationById } from './../../../interface/ICotation';
import { CotationService } from './../../../services/cotation.service';
import Swal from 'sweetalert2';
import { answerDataList } from './../../../../assets/data/answerData';
import { IAnswerRequest } from './../../../interface/IAnswerRequest';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-answer',
  templateUrl: './request-answer.component.html',
  styleUrls: ['./request-answer.component.scss']
})
export class RequestAnswerComponent implements OnInit {
  answerData: IAnswerRequest[] = answerDataList;
  cotation: ICotationById = {} as ICotationById;
  value: number = 0;
  formDelivery: FormGroup = new FormGroup({
    nomeVendedor: new FormControl('', [Validators.required]),
    dataEntrega: new FormControl('', [Validators.required]),
    formaPagamento: new FormControl('', [Validators.required]),
    tipoFrete: new FormControl('', [Validators.required]),
    valorFrete: new FormControl('', [Validators.required]),
    freteForaNota: new FormControl('', [Validators.required]),
    seguro: new FormControl('', [Validators.required]),
    desconto: new FormControl('', [Validators.required]),
    outrasDespesas: new FormControl('', [Validators.required]),
    observacao: new FormControl('', [])
  });

  constructor(private service: CotationService, private route: ActivatedRoute, private commonService: CommonService, private loaderService: NoventaLoaderService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: any) => {
        if (params.id) {
          this.getRequestById(params.id);
        }
      });


  }

  sentRequest() {
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

  getRequestById(id: string) {
    this.loaderService.show();

    this.service.getCotationById(id)
      .subscribe({
        next: (cotation: ICotationById) => {
          this.cotation = cotation;
          this.loaderService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error);
          this.loaderService.hidde();
        }
      })
  }
}
