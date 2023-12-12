import { Component, OnInit } from '@angular/core';
import { NoventaLoaderService } from '../components/noventa-loader/noventa-loader.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loadService: NoventaLoaderService) { }

  ngOnInit(): void {
    this.loadService.isLoading
      .subscribe({
        next: (loading: boolean) => {
          this.isLoading = loading
        }
      })
  }

}
