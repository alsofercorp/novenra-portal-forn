import { cotationData } from './../../../assets/data/cotationData';
import { ISelectionItems } from '../../interface/ISelectionItems';
import { Component, OnInit } from '@angular/core';
import { pt_BR, NzI18nService } from 'ng-zorro-antd/i18n';
import { ICotationModel } from 'src/app/interface/ICotation';

@Component({
  selector: 'app-cotation',
  templateUrl: './cotation.component.html',
  styleUrls: ['./cotation.component.scss']
})
export class CotationComponent implements OnInit {

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
