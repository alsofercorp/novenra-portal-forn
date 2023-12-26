import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { RequestAnswerComponent } from './general/request-answer/request-answer.component';
import { CotationComponent } from './cotation/cotation.component';
import { PagesComponent } from './pages.component';
import { ListCotationComponent } from './cotation/list-cotation/list-cotation.component';
import { DetailCotationComponent } from './cotation/detail-cotation/detail-cotation.component';
import { ListGeneralComponent } from './general/list-general/list-general.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderListComponent } from './purchase-order/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderDetailComponent } from './purchase-order/purchase-order-detail/purchase-order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'cotacao',
        component: CotationComponent,
        children: [
          {
            path: '',
            component: ListCotationComponent,
            title: 'Cotação'
          },
          {
            path: 'detalhes/:id',
            component: DetailCotationComponent,
            title: 'Detalhes da Cotação'
          }
        ]
      },
      {
        path: 'visao-geral',
        component: GeneralComponent,
        children: [
          {
            path: '',
            component: ListGeneralComponent,
            title: 'Visão Geral',
          },
          {
            path: 'responder-solicitacao/:id',
            component: RequestAnswerComponent,
            title: 'Responder Solicitação'
          }
        ],
      },
      {
        path: 'ordem-de-compra',
        component: PurchaseOrderComponent,
        children: [
          {
            path: '',
            component: PurchaseOrderListComponent,
            title: 'Lista de Ordens de Compra',
          },
          {
            path: 'detalhes',
            component: PurchaseOrderDetailComponent,
            title: 'Detalhe da Ordem de Compra'
          }
        ],
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'visao-geral',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
