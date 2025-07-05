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
      title: "Inventario",
      icon: "mdi mdi-format-list-bulleted",
      submenu: [
        { title: "Productos", url: "./dashboard/products" },
        {
          title: "Categorias",
          submenu: [
            {
              title: "División de Informática",
              submenu: [
                {
                  title: "Departamento de Informática y Telemática",
                  url: "./dashboard/informatica",
                },
              ],
            },
            {
              title: "División de Planificación",
              submenu: [
                {
                  title: "Departamento de Planificación",
                  url: "./dashboard/planificacion",
                },
              ],
            },
            {
              title: "División de Administración y Presupuesto",
              submenu: [
                {
                  title: "Departamento de Bienes y Servicios Generales",
                  submenu: [{ title: "Sesión de Bienes", url: "./dashboard/bienes" }],
                },
                {
                  title: "Departamento de Contabilidad y Presupuesto",
                  url: "./dashboard/contabilidad",
                },
              ],
            },
            {
              title: "División de Recursos Humanos",
              submenu: [
                { title: "Departamento de Bienestar Social", url: "./dashboard/bienestar-social" },
                { title: "Nómina", url: "./dashboard/nomina" },
                { title: "Registro y Control", url: "./dashboard/registro-control" },
                { title: "Ingreso y Egreso", url: "./dashboard/ingreso-egreso" },
              ],
            },
          ],
        },
      ],
    },
  ])
}

