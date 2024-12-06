import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../interfaces/proveedor';
import { Observable, catchError, throwError } from 'rxjs';
import { InventarioMateriales } from '../interfaces/material';
import { MaterialDTO } from '../interfaces/materiales';

@Injectable({
  providedIn: 'root'
}) 
export class ProveedorService {

  private URL_PROVEEDORES = `${environment.ENDPOINT_SOLDALINE}api/Proveedor/all`;
  private URL_CREARPROVEEDOR = `${environment.ENDPOINT_SOLDALINE}api/Proveedor/register`;
  private URL_MATERIALESINV = `${environment.ENDPOINT_SOLDALINE}api/InventarioMateriales/all`;
  private URL_MATERIALES = `${environment.ENDPOINT_SOLDALINE}api/InventarioMateriales/material`;
  private URL_MATERIALESInventario = `${environment.ENDPOINT_SOLDALINE}api/InventarioMateriales/register`;

  constructor(private http: HttpClient) { }

  // Obtiene todos los proveedores
  public getAllProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.URL_PROVEEDORES}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }
  public getAllmaterialINV(): Observable<MaterialDTO[]> {
    return this.http.get<MaterialDTO[]>(`${this.URL_MATERIALES}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }
  public getAllMaterialesInv(): Observable<InventarioMateriales[]> {
    return this.http.get<InventarioMateriales[]>(`${this.URL_MATERIALESINV}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  // Inserta un nuevo proveedor
  public insertProveedor(data: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.URL_CREARPROVEEDOR, data)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  public insertMaterialINV(data: InventarioMateriales): Observable<InventarioMateriales> {
    return this.http.post<InventarioMateriales>(this.URL_MATERIALESInventario, data)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  // Obtiene un proveedor por ID
  public getProveedorById(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.URL_PROVEEDORES}/${id}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  // Actualiza un proveedor por ID
  public updateProveedor(id: number, proveedor: Proveedor): Observable<void> {
    return this.http.put<void>(`${this.URL_PROVEEDORES}/${id}`, proveedor)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  // Elimina un proveedor por ID
  public eliminarProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_PROVEEDORES}/eliminar/${id}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

}
