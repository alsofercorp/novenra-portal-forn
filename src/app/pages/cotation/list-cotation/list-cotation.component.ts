import { IUserData } from './../../../interface/IUserRegister';
import { ranges } from './../../../../assets/data/rangeDate';
import { cotationStatusEnum } from './../../../../assets/Enum/cotationStatusEnum';
import { IUserRegister } from 'src/app/interface/IUserRegister';
import { ICotationFilter } from './../../../interface/IFilter';
import { CommonService } from './../../../services/common.service';
import { CotationService } from './../../../services/cotation.service';
import { NzI18nService, pt_BR } from 'ng-zorro-antd/i18n';
import { ISelectionItems } from './../../../interface/ISelectionItems';
import { ICotationModel } from './../../../interface/ICotation';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { IStatus } from '../../../interface/IStatus';
import { IReason } from 'src/app/interface/IReason';
import { HttpErrorResponse } from '@angular/common/http';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cotation',
  templateUrl: './list-cotation.component.html',
  styleUrls: ['./list-cotation.component.scss']
})
export class ListCotationComponent implements OnInit {
  cotationData: ICotationModel[] = [];
  statusList: ISelectionItems[] = [];
  brazilianFormat: string = 'dd/MM/yy'
  range: any = ranges;
  userData: IUserData = {} as IUserData;
  filter: ICotationFilter = {
    idFornecedor: 0,
    motivoId: null,
    statusId: null,
    solicitacao: null,
    dataInicio: null,
    dataTermino: null
  };
  reasonList: ISelectionItems[] = [];

  selectedDate: any = null;

  constructor(private i18p: NzI18nService, private service: CotationService, private commonService: CommonService, private loaderService: NoventaLoaderService, private router: Router) {
    this.i18p.setLocale(pt_BR);
  }

  ngOnInit(): void {
    this.loaderService.show();

    this.userData = this.commonService.getUserInfo();

    this.service.getStatus()
      .pipe(switchMap((status: IStatus[]) => {
        this.statusList = status.map((stt: IStatus) => ({ name: stt.nomeStatus, value: stt.id }));

        return this.service.getReason();
      }))
      .pipe(switchMap((reason: IReason[]) => {
        this.reasonList = reason.map((rea: IReason) => ({ name: rea.nomeMotivo, value: rea.id }));
        
        this.filter.idFornecedor = this.userData.user.id;
        
        return this.service.getCotation(this.filter);
      }))
      .subscribe({
        next: (cotation: ICotationModel[]) => {
          this.cotationData = cotation.map((cot: ICotationModel) => {
            cot.status = this.getStatus(cot.status.toLocaleLowerCase())
            return cot;
          });

          this.loaderService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error);
          this.loaderService.hidde();
        }
      });
  }

  onDateSelected(result: Date[]) {
    this.filter.dataInicio = result[0] ? result[0] : null;
    this.filter.dataTermino = result[1] ? result[1] : null;

    this.getCotationFilter();
  }

  onErase() {
    if (this.filter.statusId !== null && this.filter.statusId.length === 0)  {
      this.filter.statusId = null;
    }

    if (this.filter.motivoId !== null && this.filter.motivoId.length === 0)  {
      this.filter.motivoId = null;
    }

    this.getCotationFilter();
  }

  getCotationFilter() {
    this.loaderService.show();
    this.filter.idFornecedor = this.userData.user.id;

    this.service.getCotation(this.filter)
      .subscribe({
        next: (cotation: ICotationModel[]) => {
          this.cotationData = cotation.map((cot: ICotationModel) => {
            cot.status = this.getStatus(cot.status.toLocaleLowerCase())
            return cot;
          });
          this.loaderService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          debugger
          this.commonService.ToastError(err.error);
          this.loaderService.hidde();
        }
      })
  }

  getCotationDetail(id: string) {
    this.router.navigate(['app', 'cotacao', 'detalhes', id]);
  }

  private getStatus(status: string): any {
    debugger
    switch (status) {
        case cotationStatusEnum.approved:
            return {
                status: 0,
                name: 'Aprovado',
                tag: 'orange'
            }
        case cotationStatusEnum.sented:
            return {
                status: 1,
                name: 'Enviado',
                tag: 'blue'
            }
        case cotationStatusEnum.pending:
            return {
                status: 2,
                name: 'Pendente',
                tag: 'green'
            }
        case cotationStatusEnum.notApproved:
            return {
                status: 3,
                name: 'Não Aprovado',
                tag: 'red'
            }
    }
}

}
