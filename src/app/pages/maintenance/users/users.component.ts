import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { SweetalertService } from '@services/sweetalert.service';
import { User } from '@entities/user.entity';
import { UsersService } from '@services/users.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users',
  imports: [FormsModule, BreadcrumbsComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export default class UsersComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly sweetalertService = inject(SweetalertService);

  public users = signal<User[]>([]);
  public usersTemp = signal<User[]>([]);
  public page = signal<number>(1);
  public total = signal<number>(0);
  public limit = signal<number>(10);
  public offset = signal<number>(1);
  public totalUsers = signal<number>(0);
  public loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.update(() => true);
    this.usersService.loadUsers(this.page()).subscribe(resp => {
      const { data, offset, total, limit, page } = resp;
      this.users.update(() => data);
      this.usersTemp.update(() => data);
      this.offset.update(() => offset);
      this.limit.update(() => limit);
      this.page.update(() => page);
      this.total.update(() => total);
      this.totalUsers.update(() => total);

      this.loading.update(() => false);
    });
  }

  changePage(value: number) {
    this.page.update(currentPage => currentPage + value);
    if (this.page() < 1) {
      this.page.update(() => 1);
      return;
    };
    if (this.page() > Math.ceil(this.totalUsers() / this.limit())) {
      this.page.update((current) => current - value);
      return;
    }

    this.loadUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      this.users.update(() => this.usersTemp());
      return;
    }

    this.usersService.search(term)
      .subscribe(resp => {
        this.users.update(() => resp);
        this.totalUsers.update(() => resp.length);
      })
  }

  async createUser() {

    const { value: formValues } = await Swal.fire({
      title: "Registrar Usuario",
      html: `
              <input id="swal-input1" class="swal2-input " placeholder="Nombre" >
              <input id="swal-input2" class="swal2-input" placeholder="Correo" >
              <input id="swal-input3" class="swal2-input" placeholder="Contraseña" >
            `,
      confirmButtonText: 'Agregar',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById("swal-input1") as HTMLInputElement)?.value,
          (document.getElementById("swal-input2") as HTMLInputElement)?.value,
          (document.getElementById("swal-input3") as HTMLInputElement)?.value,
        ];
      }
    });
    if (formValues) {
      const [name, email, password] = formValues;
      this.usersService.createUser({ name, email, password }).subscribe({
        next: () => {
          this.sweetalertService.sweetAlert2('center', 'success', 'Success', `Usuario ${name} registrado`, true, 5500);
          this.loadUsers();
        },
        error: (err) => {
          this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.error}`, true, 5500);
        }
      });
    }
  }

  deleteUser(user: User) {

    if (user.id === this.usersService.user().id) {
      this.sweetalertService.sweetAlert2('center', 'error', 'Error', 'No te puedes eliminar a ti mismo', true, 2500);
      return;
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El cambio es irreversible!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(user.id).subscribe();
        this.sweetalertService.sweetAlert2('center', 'success', 'Success', `User ${user.name} eliminado`, true, 2500);
        this.loadUsers();
      }
    });
  }

  updateRole(user: User) {

    if (user.id === this.usersService.user().id) {
      this.sweetalertService.sweetAlert2('center', 'error', 'Error', 'No puedes actualizar tu rol', true, 2500);
      this.loadUsers();
      return;
    }

    this.usersService.updateRole(user.id, user.role).subscribe({
      next: () => {
        this.sweetalertService.sweetAlert2('center', 'success', 'Success', `Usuario ${user.name} actualizado`, true, 2500);
        this.loadUsers();
      },
      error: (err) => {
        this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.message[0]}`, true, 2500);
      }
    });
  }
}
