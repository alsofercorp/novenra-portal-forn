import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserLoginDto, IUserRegister, IUserRegisterDto } from '../interface/IUserRegister';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authPath: string = `${environment.noventaApi}/Acesso`

  constructor(private http: HttpClient) { }

  passwordValidation(parametro: string): Observable<string> {
    return this.http.get<string>(`${this.authPath}/VerificarSenha?parametro=${parametro}`)
  }

  register(user: IUserRegisterDto): Observable<IUserRegister> {
    return this.http.post<IUserRegister>(`${this.authPath}/CadastroAcesso`, user);
  }

  authenticate(user: IUserLoginDto): Observable<IUserRegister> {
    return this.http.post<IUserRegister>(`${this.authPath}/AutenticarAcesso`, user);
  }
}
