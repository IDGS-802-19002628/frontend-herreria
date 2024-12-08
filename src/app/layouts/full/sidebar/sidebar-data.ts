import { NavItem } from './nav-item/nav-item';

export const navItemsAdmistrador: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
    permisos: ['administrador', 'produccion'], // Solo admin y producción
  },
  {
    displayName: 'Usuarios',
    iconName: '',
    route: '/usuarios',
    permisos: ['administrador'], // Solo admin
  },
  {
    navCap: 'Inventario',
  },
  {
    displayName: 'Proveedores',
    iconName: '',
    route: '/proveedores',
    permisos: ['administrador', 'almacen'], // Admin y almacén
  },
  {
    displayName: 'Productos',
    iconName: '',
    route: '/productos',
    permisos: ['administrador', 'almacen', 'produccion'], // Admin, almacén y producción
  },
];

