import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import {ErrorPermisosComponent} from './error-permisos/error-permisos.component';
import { LandingComponent } from './landing/landing.component';
import { LandingContactosComponent } from './landing/landing-contactos/landing-contactos.component';


export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lading',
        component: LandingComponent
      },
      {
        path: 'contactos',
        component: LandingContactosComponent
      },
      
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'no-permission',
        component: ErrorPermisosComponent,
      },

    ],
  },
];
