import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Fabricacion } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-producto',
  templateUrl: './insert-producto.component.html',
  styleUrls: ['./insert-producto.component.scss']
})
export class InsertProductoComponent {

  insertProducto: FormGroup;
  categoriasProteccion: string[] = ['Hogar', 'Empresa', 'Industrial', 'Decorativa']; // Opciones de protección
  
  // Variable para almacenar la imagen seleccionada
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private productoService: ProductoService, private snackBar: MatSnackBar) {
    
    this.insertProducto = this.fb.group({
      categoriaProteccion: ['Hogar'], // Valor predeterminado

      nombre: ['', Validators.required],
      imagen: [null],   // Validar imagen como obligatorio 
      estatus: [1, Validators.required],  // Campo de estatus, 1 como activo por defecto
    });
    
  }


  onSubmit() {
    if (this.insertProducto.valid) {
      const formData = new FormData();
      
      // Agregar campos de texto
      formData.append('NombreProducto', this.insertProducto.get('nombre')?.value);
      formData.append('Estatus', this.insertProducto.get('estatus')?.value.toString()); // Convertir a string si es necesario
      formData.append('Categoria', this.insertProducto.get('categoriaProteccion')?.value);
  
      // Agregar imagen
      if (this.selectedImage) {
        formData.append('imagenProducto', this.selectedImage, this.selectedImage.name); // Asegúrate de enviar el archivo correcto
      }
  
      // Enviar el FormData con el archivo y los otros campos
      this.productoService.insertProducto(formData).subscribe({
        next: (response) => {
         
          this.openSnackBar('Producto registrado correctamente', '😎👌');
          this.router.navigate(['/productos']);
          
        },
        error: (error) => {
          
          this.openSnackBar('Error al registrar el producto', '🤯😈');
          console.error(error);
        },
      });
    }
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file;

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
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
