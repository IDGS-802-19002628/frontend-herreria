import { Component, Input, OnChanges } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: [],
})
export class AppNavItemComponent implements OnChanges {
  @Input() item: NavItem | any; // Un solo elemento NavItem
  @Input() navItems: NavItem[] = []; // Lista completa de NavItems
  @Input() depth: any;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item?.route && url) {
        // Puedes agregar lógica adicional aquí si es necesario
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    // Scroll al inicio de la página
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }

  getUserRole(): string {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      try {
        const user = JSON.parse(usuario);
        return user.rol; // Cambia 'rol' según la estructura de tu objeto de usuario
      } catch (error) {
        console.error('Error al parsear el usuario:', error);
      }
    }
    return '';
  }

  filterNavItems(items: NavItem[]): NavItem[] {
    const userRole = this.getUserRole();
    return items.filter((item) => {
      if (item.permisos && item.permisos.length > 0) {
        return item.permisos.includes(userRole);
      }
      return true;
    });
  }
}
