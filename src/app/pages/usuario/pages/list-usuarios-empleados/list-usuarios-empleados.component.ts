
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { usuarioE } from '../../interfaces/usuario_empleado';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioController } from '../../controller/usuario.controller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-usuarios-empleados',
  templateUrl: './list-usuarios-empleados.component.html',
  styleUrls: ['./list-usuarios-empleados.component.scss']
})




export class ListUsuariosEmpleadosComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  


  public displayedColumns: String[] = ['Nombre', 'Rol', 'Direccion','Estatus'];
  public dataSource = new MatTableDataSource<Empleado>(ELEMENT_DATA);
  public Proveedores: usuarioE[] = [];
  public isLoading: boolean = false;

  constructor(
    private fb : FormBuilder,
    private usuarioService: UsuarioService,
    private usuarioController: UsuarioController,
    private snackBack: MatSnackBar,
    private router: Router
  ){}

  public formSearch: FormGroup = this.fb.group({
    search:['']
  });

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  ngOnInit(): void {

    //this.getAllProveedor();

  }

  public consultarGrupo(nombre: string) {
    this.router.navigate([`/proveedores/edit-proveedores/${nombre}`]);
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public isActive(url: string): boolean {
    return this.router.url === url;
  }

  
}
export interface Empleado {
  nombre: string;
  nombrep: string;
  direccion: string;
  status: number;
}

const ELEMENT_DATA: Empleado[] = [
  {nombre: 'Juan Pérez', nombrep: 'Administrador', direccion: 'Calle 1', status: 1},
  {nombre: 'María López', nombrep: 'Vendedor', direccion: 'Calle 2', status: 1},
  {nombre: 'Carlos Ruiz', nombrep: 'Soporte Técnico', direccion: 'Calle 3', status: 2},
  {nombre: 'Ana Gómez', nombrep: 'Desarrollador', direccion: 'Calle 4', status: 1},
  {nombre: 'Luis Herrera', nombrep: 'Gerente', direccion: 'Calle 5', status: 1},
  {nombre: 'Sofía Martínez', nombrep: 'Contadora', direccion: 'Calle 6', status: 2},
  {nombre: 'Pedro Sánchez', nombrep: 'Asistente', direccion: 'Calle 7', status: 1},
  {nombre: 'Laura Ramírez', nombrep: 'Recepcionista', direccion: 'Calle 8', status: 2},
  {nombre: 'Roberto Díaz', nombrep: 'Supervisor', direccion: 'Calle 9', status: 1},
  {nombre: 'Andrea Ortiz', nombrep: 'Ingeniero', direccion: 'Calle 10', status: 1},
];