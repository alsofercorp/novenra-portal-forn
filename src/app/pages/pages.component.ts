import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ILinkClass, LinkClass } from '../interface/ILinkClass';
import { AuthService } from '../services/auth.service';
import { IUserRegister } from '../interface/IUserRegister';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;
  linkClass: any = new LinkClass;
  userInfo: IUserRegister = {} as IUserRegister;

  constructor(private commonService: CommonService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.commonService.isSelectedLink.subscribe((hasClass: any) => {
      this.linkClass = new LinkClass;

      this.linkClass[hasClass.route] = hasClass.class

      this.authService.userInfo.subscribe((user: IUserRegister) => {
        this.userInfo = user;
      });

      const storage = localStorage.getItem('userData');

      if (storage) {
        const userDt: IUserRegister = JSON.parse(storage);

        this.authService.userInfo.emit(userDt);
      }
    });

    this.router.events.subscribe((route: any) => {
      this.commonService.isRouteActive(route.url);
    });
  }
}
