import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { RequestAnswerComponent } from './general/request-answer/request-answer.component';
import { CotationComponent } from './cotation/cotation.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'cotacao',
        component: CotationComponent,
        title: 'Cotação'
      },
      {
        path: 'visao-geral',
        component: GeneralComponent,
        title: 'Visão Geral',
        children: [
          {
            path: 'responder-solicitacao',
            component: RequestAnswerComponent,
            title: 'Responder Solicitação'
          }
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
