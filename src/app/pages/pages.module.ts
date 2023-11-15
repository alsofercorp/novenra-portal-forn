import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { CotationComponent } from './cotation/cotation.component';
import { CreateCotationComponent } from './cotation/create-cotation/create-cotation.component';
import { RequestAnswerComponent } from './general/request-answer/request-answer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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


@NgModule({
  declarations: [
    PagesComponent,
    GeneralComponent,
    CotationComponent,
    CreateCotationComponent,
    RequestAnswerComponent,
    ListCotationComponent,
    ListGeneralComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
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
  ],
  exports: [],
})
export class PagesModule { }
