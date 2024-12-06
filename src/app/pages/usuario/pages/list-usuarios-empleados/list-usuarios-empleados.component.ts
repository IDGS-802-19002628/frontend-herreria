
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
  public dataSource = new MatTableDataSource<usuarioE>([]);
  public UsuariosE: usuarioE[] = [];
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

    this.getAllUsauriosE();

  }

  public async getAllUsauriosE() {
    this.isLoading = true;
    let response = await this.usuarioController.getAllUsuariosE();
    console.log(response);
    
    this.UsuariosE = response;
    this.dataSource = new MatTableDataSource(this.UsuariosE);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
    
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


