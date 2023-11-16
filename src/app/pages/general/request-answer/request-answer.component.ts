import Swal from 'sweetalert2';
import { answerDataList } from './../../../../assets/data/answerData';
import { IAnswerRequest } from './../../../interface/IAnswerRequest';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-answer',
  templateUrl: './request-answer.component.html',
  styleUrls: ['./request-answer.component.scss']
})
export class RequestAnswerComponent implements OnInit {
  answerData: IAnswerRequest[] = answerDataList;

  value: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  discountCalc(input: IAnswerRequest): number {
    const totalValue: number = input.requestedQtty * input.unityValue;
    input.ipiValue = totalValue * (input.ipiPercent);
    const icms: number = totalValue * input.icmsPercent;
    const discount: number = (totalValue + input.ipiValue + icms) * input.discount;

    return (totalValue + input.ipiValue + icms) - discount;
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

}
