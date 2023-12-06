import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  forgottenForm: FormGroup = new FormGroup({
    cnpj: new FormControl('', [Validators.required]),
  });


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  requestPasswordNewKey() {
    this.router.navigate(['esqueci-minha-senha', 'confirmar-dados'])
  }

}
