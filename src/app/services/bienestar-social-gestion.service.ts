import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable, map } from 'rxjs';
import { UsersService } from './users.service';
import { BienestarSocialGestion } from '@entities/bienestar-social-gestion.entity';
import { ApiAllResponse } from '@interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BienestarSocialGestionService {
  private readonly http = inject(HttpClient);
  private readonly base_url = environment.base_url;
  private readonly userService = inject(UsersService);

  constructor() { }

  public loadBienestarSocial(page: number = 0, limit: number = 10): Observable<ApiAllResponse<BienestarSocialGestion>> {
    const url = `${this.base_url}/api/bienestar-social?offset=${page}&limit=${limit}`;

    return this.http.get<ApiAllResponse<BienestarSocialGestion>>(url, this.userService.headers)
      .pipe(
        map(resp => {
          const bienestar = resp.data.map((bienestar) => {
            const { id, title, year, summary, doc, createAt, updateAt, active } = bienestar;
            return new BienestarSocialGestion(id, title, year, summary, doc, createAt, updateAt, active);
          });
          return {
            offset: resp.offset,
            limit: resp.limit,
            total: resp.total,
            page: resp.page,
            data: bienestar,
          };
        })
      )
  }

  createBienestarSocial(bienestar: { title: string, year: number, summary: string }) {

    const url = `${this.base_url}/api/bienestar-social`;
    return this.http.post(url, bienestar, this.userService.headers);
  }

  updateBienestarSocial(bienestar: { id: string, title: string, year: number, summary: string }) {

    const url = `${this.base_url}/api/bienestar-social/${bienestar.id}`;
    return this.http.put(url, bienestar, this.userService.headers);
  }

  removeBienestarSocial(id: string) {

    const url = `${this.base_url}/api/bienestar-social/${id}`;
    return this.http.delete(url, this.userService.headers);
  }

  search(term: string): Observable<BienestarSocialGestion[]> {
    return this.http.get<BienestarSocialGestion[]>(`${this.base_url}/api/bienestar-social/search/${term}`, this.userService.headers);
  }

}
