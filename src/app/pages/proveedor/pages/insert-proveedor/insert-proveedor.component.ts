import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Proveedor } from '../../interfaces/proveedor';
import { ProveedorService } from '../../services/proveedor.service';

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
    private proveedorService: ProveedorService,
    private snackBar: MatSnackBar
  ) {
    this.insertProveedorForm = this.fb.group({
      nombre: ['', Validators.required],                // Nombre del proveedor
      apellidoP: ['', Validators.required],             // Apellido paterno
      apellidoM: ['', Validators.required],             // Apellido materno
      nombreEmpresa: ['', Validators.required],         // Nombre de la empresa
      nombreContacto: ['', Validators.required],        // Nombre del contacto
      
      telefonoContacto: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Teléfono del contacto
      email: ['', [Validators.required, Validators.email]], // Correo electrónico
      direccion: [''],                                  // Dirección
      status: [1]                                       // Estado
    });
  }

  onSubmit() {
    if (this.insertProveedorForm.valid) {
      const formValues = this.insertProveedorForm.value;

      // Llamar al servicio para crear el nuevo proveedor
      this.proveedorService.insertProveedor(formValues).subscribe({
        next: (response) => {
          
          this.openSnackBar('Hubo un error al crear el proveedor.', 'Cerrar');
          console.error('Error al crear proveedor:');
        },
        error: (error) => {
          this.openSnackBar('Proveedor creado exitosamente.', 'Cerrar');
          this.router.navigate(['/proveedores']); // Redirigir a la lista de proveedores
          
        }
      });
    } else {
      this.openSnackBar('Por favor completa todos los campos requeridos.', 'Cerrar');
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
