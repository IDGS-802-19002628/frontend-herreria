import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventarioMateriales } from '../../proveedor/interfaces/material';
import { ProveedorService } from '../../proveedor/services/proveedor.service';
import { Fabricacion } from '../interfaces/producto';

@Component({
  selector: 'app-insert-receta',
  templateUrl: './insert-receta.component.html',
  styleUrls: ['./insert-receta.component.scss']
})
export class InsertRecetaComponent implements OnInit {

  insertReceta: FormGroup;
  Producto: Fabricacion[] = [];
  Materiales: InventarioMateriales[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
    private proveedorServices: ProveedorService,
    private snackBar: MatSnackBar
  ) {
    this.insertReceta = this.fb.group({
      idFabricacion: [0, Validators.required],
      tipoProteccion: ['Protección', Validators.required],
      materiales: this.fb.array([]), // FormArray para manejar múltiples materiales
     
      cantidad: [1, [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required],
      fechaCreacion: [new Date().toISOString(), Validators.required],
      estatus: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllProductos();
    this.getAllMateriales();
  }

  get materiales() {
    return (this.insertReceta.get('materiales') as FormArray);
  }

  getAllProductos(): void {
    this.productoService.getAllProductos().subscribe({
      next: (response: Fabricacion[]) => {
        this.Producto = response;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.showSnackBar('Hubo un error al cargar los productos.', 'Cerrar', 'error-snackbar');
      }
    });
  }

  getAllMateriales(): void {
    this.proveedorServices.getAllMaterialesInv().subscribe({
      next: (response: InventarioMateriales[]) => {
        this.Materiales = response;
      },
      error: (err) => {
        console.error('Error al cargar materiales:', err);
        this.showSnackBar('Hubo un error al cargar los materiales.', 'Cerrar', 'error-snackbar');
      }
    });
  }

  onSelectProducto(idFabricacion: number): void {
    const productoSeleccionado = this.Producto.find(producto => producto.id === idFabricacion);
    if (productoSeleccionado) {
      this.insertReceta.get('tipoProteccion')?.setValue(productoSeleccionado.categoria);
    }
  }

  addMaterial(nombreMaterial: string): void {
    if (!nombreMaterial) {
      this.snackBar.open('Debe seleccionar un material válido.', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }
  
    // Verificar si el material ya está en la lista
    const existe = this.materiales.controls.some(
      (control) => control.value.material === nombreMaterial
    );
  
    if (existe) {
      // Notificar al usuario que el material ya está agregado
      this.snackBar.open(`El material "${nombreMaterial}" ya está agregado.`, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }
  
    // Si no existe, agregar el nuevo material
    const material = { material: nombreMaterial };
    this.materiales.push(this.fb.group(material));
   
  }
  
  
  


  removeMaterial(index: number): void {
    const materialesArray = this.insertReceta.get('materiales') as FormArray;
    materialesArray.removeAt(index); // Elimina el material del FormArray
  }

  onSubmit(): void {
    if (this.insertReceta.valid) {
      // Crear el objeto de receta incluyendo la lista de materiales seleccionados
      const recetaDTO = {
        ...this.insertReceta.value,
        materiales: this.materiales.value.map((material: any) => ({
          materiales: material.material
          //cantidad: this.insertReceta.get('cantidad')?.value, // Usar cantidad global o específica
          //descripcion: this.insertReceta.get('descripcion')?.value // Usar descripción global o específica
        }))
      
      };
  
      console.log('Datos enviados:', recetaDTO);
  
      this.productoService.insertReceta(recetaDTO).subscribe({
        next: (response) => {
          this.showSnackBar('Receta creada exitosamente.', 'Cerrar', 'success-snackbar');
          this.router.navigate(['/productos/insert-produccion']);
        },
        error: (err) => {
          console.error('Error al crear receta:', err);
          this.showSnackBar('Hubo un error al crear la receta. Por favor, inténtalo de nuevo.', 'Cerrar', 'error-snackbar');
        }
      });
    } else {
      this.checkFormErrors();
    }
  }
  

  checkFormErrors(): void {
    const controls = this.insertReceta.controls;
    for (const controlName in controls) {
      if (controls[controlName].invalid) {
        console.log(`${controlName} está vacío o es inválido`);
        this.showSnackBar(`${controlName} no está completo o es inválido.`, 'Cerrar', 'error-snackbar');
      }
    }
  }

  private showSnackBar(message: string, action: string, panelClass: string = ''): void {
    this.snackBar.open(message, action, { duration: 3000, panelClass: panelClass ? [panelClass] : undefined });
  }
}
