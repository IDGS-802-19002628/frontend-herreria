
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { usuarioC } from '../../interfaces/usuario_cliente';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioController } from '../../controller/usuario.controller';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-usuarios-clientes',
  templateUrl: './list-usuarios-clientes.component.html',
  styleUrls: ['./list-usuarios-clientes.component.scss']
})
export class ListUsuariosClientesComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['Nombre', 'Rol', 'Direccion', 'ComprasRealizadas', 'Tarjeta', 'Estatus'];
  public dataSource = new MatTableDataSource<Cliente>(ELEMENT_DATA);
  public Proveedores: usuarioC[] = [];
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

export interface Cliente {
  nombre: string;
  nombrep: string;
  direccion: string;
  comprasRealizadas: number;
  tarjeta: string;
  status: number;
}

const ELEMENT_DATA: Cliente[] = [
  { nombre: 'Juan Pérez', nombrep: 'Cliente', direccion: 'Av. Principal 123', comprasRealizadas: 10, tarjeta: '1234-5678-9123-4567', status: 1 },
  { nombre: 'María García', nombrep: 'Cliente', direccion: 'Calle Secundaria 45', comprasRealizadas: 5, tarjeta: '4321-8765-3219-6543', status: 2 },
  { nombre: 'Carlos López', nombrep: 'Cliente', direccion: 'Calle Tercera 12', comprasRealizadas: 7, tarjeta: '1111-2222-3333-4444', status: 1 },
  { nombre: 'Ana Martínez', nombrep: 'Cliente', direccion: 'Av. Nueva 78', comprasRealizadas: 3, tarjeta: '5555-6666-7777-8888', status: 2 },
  { nombre: 'Luis Fernández', nombrep: 'Cliente', direccion: 'Plaza Central 56', comprasRealizadas: 20, tarjeta: '9999-0000-1234-5678', status: 1 },
  // Añade más datos si es necesario
];
