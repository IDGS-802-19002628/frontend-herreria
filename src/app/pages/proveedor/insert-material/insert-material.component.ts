import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../services/proveedor.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-material',
  templateUrl: './insert-material.component.html',
  styleUrls: ['./insert-material.component.scss']
})
export class InsertMaterialComponent implements OnInit {
  insertMaterialForm!: FormGroup;
  public Producto: any[] = []; // Productos
  public Material: any[] = []; // Materiales
  public materialesLocal: any[] = []; // Materiales almacenados localmente

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.insertMaterialForm = this.fb.group({
      cantidad: [null, [Validators.required, Validators.min(1)]],
      fechaCreacion: [null, Validators.required],
      idMaterial: [null, Validators.required],
      idFabricacion: [null, Validators.required]
    });

    this.getAllProductos();
    this.getAllMaterial();
    this.loadLocalStorageData(); // Cargar materiales guardados localmente
  }

  public getAllProductos(): void {
    this.proveedorService.getAllProveedores().subscribe({
      next: (response: any[]) => {
        this.Producto = response;
      },
      error: () => {
        this.showSnackBar('Error al cargar productos', 'Cerrar', 'error-snackbar');
      }
    });
  }

  public getAllMaterial(): void {
    this.proveedorService.getAllmaterialINV().subscribe({
      next: (response: any[]) => {
        this.Material = response;
      },
      error: () => {
        this.showSnackBar('Error al cargar materiales', 'Cerrar', 'error-snackbar');
      }
    });
  }

  private showSnackBar(message: string, action: string, panelClass: string = ''): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: panelClass ? [panelClass] : undefined
    };
    this.snackBar.open(message, action, config);
  }

  onSubmit(): void {
    if (this.insertMaterialForm.valid) {
      const formData = this.insertMaterialForm.value;

      const materialDTO = {
        cantidad: formData.cantidad,
        fechaCreacion: formData.fechaCreacion,
        idMaterial: formData.idMaterial,
        ProveedorId: formData.idFabricacion
      };

      this.saveToLocalStorage(materialDTO);

      this.showSnackBar('Material registrado', 'Cerrar', 'success-snackbar');
      this.insertMaterialForm.reset();
      this.router.navigate([`/proveedores/list-proveedores`]);
    } else {
      this.showSnackBar('Por favor, complete todos los campos correctamente.', 'Cerrar', 'error-snackbar');
    }
  }

  private saveToLocalStorage(data: any): void {
    const materiales = localStorage.getItem('materiales');
    if (materiales) {
      const materialesArray = JSON.parse(materiales);
      materialesArray.push(data);
      localStorage.setItem('materiales', JSON.stringify(materialesArray));
    } else {
      localStorage.setItem('materiales', JSON.stringify([data]));
    }

    this.loadLocalStorageData(); // Actualizar lista local
  }

  private loadLocalStorageData(): void {
    const materiales = JSON.parse(localStorage.getItem('materiales') || '[]');
    this.materialesLocal = materiales;
    console.log('Materiales cargados desde localStorage:', this.materialesLocal);
  }
}
