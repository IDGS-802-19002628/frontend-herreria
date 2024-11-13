import { Routes } from '@angular/router';

import { ListMaterialComponent } from './pages/list-material/list-material.component';
import { InsertMaterialComponent } from './pages/insert-material/insert-material.component';
import { EditMaterialComponent } from './pages/edit-material/edit-material.component';



export const MaterialComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListMaterialComponent
      },
      {
        path: 'edit-material/:id',  // Acepta el parámetro nombre
        component: EditMaterialComponent,
        data: { title: 'edit material' }
      },

    ],
  },
];
