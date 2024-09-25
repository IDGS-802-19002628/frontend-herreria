import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  productosAgrupados: { producto: Producto, cantidad: number }[] = [];

  constructor(
    public dialogRef: MatDialogRef<CarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public carrito: any[],
    private ProductoService: ProductoService,
  ) {
    this.agruparProductos();
  }

  private agruparProductos(): void {
    const mapaProductos = new Map<string, { producto: Producto, cantidad: number }>();
  
    for (const producto of this.carrito) {
      if (mapaProductos.has(producto.nombre)) {
        mapaProductos.get(producto.nombre)!.cantidad++;
      } else {
        mapaProductos.set(producto.nombre, { producto, cantidad: 1 });
      }
    }
  
    this.productosAgrupados = Array.from(mapaProductos.values());
  }
  

  public incrementarCantidad(index: number): void {
    this.productosAgrupados[index].cantidad++;
    this.actualizarCarrito();
  }

  public decrementarCantidad(index: number): void {
    if (this.productosAgrupados[index].cantidad > 1) {
      this.productosAgrupados[index].cantidad--;
      this.actualizarCarrito();
    }
  }

  public eliminarProducto(producto: Producto): void {
    // Encuentra el índice del producto a eliminar en el carrito original
    const index = this.carrito.findIndex(p => p.nombre === producto.nombre);
  
    // Si el producto existe en el carrito
    if (index > -1) {
      // Elimina un producto del carrito
      this.carrito.splice(index, 1);
    }
  
    // Actualiza los productos agrupados
    this.agruparProductos();
    
    // Si la cantidad del producto en la agrupación llega a cero, lo quitamos de la lista agrupada
    this.productosAgrupados = this.productosAgrupados.filter(p => p.cantidad > 0);
  
    // Actualiza el contador del carrito (si es necesario)
    this.actualizarContadorCarrito();
  }
  
  
  private actualizarContadorCarrito(): void {
    const totalItems = this.carrito.length;
    // Aquí podrías actualizar el contador global del carrito, si es necesario
    // Por ejemplo, podrías emitir un evento o llamar a un servicio
    console.log('Carrito actualizado, total de productos:', totalItems);
  }

  public eliminarTodos(): void {
    // Vacía el carrito
    this.carrito = [];

    // Vuelve a agrupar los productos actualizados
    this.agruparProductos();
  }

  private actualizarCarrito(): void {
    // Vacía el carrito actual
    this.carrito = [];

    // Rellena el carrito con los productos agrupados actualizados
    for (const item of this.productosAgrupados) {
      for (let i = 0; i < item.cantidad; i++) {
        this.carrito.push(item.producto);
      }
    }

    // Actualiza los productos agrupados
    this.agruparProductos();
  }

  public comprar(): void {
    // Aquí puedes realizar la lógica de compra
    // Por ejemplo, llamar a un servicio para procesar el pedido
    this.procesarCompra();
  
    // Cerrar el diálogo después de completar la compra
    this.dialogRef.close();
  }
  
  private procesarCompra(): void {
    for (const item of this.productosAgrupados) {
      for (let i = 0; i < item.cantidad; i++) {
        const productoActualizado: Partial<Producto> = {
        idProducto: item.producto.idProducto, // Asegúrate de tener el ID
        nombre: item.producto.nombre,
        descripcion: item.producto.descripcion,
        precio: item.producto.precio,
        rutaImagen: item.producto.rutaImagen,
        stock:item.producto.stock ? item.producto.stock - 1 : 0,
        idCategoria: item.producto.idCategoria,
        status: 1 // Actualiza el status según sea necesario
          
        };
  
        this.ProductoService.actualizarProductoParcial(item.producto.idProducto!, productoActualizado)
          .subscribe({
            next: () => console.log(`Producto ${item.producto.idProducto} actualizado.`),
            error: err => console.error(`Error al actualizar el producto ${item.producto.idProducto}:`, err)
          });
      }
    }
  
    console.log("Procesamiento de compra completado.");
  }
  
  

  
}
