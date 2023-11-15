import { Router } from '@angular/router';
import { headerInfoData, peddingCotation, recentlyAct } from './../../../../assets/data/visao-geral';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-general',
  templateUrl: './list-general.component.html',
  styleUrls: ['./list-general.component.scss']
})
export class ListGeneralComponent implements OnInit {
  infoData: any = headerInfoData;
  penddingInfo: any = peddingCotation;
  recentlyActList: any = recentlyAct;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  answerRequest(id: string) {
    this.router.navigate(['app', 'visao-geral', 'responder-solicitacao']);
  }

}
