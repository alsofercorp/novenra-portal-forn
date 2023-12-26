import { IUserData } from './../../../interface/IUserRegister';
import { IRecentlyActive } from './../../../interface/IRecentlyActive';
import { IWeekFilter, IStatistic } from './../../../interface/IFilter';
import { CommonService } from './../../../services/common.service';
import { IPeddingCotation } from './../../../interface/IPenddingCotation';
import { DashboardService } from './../../../services/dashboard.service';
import { DashboardWeek } from './../../../../assets/Enum/dashboardWeekSelection';
import { Router } from '@angular/router';
import { headerInfoData, peddingCotation, recentlyAct } from './../../../../assets/data/visao-geral';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { IUserRegister } from 'src/app/interface/IUserRegister';
import { HttpErrorResponse } from '@angular/common/http';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';

@Component({
  selector: 'app-list-general',
  templateUrl: './list-general.component.html',
  styleUrls: ['./list-general.component.scss']
})
export class ListGeneralComponent implements OnInit {
  weekDashboardSelection: any = DashboardWeek;
  userData: IUserData = {} as IUserData;
  selectedRadioWeek: string = '1';
  
  weekSelected: number = DashboardWeek.UltimaSemana;

  infoData: IStatistic = {} as IStatistic;
  penddingInfo: IPeddingCotation[] = [];
  recentlyActList: IRecentlyActive[] = [];

  PaddingPage: number = 1
  CurrentlyPage: number = 1

  totalPaddingItens: number = 0;
  totalCurrentlyItens: number = 0;

  constructor(private router: Router, private service: DashboardService, private loaderService: NoventaLoaderService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.userData = this.commonService.getUserInfo();

    this.getWeekDashboard();
  }

  answerRequest(id: number) {
    this.router.navigate(['app', 'visao-geral', 'responder-solicitacao', id]);
  }

  getAction(action: string) {
    const act: any = action.split(' ');
    const actText: string = act[act.length - 1];

    return actText.toLocaleLowerCase();
  }

  getPeddingNextPage(pageNumber: number) {
    this.PaddingPage = pageNumber;
    this.getWeekDashboard();
  }

  getCurrentlyNextPage(pageNumber: number) {
    this.CurrentlyPage = pageNumber;
    this.getWeekDashboard();
  }

  selectWeek(week: number) {
    this.weekSelected = week;
    this.PaddingPage = 1;
    this.CurrentlyPage = 1;
    this.getWeekDashboard();
  }

  getWeekDashboard() {
    this.loaderService.show();

    this.service.getDashboardByWeek(this.userData.user.id, this.weekSelected, this.PaddingPage, this.CurrentlyPage)
      .subscribe({
        next: (filter: IWeekFilter) => {
          this.penddingInfo = filter.pending;
          this.recentlyActList = filter.recently;
          this.infoData = filter.statistic;

          this.totalPaddingItens = filter.totalPendingCotationPage;
          this.totalCurrentlyItens = filter.totalRecentlyCotationPage;

          this.loaderService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          this.commonService.ToastError(err.error);
          this.loaderService.hidde();
        },
      });
  }

}
