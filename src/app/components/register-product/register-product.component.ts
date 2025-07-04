import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '@entities/category.entity';
import { RegisterProductForm } from '@interfaces/register-product-form.interface';
import { CategoriesService } from '@services/categories.service';
import { ProductsService } from '@services/products.service';
import { SweetalertService } from '@services/sweetalert.service';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-product',
  imports: [BreadcrumbsComponent, ReactiveFormsModule],
  templateUrl: './register-product.component.html',
  styleUrl: './register-product.component.css'
})
export default class RegisterProductComponent implements OnInit, OnDestroy {

  public fb = inject(FormBuilder);
  public registerProductForm = this.fb.group({
    name: ['', Validators.required],
    stock: [0, Validators.required],
    category: ['', Validators.required],
    description: [''],
    entryDate: [new Date(), Validators.required],
    departureDate: [new Date(), Validators.required],
  });

  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly sweetalertService = inject(SweetalertService);

  public categories = signal<Category[]>([])

  private loadCategoriesSubs = new Subscription();

  public formSubmitted = signal<boolean>(false);

  ngOnInit(): void {
    this.loadCategories();

  }
  ngOnDestroy(): void {
    this.loadCategoriesSubs.unsubscribe();
  }

  loadCategories() {
    this.loadCategoriesSubs = this.categoriesService.loadCategories().subscribe((resp) => {
      this.categories.set(resp.data);
    });
  }

  registerProduct() {
    this.formSubmitted.set(true);

    if (this.registerProductForm.invalid) return;
    const product: RegisterProductForm = {
      name: this.registerProductForm.value.name!,
      stock: this.registerProductForm.value.stock!,
      category: this.registerProductForm.value.category!,
      description: this.registerProductForm.value.description!,
      entryDate: this.registerProductForm.value.entryDate!,
      departureDate: null,
    };

    this.productsService.createProduct(product).subscribe({
      next: (resp) => {
        this.sweetalertService.sweetAlert2("center", "success", "Exito", `Producto ${resp.name} registrado`, true, 15000);

        this.registerProductForm.reset();
      }
      ,
      error: (err) => {
        this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.message}`, true, 10000);
      }
    });

    // Here you would typically call a service to register the product
  }

  cancel() {
    this.registerProductForm.reset();
  }

  isValidField(field: string): boolean {

    if (this.registerProductForm.get(field)?.invalid && this.formSubmitted()) {
      return true;
    } else {
      return false;
    }
  }
}
