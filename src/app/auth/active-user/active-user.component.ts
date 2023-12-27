import { CommonService } from './../../services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoventaLoaderService } from 'src/app/components/noventa-loader/noventa-loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.scss']
})
export class ActiveUserComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private service: AuthService, private loaderService: NoventaLoaderService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: any) => {
        this.tryActiveUser(params.id);
      });
  }

  goToPortal() {
    this.router.navigate(['auth', 'login']);
  }

  tryActiveUser(userId: string) {
    this.loaderService.show('Estamos ativando seu usuário, por favor, aguarde!');
    
    this.service
      .activeUser(userId)
      .subscribe({
        next: () => {
          this.loaderService.hidde();
        },
        error: (err: HttpErrorResponse) => {
          this.loaderService.hidde();
          this.router.navigate(['auth', 'login']);

          this.commonService.ToastError(err.error.msg);
        }
      })
  }

}
