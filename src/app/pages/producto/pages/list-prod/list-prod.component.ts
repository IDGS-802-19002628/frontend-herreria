import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudProduccion } from '../../interfaces/prod';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduccionService } from 'src/app/pages/produccion/services/produccion.service';
import { ProductoController } from '../../controller/producto.controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-prod',
  templateUrl: './list-prod.component.html',
  styleUrls: ['./list-prod.component.scss']
})
export class ListProdComponent {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['Nombre', 'Categoria', 'Acciones'];
  public dataSource = new MatTableDataSource<SolicitudProduccion>([]);  
  public Produccion: SolicitudProduccion[] = [];
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private produccionService: ProduccionService,
    private productoController: ProductoController,
    private snackBack: MatSnackBar,
    private router: Router
  ) { }

  public formSearch: FormGroup = this.fb.group({
    search: ['']
  });

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
   this.getAllProductos(); // Cargar productos al iniciar el componente
  }


  public async getAllProductos() {
    this.isLoading = true;
    let response = await this.productoController.getAllProduccion();
    console.log("prueba de aqui ", response);
    
    this.Produccion = response;
    this.dataSource = new MatTableDataSource(this.Produccion);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
    
  }
  
  // Filtrar la tabla en base a la búsqueda
  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Consultar grupo (editar producto)
  public consultarGrupo(nombre: string): void {
    this.router.navigate([`/productos/edit-producto/${nombre}`]);
  }

  public isActive(url: string): boolean {
    return this.router.url === url;
  }

  public mostrarAlerta(): void {
    
  }
  

  
}
