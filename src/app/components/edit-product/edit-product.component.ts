import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@entities/category.entity';
import { Product } from '@entities/product.entity';
import { CategoriesDepartment } from '@enums/categories-departament.enum';
import { RegisterProductForm } from '@interfaces/register-product-form.interface';
import { CategoriesService } from '@services/categories.service';
import { ProductsService } from '@services/products.service';
import { SweetalertService } from '@services/sweetalert.service';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  imports: [BreadcrumbsComponent, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export default class EditProductComponent implements OnInit, OnDestroy {
  public categoriesDepartaments = signal<CategoriesDepartment[]>(Object.values(CategoriesDepartment));
  public fb = inject(FormBuilder);
  public updateProductForm = this.fb.group({
    name: ['', Validators.required],
    stock: [0, Validators.required],
    description: [''],
    category: ['', Validators.required],
    entryDate: [new Date(), Validators.required],
    departureDate: [new Date()],
  });

  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly sweetalertService = inject(SweetalertService);

  public categories = signal<Category[]>([])
  public product = signal<Product>({} as Product);

  private loadCategoriesSubs = new Subscription();

  public formSubmitted = signal<boolean>(false);
  public activatedRoute = inject(ActivatedRoute);
  public router = inject(Router);

  ngOnInit(): void {

    // get id by params
    this.activatedRoute.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        // Load product details here if needed
        this.productsService.findOneProduct(productId).subscribe({
          next: (resp) => {
            this.product.set(resp);
            this.updateProductForm.patchValue({
              name: resp.name,
              stock: resp.stock,
              category: resp.category,
              description: resp.description,
              entryDate: resp.entryDate,
              departureDate: resp.departureDate ?? null,
            });
          },
          error: (err) => {
            this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.message}`, true, 10000);
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.loadCategoriesSubs.unsubscribe();
  }

  updateProduct() {
    this.formSubmitted.set(true);

    if (this.updateProductForm.invalid) return;
    const product: RegisterProductForm = {
      name: this.updateProductForm.value.name!,
      stock: this.updateProductForm.value.stock!,
      category: this.updateProductForm.value.category!,
      entryDate: this.updateProductForm.value.entryDate!,
      description: this.updateProductForm.value.description ?? '',
      departureDate: this.updateProductForm.value.departureDate ?? null,
    }

    this.productsService.updateProduct(this.product().id, product).subscribe({
      next: (resp) => {
        this.sweetalertService.sweetAlert2("center", "success", "Exito", `Producto actualizado`, true, 15000);
      },
      error: (err) => {
        this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.message}`, true, 10000);
      }
    });

    // Here you would typically call a service to register the product
  }

  cancel() {
    this.updateProductForm.reset();
    // redirect to products
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });

  }

  isValidField(field: string): boolean {

    if (this.updateProductForm.get(field)?.invalid && this.formSubmitted()) {
      return true;
    } else {
      return false;
    }
  }
}
