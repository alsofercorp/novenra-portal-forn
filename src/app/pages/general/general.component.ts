import { Router } from '@angular/router';
import { headerInfoData, peddingCotation, recentlyAct } from '../../../assets/data/visao-geral';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
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
