import { FormBuilder, FormGroup } from '@angular/forms';
import { InventarioMateriales } from './../interfaces/material';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorController } from '../controller/proveedor.controller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-material',
  templateUrl: './list-material.component.html',
  styleUrls: ['./list-material.component.scss']
})
export class ListMaterialComponent {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['Empresa', 'Telefono', 'Email'];
  public dataSource = new MatTableDataSource<InventarioMateriales>([]);
  public Material: InventarioMateriales[] = [];
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBack: MatSnackBar,
    private proveedorController: ProveedorController,
    private router: Router
  ) {}

  public formSearch: FormGroup = this.fb.group({
    search: ['']
  });

  ngOnInit(): void {
    this.getAllProveedores();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public async getAllProveedores() {
    this.isLoading = true;

    try {
      // Obtener datos del servicio
      const response = await this.proveedorController.getAllMaterialesInv();
      this.Material = response;

      // Obtener datos locales
      const localData = JSON.parse(localStorage.getItem('materiales') || '[]');

      // Combinar ambos conjuntos de datos
      const combinedData = [...this.Material, ...localData];

      // Configurar DataSource
      this.dataSource = new MatTableDataSource(combinedData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error('Error al obtener los proveedores', error);
      this.snackBack.open('Error al cargar los materiales', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.isLoading = false;
    }
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  public consultarGrupo(nombre: string) {
    this.router.navigate([`/proveedores/edit-proveedores/${nombre}`]);
  }

  public isActive(url: string): boolean {
    return this.router.url === url;
  }
}
