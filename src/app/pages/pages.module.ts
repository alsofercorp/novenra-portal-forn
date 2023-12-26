import { NoventaLoaderModule } from './../components/noventa-loader/noventa-loader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { CotationComponent } from './cotation/cotation.component';
import { DetailCotationComponent } from './cotation/detail-cotation/detail-cotation.component';
import { RequestAnswerComponent } from './general/request-answer/request-answer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SimplebarAngularModule } from 'simplebar-angular';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ListCotationComponent } from './cotation/list-cotation/list-cotation.component';
import { ListGeneralComponent } from './general/list-general/list-general.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderDetailComponent } from './purchase-order/purchase-order-detail/purchase-order-detail.component';
import { PurchaseOrderListComponent } from './purchase-order/purchase-order-list/purchase-order-list.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NgxMaskModule } from 'ngx-mask';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [
    PagesComponent,
    GeneralComponent,
    CotationComponent,
    DetailCotationComponent,
    RequestAnswerComponent,
    ListCotationComponent,
    ListGeneralComponent,
    PurchaseOrderComponent,
    PurchaseOrderDetailComponent,
    PurchaseOrderListComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconsProviderModule,
    NoventaLoaderModule,
    NgxMaskModule.forRoot(),
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzDividerModule,
    NzBadgeModule,
    NzTagModule,
    NzDropDownModule,
    NzRadioModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzTableModule,
    SimplebarAngularModule,
    NzBreadCrumbModule,
    NzCheckboxModule,
    NzStepsModule,
    NzEmptyModule,
    NzToolTipModule
  ],
  exports: [],
})
export class PagesModule { }
