import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from '../services/producto.service';
import { Fabricacion } from '../interfaces/producto';
import { receta } from '../interfaces/receta';
import { SolicitudProduccion } from '../interfaces/prod';

@Injectable({
    providedIn: 'root',
})
export class ProductoController {
    constructor(
        private productoService: ProductoService,
        private snackBar: MatSnackBar
    ) {}

    public getAllProducto(): Promise<Fabricacion[]> {
        return new Promise((resolve, reject) => {
            this.productoService.getAllProductos().subscribe({
                next: (data) => {
                    this.openSnackBar('Productos obtenidos correctamente', '😎👌');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener los productos', '🤯😈');
                    reject(error);
                },
            });
        });
    }

    public getAllProductoA(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.productoService.getAllProductosA().subscribe({
                next: (data) => {
                   console.log(data);
                   
                    resolve(data);
                },
                error: (error) => {
                   
                    reject(error);
                },
            });
        });
    }

    public getProductoById(id: number): Promise<Fabricacion> {
        return new Promise((resolve, reject) => {
            this.productoService.getProductoById(id).subscribe({
                next: (data) => {
                    this.openSnackBar('Producto obtenido correctamente', '😎👌');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener el producto', '🤯😈');
                    reject(error);
                },
            });
        });
    }

    

    public updateProducto(id: number, data: Fabricacion): Promise<void> {
        return new Promise((resolve, reject) => {
            this.productoService.updateProducto(id, data).subscribe({
                next: () => {
                    this.openSnackBar('Producto actualizado correctamente', '😎👌');
                    resolve();
                },
                error: (error) => {
                    this.openSnackBar('Error al actualizar el producto', '🤯😈');
                    reject(error);
                },
            });
        });
    }

    public deleteProducto(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.productoService.deleteProducto(id).subscribe({
                next: () => {
                    this.openSnackBar('Producto eliminado correctamente', '😎👌');
                    resolve();
                },
                error: (error) => {
                    this.openSnackBar('Error al eliminar el producto', '🤯😈');
                    reject(error);
                },
            });
        });
    }


    public getAllRceta(): Promise<receta[]> {
        return new Promise((resolve, reject) => {
            this.productoService.getAllRcetas().subscribe({
                next: (data) => {
                    this.openSnackBar('recetas obtenidos correctamente', '😎👌');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener los recetas', '🤯😈');
                    reject(error);
                },
            });
        });
    }

    public getAllProduccion(): Promise<SolicitudProduccion[]> {
        return new Promise((resolve, reject) => {
            this.productoService.getAllProduccion().subscribe({
                next: (data) => {
                    this.openSnackBar('producciones obtenidos correctamente', '😎👌');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener las producciones', '🤯😈');
                    reject(error);
                },
            });
        });
    }

    public insertReceta(data: receta): Promise<receta> {
        return new Promise((resolve, reject) => {
          this.productoService.insertReceta(data).subscribe({
            next: (response) => {
              this.openSnackBar('Categoría registrada correctamente', '😎👌');
              resolve(response);
            },
            error: (error) => {
              this.openSnackBar('Error al registrar la categoría', '🤯😈');
              reject(error);
            },
          });
        });
      }
    

    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }
}
