import { Component, Output, EventEmitter, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Notificaciones } from 'src/app/interfaces/notificaciones';
import { NotificacionesService } from 'src/app/services/notificaciones.services';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/user';
import { Subscription, filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  public lstNotificaciones: Notificaciones[] = [];
  public numNotificaciones: number = 0;
  public usuarioNombre: string = '';
  private humaniUser!: User;
  public pageInfo: string = '';
  public subscriber?: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private notificacionesService: NotificacionesService,
    private jwtHelper: JwtHelperService,
    private activatedRoute: ActivatedRoute
  ) {
    this.detectRoute();
  }

  ngOnInit(): void {
    this.getDatosUsuario();
    this.usuarioNombre = this.getNombreUsuario(); // Recuperar y asignar el nombre del usuario
  
    // Suscribirse a las notificaciones
    this.notificacionesService.notificaciones$.subscribe((notificaciones) => {
      this.lstNotificaciones = notificaciones;
      this.numNotificaciones = notificaciones.length;
    });
  }
  

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/authentication/login']).then(() => {
      window.location.reload();
    });
  }

  public getNombreUsuario(): string {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      try {
        const userObject = JSON.parse(usuario);
        return userObject.nombre;
      } catch (error) {
        console.error('Error al parsear el usuario:', error);
        return 'Usuario no identificado';
      }
    }
    return 'Usuario no identificado';
  }

  private detectRoute() {
    this.subscriber = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        this.pageInfo = event['title'];
      });
  }

  private getDatosUsuario(): Promise<void> {
    return new Promise((resolve) => {
      const usuario = sessionStorage.getItem('token');
      if (usuario) {
        this.humaniUser = this.jwtHelper.decodeToken(usuario).data;
      }
      resolve();
    });
  }
}
