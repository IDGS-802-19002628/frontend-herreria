import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-producto',
  templateUrl: './insert-producto.component.html',
  styleUrls: ['./insert-producto.component.scss']
})
export class InsertProductoComponent {

  form: FormGroup;
  
  // Variable para almacenar la imagen seleccionada
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      imagen: [null],   // Validar imagen como obligatorio
      produccion_id: ['', Validators.required],  // Capturar el ID de Producción
      cantidad: [0, [Validators.required, Validators.min(1)]],  // Campo cantidad
      precio: [0, [Validators.required, Validators.min(0)]],  // Campo precio
      lote: ['', Validators.required],  // Campo lote
      estatus: [1, Validators.required],  // Campo de estatus, 1 como activo por defecto
    });
    
  }

  // Método para registrar el producto
  registrarProducto(): void {
    console.log(this.form.valid); // Verifica si el formulario es válido
    if (this.form.valid) {
      const newProduct = {
        id: this.generateId(),
        nombre: this.form.value.nombre,
        imagen: this.selectedImage, // Almacenar la imagen seleccionada
        produccion_id: this.form.value.produccion_id, // Capturar el ID de producción
        cantidad: this.form.value.cantidad, // Capturar la cantidad
        precio: this.form.value.precio, // Capturar el precio
        lote: this.form.value.lote, // Capturar el lote
        estatus: this.form.value.estatus, // Capturar el estatus (1 = activo, 2 = inactivo)
        fechaCreacion: new Date(),
        fabricacion_id: 1,  // Asumiendo que tienes un ID de fabricación
        nivelMinimoStock: 10
      };

      // Guardar el producto en LocalStorage
      let productos = JSON.parse(localStorage.getItem('productos') || '[]');
      productos.push(newProduct);
      localStorage.setItem('productos', JSON.stringify(productos));

      // Limpiar el formulario
      this.form.reset();
      this.selectedImage = null; // Limpiar la imagen seleccionada
      this.router.navigate([`/productos`]);  // Redirigir a la página de productos
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para generar un ID único para el producto
  private generateId(): number {
    return Date.now(); // Generar un ID único basado en la fecha y hora
  }

  // Método para manejar la selección de imagen
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file; // Guardar la imagen seleccionada
    }
  }
}
