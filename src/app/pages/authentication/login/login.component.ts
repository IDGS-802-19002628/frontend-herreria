import { Login } from '../../../interfaces/login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginForm: FormGroup;

  // Definir usuarios con roles predefinidos
  private users = [
    {
      email: 'usuario@ejemplo.com',
      password: 'usuario123',
      role: 'usuario',
    },
    {
      email: 'admin@ejemplo.com',
      password: 'admin123',
      role: 'admin',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicializar el formulario de login
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Contrasenia: ['', Validators.required],
    });
  }

  public login() {
    console.log('Login iniciado');
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      return; // Evita continuar si el formulario es inválido
    }

    const loginData: Login = {
      Email: this.loginForm.value.Email,
      Contrasenia: this.loginForm.value.Contrasenia,
    };

    // Buscar el usuario en la lista predefinida
    const user = this.users.find(
      (u) => u.email === loginData.Email && u.password === loginData.Contrasenia
    );

    if (user) {
      console.log('Usuario autenticado:', user); 

      // Redirigir según el rol del usuario
      if (user.role === 'admin') {
        this.router.navigate(['/dashboard']); // Admin va al dashboard
      } else if (user.role === 'usuario') {
        this.router.navigate(['/authentication/landing']); // Usuario va a landing
      }
    } else {
      console.error('Error: Usuario o contraseña incorrectos');
    }
  }
}
