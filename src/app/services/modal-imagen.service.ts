import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { ModalType } from '../types/types-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _hiddenModal:boolean = true;

  public base_url = environment.base_url;
  public newImage: EventEmitter<string> = new EventEmitter<string>();
  public newDocument: EventEmitter<string> = new EventEmitter<string>();

  public type: ModalType = 'bienestar-social';

  public id: string = '';
  public img: string = '';
  public doc:string = '';

  constructor() { }

  get hiddenModal(): boolean {
    return this._hiddenModal;
  }
  
  openModal(
    type: ModalType,
    id: string,
    img: string = 'no-image.png',
    ) {

    this._hiddenModal = false;
    this.type = type;
    this.id = id;
    // {{host-dev}}/api/loads/images/users/771a20a6-1eff-4548-a711-7208389064afa.
    if( img.includes('https') ){
      this.img = img;
    }else{
      this.img = `${this.base_url}/api/bienestar-social/loads/${ img }`;
    }
  }

  openModalDocument(
    type: ModalType,
    id: string,
    doc: string = 'default.pdf',
    ) {

    this._hiddenModal = false;
    this.type = type;
    this.id = id;
    // {{host-dev}}/api/loads/images/users/771a20a6-1eff-4548-a711-7208389064afa.
    if( doc.includes('https') ){
      this.doc = doc;
    }else{
      this.doc = `${this.base_url}/api/bienestar-social/loads/${ doc }`;
    }
  }

  closeModal(){
    this._hiddenModal = true;
  }
}
