import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../entities/user.entity';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { ApiAllResponse } from '../interfaces/api-response.interface';
import { UserRole } from '@enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  public url = environment.base_url;
  public user = signal<User>(new User('', '', '', '', UserRole.USER, true, new Date(), new Date()));

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  get token() {
    return localStorage.getItem('token') ?? '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
  }

  validateToken(): Observable<boolean> {
    return this.http.get<{ user: User, token: string }>(`${this.url}/api/auth/renew`, { headers: { 'Authorization': `Bearer ${this.token}`, 'renew': this.token } })
      .pipe(
        map(({ user, token }) => {
          localStorage.setItem('token', token);
          const { id, name, email, role, active } = user;
          this.user.update(() => new User(id, name, email, '', role, active, new Date(), new Date()));
          return true;
        }),
        catchError(() => of(false))
      )
  }

  createUser(user: Partial<User>) {
    return this.http.post<User>(`${this.url}/api/users`, user, this.headers);
  }

  login(formData: LoginForm): Observable<{ user: User, token: string }> {
    return this.http.post<{ user: User, token: string }>(`${this.url}/api/auth/login`, formData)
      .pipe(
        tap((resp: { user: User, token: string }) => {
          localStorage.setItem('token', resp.token);
          this.user.update(() => new User(resp.user.id, resp.user.name, resp.user.email, '', resp.user.role, resp.user.active, new Date(), new Date()));
        })
      )
  }

  loadUsers(page: number = 1, limit: number = 10): Observable<ApiAllResponse<User>> {

    const url = `${this.url}/api/users?page=${page}&limit=${limit}`;
    return this.http.get<ApiAllResponse<User>>(url, this.headers)
      .pipe(
        map((resp) => {
          const users = resp.data.map(
            user => new User(user.id, user.name, user.email, '', user.role, user.active, new Date(), new Date())
          )
          return {
            offset: resp.offset,
            limit: resp.limit,
            page: resp.page,
            total: resp.total,
            data: users
          };
        })
      );
  }

  deleteUser(id: string) {
    const url = `${this.url}/api/users/${id}`;
    return this.http.delete(url, this.headers);
  }

  updateRole(id: string, role: UserRole) {

    const url = `${this.url}/api/users/${id}`;
    return this.http.patch(url, { role }, this.headers);
  }

  search(term: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/api/users/search/${term}`, this.headers);
  }
}
