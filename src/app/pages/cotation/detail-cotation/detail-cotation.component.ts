import { IState } from './../../../interface/IState';
import { StateService } from './../../../services/state.service';
import { ICotationById } from './../../../interface/ICotation';
import { CommonService } from './../../../services/common.service';
import { CotationService } from './../../../services/cotation.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';
import { ActivatedRoute } from '@angular/router';
import { IUserData } from 'src/app/interface/IUserRegister';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detail-cotation',
  templateUrl: './detail-cotation.component.html',
  styleUrls: ['./detail-cotation.component.scss']
})
export class DetailCotationComponent implements OnInit {
  cotationDetail: ICotationById = {} as ICotationById;
  userData: IUserData = {} as IUserData;
  stateName: string = '';

  constructor(private service: CotationService, private commonService: CommonService, private loaderService: NoventaLoaderService, private route: ActivatedRoute, private stateService: StateService) { }

  ngOnInit(): void {
    this.userData = this.commonService.getUserInfo();

    this.route.params
      .subscribe((params: any) => {
        if (params.id) {
          this.getCotation(params.id);
        }
      });
  }

  getCotation(id: string) {
    this.loaderService.show();

    this.stateService
      .getStates()
      .pipe(switchMap((states: IState[]) => {
        const state = states.find((stt: IState) => stt.id === this.userData.supplier.idEstado);

        if (state) {
          this.stateName = state.siglaEstado;
        }

        return this.service.getCotationById(id)
      }))
      .subscribe({
        next: (cotation: ICotationById) => {
          this.cotationDetail = cotation;
          this.loaderService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          this.loaderService.hidde();
          this.commonService.ToastError(err.error.msg);
        }
      })
  }
}
