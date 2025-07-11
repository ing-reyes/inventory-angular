import { Component, inject } from '@angular/core';
import { SweetalertService } from '../../services/sweetalert.service';
import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { ModalType } from '../../types/types-modal';

@Component({
  selector: 'app-modal-document',
  standalone: true,
  imports: [],
  templateUrl: './modal-document.component.html',
  styles: ``
})
export class ModalDocumentComponent {

  public modalImagenService = inject( ModalImagenService );
  private readonly fileUploadService = inject( FileUploadService );
  private readonly sweetalertService = inject( SweetalertService );
  public documentSelected?:File;
  public docTemp = '';

  closeModal(){
    this.modalImagenService.closeModal();
    this.docTemp = '';
  }

  fileChangeEvent( event: Event ) {
    this.documentSelected = (event.target as HTMLInputElement).files![0];
    if( !this.documentSelected ) {
      return this.docTemp = null!;
    };

    const reader = new FileReader();
    reader.readAsDataURL( this.documentSelected );
    reader.onload = () => {
      this.docTemp = reader.result as string;
    }
  }

  updateDocument(){
    const id = this.modalImagenService.id;
    const type:ModalType = this.modalImagenService.type;

    this.fileUploadService.updateFile( this.documentSelected!, type, id )
    .subscribe({
      next: ( resp:any ) => { // todo: add interface
        this.sweetalertService.sweetAlert2( 'center' , 'success','Success' ,'Document updated successfully', true, 2500);
        this.modalImagenService.newDocument.emit( resp.filename );
        this.closeModal();
      },
      error: (err)=>{
        this.sweetalertService.sweetAlert2( 'center' , 'error','Error' ,`${err.error.error}`, true, 2500);
      }
    })
  }

}
