import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductoComponent } from './pages/list-producto/list-producto.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { SharedComponentModule } from 'src/app/shared/shared.module';
import { ProductoComponentsRoutes } from './producto.routes';
import { InsertProductoComponent } from './pages/insert-producto/insert-producto.component';
import { MatSelectModule } from '@angular/material/select';
import { EditProductoComponent } from './pages/edit-producto/edit-producto.component';
import { ProductoServicioComponent } from './pages/producto-servicio/producto-servicio.component';
import { ProductoCatalogoComponent } from './pages/producto-catalogo/producto-catalogo.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ListRecetaComponent } from './list-receta/list-receta.component';
import { InsertRecetaComponent } from './insert-receta/insert-receta.component';
import { EditRecetaComponent } from './edit-receta/edit-receta.component';
import { InsertProdComponent } from './pages/insert-prod/insert-prod.component';
import { ListProdComponent } from './pages/list-prod/list-prod.component';



@NgModule({
  declarations: [
    ListProductoComponent,
    InsertProductoComponent,
    EditProductoComponent,
    ProductoServicioComponent,
    ProductoCatalogoComponent,
    CarritoComponent,
    ListRecetaComponent,
    InsertRecetaComponent,
    EditRecetaComponent,
    InsertProdComponent,
    ListProdComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductoComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgApexchartsModule,
    TablerIconsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    SharedComponentModule,
    MatSelectModule 
  ]
})
export class ProductoModule { }
