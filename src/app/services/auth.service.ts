import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse } from '../interfaces/login';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, throwError } from 'rxjs';
import { PermisosResponse } from '../interfaces/permisos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private ENDPOIN_VALIDATE = environment.ENDPOINT_VALIDATES;
  private URL_LOGIN = `${environment.ENDPOINT_SOLDALINE}api/Usuario/Login`;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

 

  public singIn(data: LoginResponse): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.URL_LOGIN}`, data)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

 

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }



  public validarPermisos($data: any) : Observable<PermisosResponse> {
    return this.http
      .post<PermisosResponse>(`${this.ENDPOIN_VALIDATE}validarPermisos`, $data)
      .pipe(catchError((err) => throwError(() => err)));
  }

  //getPermisosUsuario
  public getPermisosUsuario() : Observable<any[]> {
    return this.http
      .get<any[]>(`${this.ENDPOIN_VALIDATE}getPermisosUsuario`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}

