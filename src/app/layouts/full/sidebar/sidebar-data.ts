import { NavItem } from './nav-item/nav-item';

export const navItemsAdmistrador: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },

  {
    displayName: 'Usuarios',
    iconName: '',
    route: '/usuarios',

  },
  

  
  {
    navCap: 'Inventario',
  },
  {
    displayName: 'Proveedores',
    iconName: '',
    route: '/proveedores',
  },
  {
    displayName: 'Producción',
    iconName: '',
    route: '/productos',
  },
  {
    displayName: 'Categoria',
    iconName: '',
    route: '/categorias',
  },
  {
    displayName: 'Material',
    iconName: '',
    route: '/materiales',
  },

];

