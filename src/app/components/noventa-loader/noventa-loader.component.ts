import { Component, Input, OnInit, Output } from '@angular/core';
import { NoventaLoaderService } from './noventa-loader.service';

@Component({
  selector: 'noventa-loader',
  templateUrl: './noventa-loader.component.html',
  styleUrls: ['./noventa-loader.component.scss']
})
export class NoventaLoaderComponent implements OnInit {
  loaderMsg: string = '';

  constructor(private service: NoventaLoaderService) { }

  ngOnInit(): void {
    this.service.loadMessage
      .subscribe((msg: string) => {
        this.loaderMsg = msg;
      });
  }
}
