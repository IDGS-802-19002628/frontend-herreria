import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    private URL_PRODUCTOS = `${environment.ENDPOINT_DESKART}api/productos`;

    constructor(private http: HttpClient) { }

    // Obtiene todos los productos
    public getAllProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.URL_PRODUCTOS)
            .pipe(catchError(err => throwError(() => err)));
    }

    // Obtiene un producto por ID
    public getProductoById(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.URL_PRODUCTOS}/${id}`)
            .pipe(catchError(err => throwError(() => err)));
    }

    // Inserta un nuevo producto
    public insertProducto(data: Producto): Observable<Producto> {
        return this.http.post<Producto>(this.URL_PRODUCTOS, data)
            .pipe(catchError(err => throwError(() => err)));
    }

    
    // Actualiza un producto existente
    public updateProducto(id: number, data: Producto): Observable<void> {
        return this.http.put<void>(`${this.URL_PRODUCTOS}/${id}`, data)
            .pipe(catchError(err => throwError(() => err)));
    }
  
    public actualizarProductoParcial(id: number, data: Partial<Producto>): Observable<void> {
        return this.http.put<void>(`${this.URL_PRODUCTOS}/${id}`, data)
          .pipe(catchError(err => throwError(() => err)));
      }
      

    // Elimina un producto por ID
    public deleteProducto(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL_PRODUCTOS}/eliminar/${id}`)
            .pipe(catchError(err => throwError(() => err)));
    }
}
