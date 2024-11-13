import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Proveedor } from '../../interfaces/proveedor';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.scss']
})
export class ListProveedorComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['Empresa', 'Telefono', 'Email', 'Direccion', 'Estatus'];
  public dataSource = new MatTableDataSource<Proveedor>([]);
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBack: MatSnackBar,
    private router: Router
  ){}

  public formSearch: FormGroup = this.fb.group({
    search: ['']
  });

  ngOnInit(): void {
    this.loadProveedoresFromLocalStorage();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadProveedoresFromLocalStorage(): void {
    const proveedoresData = localStorage.getItem('proveedores');
    this.dataSource.data = proveedoresData ? JSON.parse(proveedoresData) : [];
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public consultarGrupo(nombre: string) {
    this.router.navigate([`/proveedores/edit-proveedores/${nombre}`]);
  }
}
