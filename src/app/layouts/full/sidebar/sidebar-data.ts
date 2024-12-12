import { NavItem } from './nav-item/nav-item';

export const navItemsAdmistrador: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'CRM',
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
    displayName: 'Productos',
    iconName: '',
    route: '/productos',
    permisos: ['administrador', 'almacen', 'produccion'], // Admin, almacén y producción
  },
  {
    displayName: 'Proceso Fabricación',
    iconName: '',
    route: '/productos/list-receta',
    permisos: ['administrador', 'almacen', 'produccion'], // Admin, almacén y producción
  },
  {
    displayName: 'Proveedores',
    iconName: '',
    route: '/proveedores',
    permisos: ['administrador', 'almacen'], // Admin y almacén
  },
  {
    displayName: 'Compra Material',
    iconName: '',
    route: '/proveedores/list-material',
    permisos: ['administrador', 'almacen'], // Admin y almacén
  },

  
  {
    displayName: 'Producción',
    iconName: '',
    route: '/productos/list-prod',
    permisos: ['administrador', 'almacen', 'produccion'], // Admin, almacén y producción
  },
  
];

