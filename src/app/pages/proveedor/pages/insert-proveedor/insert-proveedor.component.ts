import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Proveedor } from '../../interfaces/proveedor';

@Component({
  selector: 'app-insert-proveedor',
  templateUrl: './insert-proveedor.component.html',
  styleUrls: ['./insert-proveedor.component.scss']
})
export class InsertProveedorComponent {

  insertProveedorForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.insertProveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      direccion: [''],
      status: [1]
    });
  }

  onSubmit() {
    if (this.insertProveedorForm.valid) {
      const nuevoProveedor: Proveedor = this.insertProveedorForm.value;

      // Obtener proveedores guardados en localStorage
      const proveedoresGuardados = JSON.parse(localStorage.getItem('proveedores') || '[]');

      // Agregar el nuevo proveedor a la lista
      proveedoresGuardados.push(nuevoProveedor);

      // Guardar la lista actualizada en localStorage
      localStorage.setItem('proveedores', JSON.stringify(proveedoresGuardados));

      this.openSnackBar('Proveedor registrado exitosamente', 'Cerrar');
      this.router.navigate(['/proveedores']);
    } else {
      this.openSnackBar('Por favor completa todos los campos requeridos', 'Cerrar');
    }
  }

  cancelar(): void {
    this.router.navigate(['/proveedores']);
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}
