import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isRouteActive(route: string): string {
    const isActive = this.router.isActive(route, true);
    return isActive ? 'ant-menu-item ant-menu-item-selected' : '';
  }

}
