import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Fabricacion } from '../../interfaces/producto';

@Component({
  selector: 'app-insert-prod',
  templateUrl: './insert-prod.component.html',
  styleUrls: ['./insert-prod.component.scss']
})
export class InsertProdComponent {

  insertProduccion: FormGroup;
  public Producto: Fabricacion[] = [];
  public usuarioNombre: string = ''; // Nombre del usuario para mostrar

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) {
    this.insertProduccion = this.fb.group({
      usuarioId: [0, [Validators.required, Validators.min(1)]], // El ID del usuario se enviará al API
      fabricacionId: [0, [Validators.required, Validators.min(1)]],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    this.setUsuarioFromLocalStorage(); // Asignar datos del usuario desde localStorage
    this.getAllProductos(); // Cargar productos al iniciar el componente
  }

  private setUsuarioFromLocalStorage(): void {
    const userData = localStorage.getItem('usuario'); // Obtén el objeto de usuario desde el localStorage
    if (userData) {
      const usuario = JSON.parse(userData); // Convierte el JSON a un objeto
      if (usuario.id && usuario.nombre) {
        this.insertProduccion.patchValue({ usuarioId: usuario.id }); // Asigna el ID al formulario
        this.usuarioNombre = usuario.nombre; // Asigna el nombre al campo visual
      } else {
        console.warn('El usuario en localStorage no tiene un ID o nombre válido.');
      }
    } else {
      console.warn('No se encontró información de usuario en localStorage.');
    }
  }

  onSubmit() {
    if (this.insertProduccion.valid) {
      const formData = this.insertProduccion.value;

      this.productoService.insertProduccion(formData).subscribe({
        next: () => {
          this.openSnackBar('Datos de fabricación registrados correctamente', '✅');
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          console.error(error);
          this.openSnackBar('Error al registrar los datos de fabricación', '❌');
        },
      });
    }
  }

  public getAllProductos(): void {
    this.productoService.getAllProductos().subscribe({
      next: (response: Fabricacion[]) => {
        console.log(response);
        this.Producto = response; // Asignar el resultado de la API a la propiedad Producto
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}
