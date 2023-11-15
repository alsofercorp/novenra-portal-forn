import { cotationData } from './../../../../assets/data/cotationData';
import { NzI18nService, pt_BR } from 'ng-zorro-antd/i18n';
import { ISelectionItems } from './../../../interface/ISelectionItems';
import { ICotationModel } from './../../../interface/ICotation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cotation',
  templateUrl: './list-cotation.component.html',
  styleUrls: ['./list-cotation.component.scss']
})
export class ListCotationComponent implements OnInit {
  cotationData: ICotationModel[] = cotationData;
  statusList: ISelectionItems[] = [
    { name: 'Pendente', value: 'p' },
    { name: 'Enviada', value: 'e' },
    { name: 'Aprovada', value: 'a' },
    { name: 'Não Aprovada', value: 'na' },
  ];

  reasonList: ISelectionItems[] = [
    { name: 'Estoque', value: 'e' },
    { name: 'Utilização imediata', value: 'ui' },
  ];

  status: any[] = [];
  reason: any[] = [];

  constructor(private i18p: NzI18nService) {
    this.i18p.setLocale(pt_BR);
  }

  ngOnInit(): void {

  }

}
