import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ILinkClass, LinkClass } from '../interface/ILinkClass';
import { AuthService } from '../services/auth.service';
import { IUserRegister } from '../interface/IUserRegister';
import { NoventaLoaderService } from '../components/noventa-loader/noventa-loader.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;
  linkClass: any = new LinkClass;
  userInfo: IUserRegister = {
    nome: '',
    ativo: false,
    email: '',
    id: 0
  } as IUserRegister;

  isLoading: boolean = false;

  constructor(private commonService: CommonService, private router: Router, private authService: AuthService, private loadService: NoventaLoaderService) { }

  ngOnInit(): void {
    this.authService.userInfo
      .subscribe((user: IUserRegister) => {
        this.userInfo = user;
      });

    this.loadService.isLoading
      .subscribe({
        next: (loading: boolean) => {
          this.isLoading = loading
        }
      })

    this.router.events.subscribe((route: any) => {
      this.commonService.isRouteActive(route.url);
    });

    const storage = localStorage.getItem('userData');

    if (storage) {
      const userDt: IUserRegister = JSON.parse(storage);

      this.authService.userInfo.emit(userDt);
    }

    const asd = setInterval(() => {
      this.commonService.isSelectedLink
        .subscribe((hasClass: any) => {
          this.linkClass = new LinkClass;

          this.linkClass[hasClass.route] = hasClass.class
        });

      clearInterval(asd);
    }, 1000)
  }
}
