import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from '@guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/pages.component'),
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        data: {
          title: 'Dashboard',
        },
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
      {
        path: '** ',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard/account-settings',
        title: 'Ajustes',
        data: {
          title: 'Ajustes',
        },
        loadComponent: () => import('./pages/account-settings/account-settings.component'),
      },

      //* Maintenance
      {
        path: 'dashboard/users',
        title: 'Usuarios',
        data: {
          title: 'Usuarios',
        },
        loadComponent: () => import('./pages/maintenance/users/users.component'),
      },
      //* Inventory
      {
        path: 'dashboard/categories',
        title: 'Categoría',
        data: {
          title: 'Categoría',
        },
        loadComponent: () => import('./pages/inventory/categories/categories.component'),
      },
      {
        path: 'dashboard/products',
        title: 'Producto',
        data: {
          title: 'Producto',
        },
        loadComponent: () => import('./pages/inventory/products/products.component'),
      },
      
      //* Components
      {
        path: 'dashboard/products/register',
        title: 'Registrar Producto',
        data: {
          title: 'Registrar Producto',
        },
        loadComponent: () => import('./components/register-product/register-product.component'),
      },

      {
        path: 'dashboard/products/edit/:id',
        title: 'Editar Producto',
        data: {
          title: 'Editar Producto',
        },
        loadComponent: () => import('./components/edit-product/edit-product.component'),
      },
    ],
  },
  {
    path: 'login',
    canActivate: [noAuthGuard], // Protege las rutas de login con noAuthGuard
    title: 'Iniciar Sesión',
    data: {
      title: "Iniciar Sesión"
    },
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: 'forgot-password',
    title: 'Recuperar Contraseña',
    data: {
      title: "Recuperar Contraseña"
    },
    loadComponent: () => import('./auth/forgot-password/forgot-password.component'),
  },
  {
    path: 'reset-password',
    title: 'Crear Nueva Contraseña',
    data: {
      title: "Crear Nueva Contraseña"
    },
    loadComponent: () => import('./auth/reset-password/reset-password.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/nopagefound/nopagefound.component'),
  },
];