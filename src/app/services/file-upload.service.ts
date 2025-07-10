import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ModalType } from './../types/types-modal';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  public http = inject(HttpClient);
  public base_url = environment.base_url;

  constructor() {}

  updateFile(
    file: File,
    type:ModalType,
    id: string
  ) {
    const formData:FormData = new FormData();
    formData.append('file', file);
    const url = `${this.base_url}/api/bienestar-social/upload/${ id }`;
    return this.http.post( url, formData, { headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      id: id
    } } );
  }
}
