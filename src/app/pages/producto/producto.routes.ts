import { Routes } from '@angular/router';
import { ListProductoComponent } from './pages/list-producto/list-producto.component';
import { InsertProductoComponent } from './pages/insert-producto/insert-producto.component';
import { EditProductoComponent } from './pages/edit-producto/edit-producto.component';
import { ProductoServicioComponent } from './pages/producto-servicio/producto-servicio.component';
import { ListRecetaComponent } from './list-receta/list-receta.component';
import { InsertRecetaComponent } from './insert-receta/insert-receta.component';
import { EditRecetaComponent } from './edit-receta/edit-receta.component';
import { ListProdComponent } from './pages/list-prod/list-prod.component';
import { InsertProveedorComponent } from '../proveedor/pages/insert-proveedor/insert-proveedor.component';
import { InsertProdComponent } from './pages/insert-prod/insert-prod.component';



export const ProductoComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListProductoComponent,
        
        
      },
      {
        path: 'insert-producto',
        component: InsertProductoComponent,
        data: { title: 'insertar Producto' }
      },
      {
        path: 'edit-producto/:id',
        component: EditProductoComponent,
        data: { title: 'edit Producto' }
      },
      {
        path: 'servicio-producto',
        component: ProductoServicioComponent,
        data: { title: 'servicio Producto' }
      },
      {
        path: 'list-receta',
        component: ListRecetaComponent,
        data: { title: 'Receta Producto' }
      },
      {
        path: 'insert-receta',
        component: InsertRecetaComponent,
        data: { title: 'Registro Producto' }
      },
      {
        path: 'edit-receta',
        component: EditRecetaComponent,
        data: { title: 'Editar Receta' }
      },
      {
        path: 'list-prod',
        component: ListProdComponent,
        data: { title: 'Editar Receta' }
      },
      {
        path: 'insert-produccion',
        component: InsertProdComponent,
        data: { title: 'Registro Producto' }
      },

    ],
  },
];
