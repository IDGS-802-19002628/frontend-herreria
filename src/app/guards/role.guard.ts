import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verifica si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      // Obtiene el rol del usuario
      const userRole = this.authService.getUserRole();
      console.log('Rol del usuario:', userRole);  // Verifica que el rol esté correcto
  
      // Obtiene los roles permitidos de la ruta
      const roles = route.data['roles'] as Array<string>;
      console.log('Roles permitidos:', roles);  // Verifica los roles permitidos en la ruta
  
      // Si la ruta tiene roles definidos y el rol del usuario no está permitido
      if (roles && !roles.includes(userRole)) {
        console.log('Acceso denegado: Rol no autorizado');
        this.router.navigate(['/access-denied']);  // Redirige a una página de acceso denegado
        return false;
      }
  
      // Si el rol del usuario es válido, permite el acceso
      return true;
    } else {
      // Si el usuario no está autenticado, redirige al login
      console.log('Usuario no autenticado, redirigiendo al login');
      this.router.navigate(['/authentication']);
      return false;
    }
  }
  
}
