import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ILinkClass, LinkClass } from '../interface/ILinkClass';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;

  linkClass: any = new LinkClass;

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.commonService.isSelectedLink.subscribe((hasClass: any) => {
      this.linkClass = new LinkClass;

      this.linkClass[hasClass.route] = hasClass.class
    });

    this.router.events.subscribe((route: any) => {
      this.commonService.isRouteActive(route.url);
    });
  }
}
