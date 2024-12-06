
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { receta } from '../../producto/interfaces/receta';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduccionService } from 'src/app/pages/produccion/services/produccion.service';
import { ProductoController } from '../../producto/controller/producto.controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-receta',
  templateUrl: './list-receta.component.html',
  styleUrls: ['./list-receta.component.scss']
})
export class ListRecetaComponent {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['Receta', 'Cantidad','Descripcion', 'Estatus'];
  public dataSource = new MatTableDataSource<receta>([]);  // Inicializamos con un arreglo vacío
  public receta: receta[] = [];
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
   this.getAllRecetas(); // Cargar productos al iniciar el componente
  }


  public async getAllRecetas() {
    this.isLoading = true;
    let response = await this.productoController.getAllRceta();
    console.log(response);
    
    this.receta = response;
    this.dataSource = new MatTableDataSource(this.receta);
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

}
