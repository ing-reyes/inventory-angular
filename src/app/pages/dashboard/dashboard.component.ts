import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Subscription } from 'rxjs';

import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { ProductsService } from '../../services/products.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '@entities/product.entity';
import { Category } from '@entities/category.entity';
import { CategoriesDepartment } from '@enums/categories-departament.enum';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, BreadcrumbsComponent, RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly usersService = inject(UsersService);
  
  
  public products = signal<Product[]>([]);
  public categories = signal<Category[]>([]);
  
  public totalProducts = signal<number>(0);
  public offset = signal<number>(1);
  public page = signal<number>(1);
  public limit = signal<number>(1);
  public total = signal<number>(1);
  public loading = signal<boolean>(true);
  
  
  public totalInventory = signal<number>(0);
  public totalCategories = signal<CategoriesDepartment[]>(Object.values(CategoriesDepartment));
  
  public totalValuePerCategory = signal<number>(0);
  
  public totalUsers = signal<number>(0);
  
  // Subscriptions
  private loadProductsSubs: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadProducts();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.loadProductsSubs.unsubscribe();
  }

  loadProducts() {
    this.loading.update(() => true);
    this.loadProductsSubs = this.productsService.loadProducts(this.page()).subscribe(resp => {
      const { data, offset, page, limit, total } = resp;
      this.products.update(() => data);
      this.totalProducts.update(() => total);
      this.offset.update(() => offset);
      this.page.update(() => page);
      this.limit.update(() => limit); 
      this.loading.update(() => false);
    });
  }

  loadUsers() {
    this.usersService.loadUsers(this.page()).subscribe(resp => {
      const { total } = resp;
      this.totalUsers.update(() => total);
    });
  }

  changePage(value: number) {
    this.page .update((currentPage) => currentPage + value);

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

  currencyFormatter({ currency, value }: { currency: string, value: number }) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency
    })
    return formatter.format(value)
  }
}
