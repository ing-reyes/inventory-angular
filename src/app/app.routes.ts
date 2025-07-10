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

      // Categorías
      {
        path: 'dashboard/informatica',
        title: 'Departamento de Informática y Telemática',
        data: {
          title: 'Departamento de Informática y Telemática',
        },
        loadComponent: () => import('./pages/inventory/categories/informatica-telematica/informatica-telematica.component'),
      },

      {
        path: 'dashboard/planificacion',
        title: 'Departamento de Planificación',
        data: {
          title: 'Departamento de Planificación',
        },
        loadComponent: () => import('./pages/inventory/categories/planificacion/planificacion.component'),
      },

      {
        path: 'dashboard/bienes',
        title: 'Departamento de Sesión de Bienes',
        data: {
          title: 'Departamento de Sesión de Bienes',
        },
        loadComponent: () => import('./pages/inventory/categories/sesion-bienes/sesion-bienes.component'),
      },

      {
        path: 'dashboard/contabilidad',
        title: 'Departamento de Contabilidad y Presupuesto',
        data: {
          title: 'Departamento de Contabilidad y Presupuesto',
        },
        loadComponent: () => import('./pages/inventory/categories/contabilidad-presupuesto/contabilidad-presupuesto.component'),
      },

      {
        path: 'dashboard/bienestar-social',
        title: 'Departamento de Bienestar Social',
        data: {
          title: 'Departamento de Bienestar Social',
        },
        loadComponent: () => import('./pages/inventory/categories/bienestar-social/bienestar-social.component'),
      },

      {
        path: 'dashboard/nomina',
        title: 'Departamento de Nomina',
        data: {
          title: 'Departamento de Nomina',
        },
        loadComponent: () => import('./pages/inventory/categories/nomina/nomina.component'),
      },

      {
        path: 'dashboard/registro-control',
        title: 'Departamento de Registro y Control',
        data: {
          title: 'Departamento de Registro y Control',
        },
        loadComponent: () => import('./pages/inventory/categories/registro-control/registro-control.component'),
      },

      {
        path: 'dashboard/ingreso-egreso',
        title: 'Departamento de Ingreso y Egreso',
        data: {
          title: 'Departamento de Ingreso y Egreso',
        },
        loadComponent: () => import('./pages/inventory/categories/ingreso-egreso/ingreso-egreso.component'),
      },

      {
        path: 'dashboard/bienestar-social-gestion',
        title: 'Gestion de Documentos',
        data: {
          title: 'Gestion de Documentos',
        },
        loadComponent: () => import('./pages/inventory/bienestar-social-gestion/bienestar-social-gestion.component'),
      },



      // Productos
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