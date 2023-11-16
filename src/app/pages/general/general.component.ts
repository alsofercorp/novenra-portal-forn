import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.isRouteActive('/app/visao-geral');
  }

}
