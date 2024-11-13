import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.scss']
})
export class ListCategoriaComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: String[] = ['Nombre', 'Estatus'];
  public dataSource = new MatTableDataSource<CategoriaE>();
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBack: MatSnackBar,
    private router: Router
  ) {}

  public formSearch: FormGroup = this.fb.group({
    search: ['']
  });

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // Recuperar las categorías desde localStorage
    this.loadCategoriasFromLocalStorage();
  }

  public consultarGrupo(nombre: string) {
    this.router.navigate([`/categorias/edit-categoria/${nombre}`]);
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  // Método para cargar las categorías desde localStorage
  private loadCategoriasFromLocalStorage(): void {
    const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
    this.dataSource.data = categorias;
  }
}

export interface CategoriaE {
  nombre: string;
  status: number;  // 1 = Activo, 2 = Inactivo
}
