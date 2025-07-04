import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = signal<any[]>([
    {
      title: 'Panel',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Principal', url: './dashboard' },
        // { title: 'Statistics', url: 'dashboard/statistics'},
        // { title: 'Graphics', url: 'dashboard/graphics'},
      ]
    },
    {
      title: 'Administración',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: './dashboard/users' },

      ]
    },
    {
      title: 'Inventario',
      icon: 'mdi mdi-format-list-bulleted',
      submenu: [
        { title: 'Productos', url: './dashboard/products' },
        { title: 'Categorias', url: './dashboard/categories' },
      ]
    }
  ])
}
