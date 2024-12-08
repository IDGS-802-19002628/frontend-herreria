import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/pages/not-found/not-found.component';
import { ProveedorModule } from './pages/proveedor/proveedor.module';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AuthGuard], // Aplicamos el AuthGuard aquí
        data: { roles: ['administrador'] } 
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
        canActivate: [AuthGuard], // Aplicamos el AuthGuard aquí
      },
      {
        path: 'proveedores',
        loadChildren: () =>
          import('./pages/proveedor/proveedor.module').then((m) => m.ProveedorModule),
        canActivate: [AuthGuard], // Aplicamos el AuthGuard aquí
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('./pages/producto/producto.module').then((m) => m.ProductoModule),
        canActivate: [AuthGuard], // Aplicamos el AuthGuard aquí
      },
      {
        path: 'categorias',
        loadChildren: () =>
          import('./pages/categoria/categoria.module').then((m) => m.CategoriaModule),
        canActivate: [AuthGuard], // Aplicamos el AuthGuard aquí
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/usuario/usuario.module').then((m) => m.UsuarioModule),
        canActivate: [AuthGuard], // Aplicamos el AuthGuard aquí
      },
      {
        path: 'materiales',
        loadChildren: () =>
          import('./pages/material/material.module').then((m) => m.MaterialModule),
        canActivate: [AuthGuard], // Aplicamos el AuthGuard aquí
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '**',  // Wildcard para cualquier ruta no definida
    component: NotFoundComponent  // Componente de página no encontrada
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
