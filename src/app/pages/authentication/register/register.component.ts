import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  registerForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      num_ex: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  
  
  

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
  
}
