import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-data',
  templateUrl: './confirm-data.component.html',
  styleUrls: ['./confirm-data.component.scss']
})
export class ConfirmDataComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  confirmAndSenEmail() {
    this.router.navigate(['auth', 'login'])
  }

}
