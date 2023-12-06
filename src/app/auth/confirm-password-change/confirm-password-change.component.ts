import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-password-change',
  templateUrl: './confirm-password-change.component.html',
  styleUrls: ['./confirm-password-change.component.scss']
})
export class ConfirmPasswordChangeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPortal() {
    this.router.navigate(['auth', 'login']);
  }

}
