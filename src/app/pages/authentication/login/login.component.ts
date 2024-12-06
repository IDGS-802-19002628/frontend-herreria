import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: AuthService
  ) {
    this.loginForm = this.fb.group({
      Correo: ['', [Validators.required, Validators.email]],
      Contrasenia: ['', Validators.required],
    });
  }

  public login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.loginService.singIn(loginData).subscribe({
        next: (response: LoginResponse) => {
          console.log('Inicio de sesión exitoso', response);

          // Guarda los datos del usuario en LocalStorage
          localStorage.setItem('usuario', JSON.stringify(response));
          
          

          // Redirigir según el rol
          const rol = response.rol;
          if (rol === 'administrador') {
            this.router.navigate(['/dashboard']);
          } else if (rol === 'cliente') {
            this.router.navigate(['/authentication/lading']);
          } else {
            console.error('Rol no válido');
            alert('Rol desconocido');
          }
        },
        error: (err) => {
          console.error('Error en el inicio de sesión', err);
          alert('Usuario o contraseña incorrectos');
        },
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/authentication/login']);
  }
}
