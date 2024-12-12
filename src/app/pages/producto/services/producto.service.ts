import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Fabricacion } from '../interfaces/producto';
import { Observable, catchError, throwError } from 'rxjs';
import { receta } from '../interfaces/receta';

import { SolicitudProduccion } from '../interfaces/prod';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    private URL_PRODUCTOS = `${environment.ENDPOINT_SOLDALINE}api/Fabricacion/all`;
    private URL_PRODUCTOA = `${environment.ENDPOINT_SOLDALINE}api/Inventario/producto`;
    private URL_CREARPRODUCTOS = `${environment.ENDPOINT_SOLDALINE}api/Fabricacion/register`;
    private URL_RECETAS = `${environment.ENDPOINT_SOLDALINE}api/Receta/all`;
    private URL_CREARRECETAS = `${environment.ENDPOINT_SOLDALINE}api/Receta/create`;
    private URL_PRODUCCION = `${environment.ENDPOINT_SOLDALINE}api/Produccion/getAll`;
    private URL_CREARPRODUCCION = `${environment.ENDPOINT_SOLDALINE}api/Produccion/solicitarProduccion`;
    private URL_INICIARPRODUCCION = `${environment.ENDPOINT_SOLDALINE}api/Produccion/iniciarProduccion`;
    private URL_TERMINARPRODUCCION = `${environment.ENDPOINT_SOLDALINE}api/Produccion/terminarProduccion`;


    constructor(private http: HttpClient) { }

    // Obtiene todos los productos
    public getAllProductos(): Observable<Fabricacion[]> {
        return this.http.get<Fabricacion[]>(this.URL_PRODUCTOS)
            .pipe(catchError(err => throwError(() => err)));
    }
    public getAllProductosA(): Observable<any[]> {
      return this.http.get<any[]>(this.URL_PRODUCTOA)
          .pipe(catchError(err => throwError(() => err)));
  }
    public getAllRcetas(): Observable<receta[]> {
        return this.http.get<receta[]>(this.URL_RECETAS)
            .pipe(catchError(err => throwError(() => err)));
    }
    public getAllProduccion(): Observable<SolicitudProduccion[]> {
      return this.http.get<SolicitudProduccion[]>(this.URL_PRODUCCION)
          .pipe(catchError(err => throwError(() => err)));
  }

   public iniciarProduccion(request: any): Observable<any> {
    return this.http.post(`${this.URL_INICIARPRODUCCION}`, request);
  }
  public terminarProduccion(request: any): Observable<any> {
    return this.http.post(`${this.URL_TERMINARPRODUCCION}`, request);
  }

    // Obtiene un producto por ID
    public getProductoById(id: number): Observable<Fabricacion> {
        return this.http.get<Fabricacion>(`${this.URL_PRODUCTOS}/${id}`)
            .pipe(catchError(err => throwError(() => err)));
    }

    public insertProducto(data: FormData): Observable<any> {
        return this.http.post(this.URL_CREARPRODUCTOS, data)
          .pipe(catchError(err => throwError(() => err)));
      }
      public insertProduccion(data: FormData): Observable<any> {
        return this.http.post(this.URL_CREARPRODUCCION, data)
          .pipe(catchError(err => throwError(() => err)));
      }

      public startProduccion(data: FormData): Observable<any> {
        return this.http.post(this.URL_INICIARPRODUCCION, data)
          .pipe(catchError(err => throwError(() => err)));
      }
    
      public insertReceta(receta: receta): Observable<receta> {
        return this.http.post<receta>(this.URL_CREARRECETAS, receta)  // Cambia a http.post<receta>
          .pipe(
            catchError(err => {
              console.error('Error al crear receta:', err);
              return throwError(() => err);  // Rethrow error
            })
          );
      }
    // Actualiza un producto existente
    public updateProducto(id: number, data: Fabricacion): Observable<void> {
        return this.http.put<void>(`${this.URL_PRODUCTOS}/${id}`, data)
            .pipe(catchError(err => throwError(() => err)));
    }
  
    public actualizarProductoParcial(id: number, data: Partial<Fabricacion>): Observable<void> {
        return this.http.put<void>(`${this.URL_PRODUCTOS}/${id}`, data)
          .pipe(catchError(err => throwError(() => err)));
      }
      

    // Elimina un producto por ID
    public deleteProducto(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL_PRODUCTOS}/eliminar/${id}`)
            .pipe(catchError(err => throwError(() => err)));
    }
}
