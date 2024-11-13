import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-categoria',
  templateUrl: './insert-categoria.component.html',
  styleUrls: ['./insert-categoria.component.scss']
})
export class InsertCategoriaComponent {
  insertCategoriaForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.insertCategoriaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.insertCategoriaForm.valid) {
      const categoria = {
        nombre: this.insertCategoriaForm.value.nombre,
        status: 1 // Estatus en 1 (Activo) por defecto
      };

      // Recuperar las categorías almacenadas en localStorage (si existen)
      const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');

      // Añadir la nueva categoría al array de categorías
      categorias.push(categoria);

      // Guardar el array actualizado de categorías en localStorage
      localStorage.setItem('categorias', JSON.stringify(categorias));

      this.openSnackBar('Categoría registrada con éxito', 'Aceptar');
      this.router.navigate(['/categorias']);
    }
  }

  public cancelar(): void {
    this.router.navigate(['/categorias']);
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}
