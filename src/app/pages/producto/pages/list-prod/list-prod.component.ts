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
import { ProductoService } from '../../services/producto.service';

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
    private productoService: ProductoService,
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

   // Iniciar producción
public iniciarPro(solicitudProduccionId: number): void {
  const request = {
    usuarioId: 1 || null,
    solicitudProduccionId: solicitudProduccionId,
    costoTotal: 0 // Ajusta según sea necesario
  };

  this.productoService.iniciarProduccion(request).subscribe(
    (response) => {
      console.log('Producción iniciada:', response);
      this.snackBack.open('Producción iniciada exitosamente.', 'Cerrar', { duration: 3000 });
      this.getAllProductos(); // Actualiza la lista de producciones
    },
    (error) => {
      console.error('Error al iniciar producción:', error);
      this.snackBack.open('Error al iniciar producción.', 'Cerrar', { duration: 3000 });
    }
  );
}

 // Terminar producción
public terminarPro(solicitudProduccionId: number): void {
  console.log(solicitudProduccionId);
  
  const request = {
    lote: this.generarCodigoLote() || null,
    solicitudProduccionId: solicitudProduccionId
  };

  this.productoService.terminarProduccion(request).subscribe(
    (response) => {
      console.log('Producción terminada:', response);
      this.snackBack.open('Producción terminada exitosamente.', 'Cerrar', { duration: 3000 });
      this.getAllProductos(); // Actualiza la lista de producciones
    },
    (error) => {
      console.error('Error al terminar producción:', error);
      this.snackBack.open('Error al terminar producción.', 'Cerrar', { duration: 3000 });
    }
  );
}

private generarCodigoLote(): string {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos
  const dia = fecha.getDate().toString().padStart(2, '0'); // Día con dos dígitos
  const hora = fecha.getHours().toString().padStart(2, '0'); // Hora con dos dígitos
  const minuto = fecha.getMinutes().toString().padStart(2, '0'); // Minuto con dos dígitos
  const segundo = fecha.getSeconds().toString().padStart(2, '0'); // Segundo con dos dígitos

  // Generamos un código de lote en formato 'YYYYMMDDHHMMSS'
  return `${anio}${mes}${dia}${hora}${minuto}${segundo}`;
}
  

  
}
