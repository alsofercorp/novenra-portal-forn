import { IPurchaseOrder } from './../../../interface/IPurchaseOrder';
import { PurchaseData } from './../../../../assets/data/purchaseData';
import { ISelectionItems } from './../../../interface/ISelectionItems';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {
  
  destinationList: any = [];

  statusList: ISelectionItems[] = [
    { name: 'Pendente', value: 'p' },
    { name: 'Enviada', value: 'e' },
    { name: 'Aprovada', value: 'a' },
    { name: 'Não Aprovada', value: 'na' },
  ];

  status: any = 0;
  destination: any = 0;

  purchaseData: IPurchaseOrder[] = PurchaseData;

  constructor() { }

  ngOnInit(): void {
  }

}
