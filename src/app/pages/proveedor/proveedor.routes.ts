import { Routes } from '@angular/router';
import { ListProveedorComponent } from './pages/list-proveedor/list-proveedor.component';
import { InsertProveedorComponent } from './pages/insert-proveedor/insert-proveedor.component';
import { EditProveedorComponent } from './pages/edit-proveedor/edit-proveedor.component';
import { ListMaterialComponent } from './list-material/list-material.component';
import { InsertMaterialComponent } from './insert-material/insert-material.component';



export const ProveedorComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListProveedorComponent
      },
      {
        path: 'list-proveedores',
        component: ListProveedorComponent,
        data: { title: 'insertar proveedor' }
      },
      {
        path: 'insertar-proveedores',
        component: InsertProveedorComponent,
        data: { title: 'insertar proveedor' }
      },
      {
        path: 'edit-proveedores/:id',  // Acepta el parámetro nombre
        component: EditProveedorComponent,
        data: { title: 'edit proveedor' }
      },
      {
        path: 'list-material',  // Acepta el parámetro nombre
        component: ListMaterialComponent,
        data: { title: 'edit proveedor' }
      },
      {
        path: 'insert-material',  // Acepta el parámetro nombre
        component: InsertMaterialComponent,
        data: { title: 'edit proveedor' }
      },

    ],
  },
];
