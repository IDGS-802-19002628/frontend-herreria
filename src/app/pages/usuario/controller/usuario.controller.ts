import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../services/usuario.service';
import { usuarioE } from '../interfaces/usuario_empleado';

@Injectable({
  providedIn: 'root',
})
export class UsuarioController {

  constructor(
    private usuarioseService: UsuarioService,
    private snackBar: MatSnackBar
  ) {}

  public getAllUsuariosE(): Promise<usuarioE[]> {
    return new Promise((resolve, reject) => {
      this.usuarioseService.getAllUsuariosE().subscribe({

        next: (data) => {
          this.openSnackBar('Empleados obtenidos correctamente', '😎👌');
          resolve(data);
        },
        error: (error) => {
          this.openSnackBar('Error al obtener los empleados', '🤯😈');
          console.log(error);
          
          reject(error);
        },
      });
    });
  }

  public getAllUsuariosC(): Promise<usuarioE[]> {
    return new Promise((resolve, reject) => {
      this.usuarioseService.getAllUsuariosC().subscribe({

        next: (data) => {
          this.openSnackBar('Clientes obtenidos correctamente', '😎👌');
          resolve(data);
        },
        error: (error) => {
          this.openSnackBar('Error al obtener los clientes', '🤯😈');
          console.log(error);
          
          reject(error);
        },
      });
    });
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}