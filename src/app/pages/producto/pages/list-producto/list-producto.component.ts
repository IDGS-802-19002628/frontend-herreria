import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Producto } from '../../interfaces/producto';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduccionService } from 'src/app/pages/produccion/services/produccion.service';
import { ProductoController } from '../../controller/producto.controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.scss']
})
export class ListProductoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['Nombre', 'Precio', 'Stock', 'Descripcion', 'Estatus'];
  public dataSource = new MatTableDataSource<Producto>([]);  // Inicializamos con un arreglo vacío
  public Producto: Producto[] = [];
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
    this.cargarProductos(); // Cargar productos al iniciar el componente
  }

  // Método para cargar los productos desde LocalStorage
  cargarProductos(): void {
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    this.Producto = productos;
    this.dataSource.data = this.Producto; // Actualizamos el datasource con los productos cargados
    console.log('Productos cargados desde LocalStorage:', productos);
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
}
