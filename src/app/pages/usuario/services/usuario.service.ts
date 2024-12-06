import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { usuarioE } from '../interfaces/usuario_empleado';


@Injectable({
  providedIn: 'root'
}) 
export class UsuarioService {

  private URL_USUARIOSE = `${environment.ENDPOINT_SOLDALINE}api/Usuario/empleados/all`;
  private URL_USUARIOSC = `${environment.ENDPOINT_SOLDALINE}api/Usuario/clientes/all`;

  constructor(private http: HttpClient) { }

  public getAllUsuariosE(): Observable<usuarioE[]> {
    return this.http.get<usuarioE[]>(`${this.URL_USUARIOSE}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  public getAllUsuariosC(): Observable<usuarioE[]> {
    return this.http.get<usuarioE[]>(`${this.URL_USUARIOSC}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }
  

}