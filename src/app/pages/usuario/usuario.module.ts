
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsuariosEmpleadosComponent } from './pages/list-usuarios-empleados/list-usuarios-empleados.component';
import { ListUsuariosClientesComponent } from './pages/list-usuarios-clientes/list-usuarios-clientes.component';
import { InsertUsuariosClientesComponent } from './pages/insert-usuarios-clientes/insert-usuarios-clientes.component';
import { InsertUsuariosEmpleadosComponent } from './pages/insert-usuarios-empleados/insert-usuarios-empleados.component';
import { EditUsuariosEmpleadosComponent } from './pages/edit-usuarios-empleados/edit-usuarios-empleados.component';
import { EditUsuariosClientesComponent } from './pages/edit-usuarios-clientes/edit-usuarios-clientes.component';
import { UsuariosComponentsRoutes } from './usuarios.routes';
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






@NgModule({
  declarations: [
    ListUsuariosEmpleadosComponent,
    ListUsuariosClientesComponent,
    InsertUsuariosClientesComponent,
    InsertUsuariosEmpleadosComponent,
    EditUsuariosEmpleadosComponent,
    EditUsuariosClientesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsuariosComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgApexchartsModule,
    TablerIconsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    SharedComponentModule 
  ],
})
export class UsuarioModule { }
