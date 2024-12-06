import { ProveedorController } from './../../proveedor/controller/proveedor.controller';
import { ProductoController } from './../controller/producto.controller';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Fabricacion } from '../interfaces/producto';
import { InventarioMateriales } from '../../proveedor/interfaces/material';

@Component({
  selector: 'app-insert-receta',
  templateUrl: './insert-receta.component.html',
  styleUrls: ['./insert-receta.component.scss']
})
export class InsertRecetaComponent implements OnInit{

  insertReceta: FormGroup;
  
  public Producto: Fabricacion[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
    private proveedorController: ProveedorController,
    private snackBar: MatSnackBar
  ) {
    this.insertReceta = this.fb.group({
      idFabricacion: [0, Validators.required], // Corresponde al ID de fabricación
      tipoProteccion: ['Protección', Validators.required], // Valor predeterminado si es necesario
      material: ["", Validators.required], // Material requerido
      cantidad: [1, [Validators.required, Validators.min(1)]], // Cantidad mínima de 1
    
      descripcion: ['', Validators.required], // Descripción requerida
      fechaCreacion: [new Date().toISOString(), Validators.required], // Fecha actual por defecto
      estatus: [1, Validators.required] // Estatus activo por defecto
    });
  }


  ngOnInit(): void {
    this.getAllProductos(); // Cargar productos al iniciar el componente
  }
 
  public getAllProductos(): void {
    this.productoService.getAllProductos().subscribe({
      next: (response: Fabricacion[]) => {
        console.log(response);
        this.Producto = response; // Asignar el resultado de la API a la propiedad Producto
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.showSnackBar('Hubo un error al cargar los productos.', 'Cerrar', 'error-snackbar');
      }
    });
  }


  

  /**
   * Método que se ejecuta al seleccionar un producto
   */
  onSelectProducto(idFabricacion: number): void {
    const productoSeleccionado = this.Producto.find(producto => producto.id === idFabricacion);
    if (productoSeleccionado) {
      // Aquí se asume que 'tipoProteccion' es un campo de la interfaz 'Fabricacion'
      this.insertReceta.get('tipoProteccion')?.setValue(productoSeleccionado.categoria);
    }
  }

  /**
   * Método que se ejecuta al enviar el formulario
   */
  onSubmit(): void {
    if (this.insertReceta.valid) {
      const recetaDTO = this.insertReceta.value;
  
      this.productoService.insertReceta(recetaDTO).subscribe({
        next: (response) => {
          this.showSnackBar('Receta creada exitosamente.', 'Cerrar', 'success-snackbar');
          this.router.navigate(['/productos/list-receta']); // Redirigir a la lista de recetas o donde corresponda
        },
        error: (err) => {
          console.error('Error al crear receta:', err);
          this.showSnackBar('Hubo un error al crear la receta. Por favor, inténtalo de nuevo.', 'Cerrar', 'error-snackbar');
        }
      });
    } else {
      // Mostrar los errores del formulario
      this.checkFormErrors();
    }
  }
  
  checkFormErrors(): void {
    const controls = this.insertReceta.controls;
    for (const controlName in controls) {
      if (controls[controlName].invalid) {
        // Aquí puedes mostrar un mensaje o incluso loguear el nombre del campo que no está lleno
        console.log(`${controlName} está vacío o es inválido`);
        this.showSnackBar(`${controlName} no está completo o es inválido.`, 'Cerrar', 'error-snackbar');
      }
    }
  }
  

  

  /**
   * Muestra un snackbar con el mensaje proporcionado
   * @param message Mensaje a mostrar
   * @param action Texto de la acción
   * @param panelClass Clase CSS opcional para el estilo del snackbar
   */
  private showSnackBar(message: string, action: string, panelClass: string = ''): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: panelClass ? [panelClass] : undefined
    };
    this.snackBar.open(message, action, config);
  }
}
