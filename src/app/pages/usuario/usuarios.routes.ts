import { InsertUsuariosEmpleadosComponent } from './pages/insert-usuarios-empleados/insert-usuarios-empleados.component';
import { Routes } from '@angular/router';

import { ListUsuariosEmpleadosComponent } from './pages/list-usuarios-empleados/list-usuarios-empleados.component';
import { EditUsuariosEmpleadosComponent } from './pages/edit-usuarios-empleados/edit-usuarios-empleados.component';
import { ListUsuariosClientesComponent } from './pages/list-usuarios-clientes/list-usuarios-clientes.component';
import { EditUsuariosClientesComponent } from './pages/edit-usuarios-clientes/edit-usuarios-clientes.component';



export const UsuariosComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListUsuariosEmpleadosComponent
      },
      {
        path: 'list-empleados',
        component: ListUsuariosEmpleadosComponent
      },
      {
        path: 'insertar-empleados',
        component: InsertUsuariosEmpleadosComponent,
        data: { title: 'insertar empleado' }
      },
      {
        path: 'edit-empleado/:id',  
        component: EditUsuariosEmpleadosComponent,
        data: { title: 'edit empleado' }
      },
      {
        path: 'list-clientes',
        component: ListUsuariosClientesComponent,
        data: { title: 'Lista clientes' }
      },
      {
        path: 'edit-cliente/:id',  
        component: EditUsuariosClientesComponent,
        data: { title: 'edit cliente' }
      },

    ],
  },
];
