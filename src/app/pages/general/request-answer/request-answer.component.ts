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

}
