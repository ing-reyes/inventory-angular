import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { CategoriesService } from '@services/categories.service';
import { Category } from '@entities/category.entity';
import { ProductsService } from '@services/products.service';
import { SweetalertService } from '@services/sweetalert.service';
import { RouterLink } from '@angular/router';
import { Product } from '@entities/product.entity';

@Component({
  selector: 'app-products',
  imports: [BreadcrumbsComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly sweetalertService = inject(SweetalertService);

  public products = signal<Product[]>([]);
  public productsTemp = signal<Product[]>([]);
  public totalProducts = signal<number>(0);
  public page = signal<number>(1);
  public offset = signal<number>(1);
  public total = signal<number>(1);
  public limit = signal<number>(1);
  public loading = signal<boolean>(true);

  private readonly categoriesService = inject(CategoriesService);
  public categories = signal<Category[]>([]);

  // Subscriptions
  private loadProductsSubs: Subscription = new Subscription();
  private loadCategoriesSubs: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.loadProductsSubs.unsubscribe();
    this.loadCategoriesSubs.unsubscribe();
  }

  loadCategories() {
    this.loadCategoriesSubs = this.categoriesService.loadCategories().subscribe((resp) => {
      this.categories.update(() => resp.data);
    });
  }

  loadProducts() {
    this.loading.update(() => true);
    this.loadProductsSubs = this.productsService.loadProducts(this.page()).subscribe(resp => {
      const { data, offset, page, total, limit } = resp;
      this.products.update(() => data);
      this.productsTemp.update(() => data);
      this.totalProducts.update(() => total);
      this.offset.update(() => offset);
      this.page.update(() => page);
      this.limit.update(() => limit);

      this.loading.update(() => false);
    });
  }

  changePage(value: number) {
    this.page.update((current) => current + value);
    if (this.page() < 1) {
      this.page.update(() => 1);
      return;
    };
    if (this.page() > Math.ceil(this.totalProducts() / this.limit())) {
      this.page.update((current) => current - value);
      return;
    }

    this.loadProducts();
  }

  search(term: string) {
    if (term.length === 0) {
      this.products = this.productsTemp;
      return;
    }

    this.productsService.search(term)
      .subscribe(resp => {
        this.products.update(() => resp);
        this.totalProducts.update(() => resp.length);
      })
  }

  removeProduct(product: Product) {

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
        this.productsService.removeProduct(product.id).subscribe();
        this.sweetalertService.sweetAlert2('center', 'success', 'Success', `Producto ${product.name} eliminado`, true, 2500);
        this.loadProducts();
      }
    });
  }
}
