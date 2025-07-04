import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiAllResponse } from '@interfaces/api-response.interface';
import { Category } from '@entities/category.entity';
import { environment } from '../../environments/environment.prod';
import { UsersService } from '@services/users.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly http = inject(HttpClient);
  private readonly usersService = inject(UsersService);
  private readonly url = environment.base_url;

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${this.url}/api/categories`, category, this.usersService.headers);
  }

  loadCategories(page: number = 1, limit: number = 10): Observable<ApiAllResponse<Category>> {
    return this.http.get<ApiAllResponse<Category>>(`${this.url}/api/categories?page=${page}&limit=${limit}`, this.usersService.headers);
  }

  findOneCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/api/categories/${id}`, this.usersService.headers);
  }

  updateCategory(id: string, category: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(`${this.url}/api/categories/${id}`, category, this.usersService.headers);
  }

  removeCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.url}/api/categories/${id}`, this.usersService.headers);
  }

  search(term: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/api/categories/search/${term}`, this.usersService.headers);
  }
}
