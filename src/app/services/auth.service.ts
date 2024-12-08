import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse } from '../interfaces/login';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { PermisosResponse } from '../interfaces/permisos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private ENDPOIN_VALIDATE = environment.ENDPOINT_VALIDATES;
  private URL_LOGIN = `${environment.ENDPOINT_SOLDALINE}api/Usuario/Login`;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public singIn(data: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.URL_LOGIN}`, data)
      .pipe(
        // Cuando la respuesta es exitosa, guardamos los datos
        tap((response: LoginResponse) => {
          localStorage.setItem('token', 'valor_de_token'); // Guárdalo en localStorage si es necesario
          localStorage.setItem('usuario', JSON.stringify(response)); // Guarda toda la info del usuario
        }),
        catchError(err => throwError(() => err)) // Manejo de errores
      );
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
  }

  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    return user.rol || '';  // Asegúrate de que el objeto tenga el rol
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

