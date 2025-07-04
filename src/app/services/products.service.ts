import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsersService } from '@services/users.service';
import { Product } from '@entities/product.entity';
import { Observable } from 'rxjs';
import { ApiAllResponse } from '@interfaces/api-response.interface';
import { RegisterProductForm } from '@interfaces/register-product-form.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly usersService = inject(UsersService);
  private readonly url = environment.base_url;

  createProduct(product: RegisterProductForm): Observable<Product> {
    return this.http.post<Product>(`${this.url}/api/products`, product, this.usersService.headers);
  }

  loadProducts(page: number = 1, limit: number = 10): Observable<ApiAllResponse<Product>> {
    return this.http.get<ApiAllResponse<Product>>(`${this.url}/api/products?page=${page}&limit=${limit}`, this.usersService.headers);
  }

  findOneProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/api/products/${id}`, this.usersService.headers);
  }

  updateProduct(id: string, product: RegisterProductForm): Observable<Product> {
    return this.http.patch<Product>(`${this.url}/api/products/${id}`, product, this.usersService.headers);
  }

  removeProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/api/products/${id}`, this.usersService.headers);
  }

  search(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/api/products/search/${term}`, this.usersService.headers);
  }
}
