import { Component, OnInit } from '@angular/core';
import { navItemsAdmistrador } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavItem } from './nav-item/nav-item';
import { AuthService } from 'src/app/services/auth.service';
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  navItems: NavItem[] = []; // Lista filtrada

  constructor(
    public navService: NavService,
    private jwtHelper: JwtHelperService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.navItems = this.navItemsAdmistrador; // Asigna la lista completa al cargar
  }

  navItemsAdmistrador = navItemsAdmistrador;
}

