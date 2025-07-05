import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@entities/product.entity';
import { CategoriesDepartment } from '@enums/categories-departament.enum';
import { ProductsService } from '@services/products.service';
import { SweetalertService } from '@services/sweetalert.service';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bienestar-social',
  imports: [BreadcrumbsComponent, RouterLink],
  templateUrl: './bienestar-social.component.html',
  styleUrl: './bienestar-social.component.css'
})
export default class BienestarSocialComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly sweetalertService = inject(SweetalertService);

  public products = signal<Product[]>([]);
  public productsTemp = signal<Product[]>([]);
  public totalProducts = signal<number>(0);
  public page = signal<number>(1);
  public offset = signal<number>(1);
  public total = signal<number>(0);
  public limit = signal<number>(1);
  public loading = signal<boolean>(true);
  // Subscriptions
  
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.update(() => true);
    this.productsService.searchByCategory(CategoriesDepartment.DEPARTAMENTO_BIENESTAR_SOCIAL).subscribe(resp => {
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
