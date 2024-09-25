import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Proveedor } from '../../interfaces/proveedor';

@Component({
  selector: 'app-insert-proveedor',
  templateUrl: './insert-proveedor.component.html',
  styleUrls: ['./insert-proveedor.component.scss']
})
export class InsertProveedorComponent {

  insertProveedorForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private proveedorService: ProveedorService,
              private snackBar: MatSnackBar) {
    this.insertProveedorForm = this.fb.group({
      
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Validación para solo números
      email: ['', [Validators.required, Validators.email]],
      direccion: ['']
    });
  }
  onSubmit() {
    
  }
  
  public cancelar(): void {
 
    this.router.navigate(['/proveedores']);
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}
