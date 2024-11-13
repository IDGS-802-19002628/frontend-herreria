import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVentaComponent } from './pages/list-venta/list-venta.component';
import { InsertVentaComponent } from './pages/insert-venta/insert-venta.component';
import { EditVentaComponent } from './pages/edit-venta/edit-venta.component';



@NgModule({
  declarations: [
    ListVentaComponent,
    InsertVentaComponent,
    EditVentaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VentasModule { }
