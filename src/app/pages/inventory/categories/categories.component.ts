import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '@entities/category.entity';
import { CategoriesService } from '@services/categories.service';
import { SweetalertService } from '@services/sweetalert.service';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  imports: [BreadcrumbsComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export default class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly sweetalertService = inject(SweetalertService);

  public categories = signal<Category[]>([]);
  public categoriesTemp = signal<Category[]>([]);;
  public totalCategories = signal<number>(0);
  public page = signal<number>(1);
  public total = signal<number>(1);
  public limit = signal<number>(1);
  public offset = signal<number>(1);
  public loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadCategories();
  }

  async createCategory() {

    const { value: formValues } = await Swal.fire({
      title: "Registrar Categoria",
      html: `
            <input id="swal-input1" class="swal2-input " placeholder="Categoría" >
            <input id="swal-input2" class="swal2-input" placeholder="Descripción" >
          `,
      confirmButtonText: 'Agregar',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById("swal-input1") as HTMLInputElement)?.value,
          (document.getElementById("swal-input2") as HTMLInputElement)?.value,
        ];
      }
    });
    if (formValues) {
      const [name, description] = formValues;
      this.categoriesService.createCategory({ name, description }).subscribe({
        next: () => {
          this.sweetalertService.sweetAlert2('center', 'success', 'Success', `Categoría ${name} registrado`, true, 2500);
          this.loadCategories();
        },
        error: (err) => {
          this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.error}`, true, 2500);
        }
      });
    }
  }

  loadCategories() {
    this.loading.update(() => true);
    this.categoriesService.loadCategories(this.page()).subscribe(resp => {
      const { data, offset, page, limit, total } = resp;
      this.categories.update(() => data);
      this.categoriesTemp.update(() => data);
      this.totalCategories.update(() => total);
      this.page.update(() => page);
      this.offset.update(() => offset);
      this.limit.update(() => limit);

      this.loading.update(() => false);
    });
  }

  changePage(value: number) {
    this.page.update((currentPage) => currentPage + value);
    if (this.page() < 1) {
      this.page.update(() => 1);
      return;
    };
    if (this.page() > Math.ceil(this.totalCategories() / this.limit())) {
      this.page.update((current) => current - value);
      return;
    }

    this.loadCategories();
  }

  search(term: string) {
    if (term.length === 0) {
      this.categories = this.categoriesTemp;
      return;
    }

    this.categoriesService.search(term)
      .subscribe(resp => {
        this.categories.update(() => resp);
        this.totalCategories.update(() => resp.length);
      })
  }

  async updateCategory(category: Category) {


    const { value: formValues } = await Swal.fire({
      title: "Actualizar Categoría",
      html: `
            <input id="swal-input1" class="swal2-input" value="${category.name}">
            <input id="swal-input2" class="swal2-input" value="${category.description ?? 'Sin descripcion'}">
          `,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById("swal-input1") as HTMLInputElement)?.value,
          (document.getElementById("swal-input2") as HTMLInputElement)?.value,
        ];
      }
    });
    if (formValues) {
      const [name, description] = formValues;
      this.categoriesService.updateCategory(category.id, { name, description }).subscribe({
        next: () => {
          this.sweetalertService.sweetAlert2('center', 'success', 'Success', `Categoría ${category.name} actualizado`, true, 2500);
          this.loadCategories();
        },
        error: (err) => {
          this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.error}`, true, 2500);
        }
      });
    }
  }

  removeCategory(category: Category) {

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
        this.categoriesService.removeCategory(category.id).subscribe();
        this.sweetalertService.sweetAlert2('center', 'success', 'Success', `Categoría ${category.name} eliminado`, true, 2500);
        this.loadCategories();
      }
    });
  }
}
