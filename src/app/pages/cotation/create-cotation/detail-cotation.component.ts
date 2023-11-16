import { answerDataList } from './../../../../assets/data/answerData';
import { IAnswerRequest } from './../../../interface/IAnswerRequest';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-cotation',
  templateUrl: './detail-cotation.component.html',
  styleUrls: ['./detail-cotation.component.scss']
})
export class DetailCotationComponent implements OnInit {
  detailData: IAnswerRequest[] = answerDataList;

  constructor() { }

  ngOnInit(): void {
  }

}
