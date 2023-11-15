import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { RequestAnswerComponent } from './general/request-answer/request-answer.component';
import { CotationComponent } from './cotation/cotation.component';
import { PagesComponent } from './pages.component';
import { ListCotationComponent } from './cotation/list-cotation/list-cotation.component';
import { CreateCotationComponent } from './cotation/create-cotation/create-cotation.component';
import { ListGeneralComponent } from './general/list-general/list-general.component';

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
            path: 'criar',
            component: CreateCotationComponent,
            title: 'Criar Cotação'
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
