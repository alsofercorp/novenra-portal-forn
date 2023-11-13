import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nextStep() {
    this.router.navigate(['criar-usuario', 'dados-complementares']);
  }


}
