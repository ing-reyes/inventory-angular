import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { SweetalertService } from '../../../services/sweetalert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, delay } from 'rxjs';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ModalImagenService } from '@services/modal-imagen.service';
import { BienestarSocialGestion } from '@entities/bienestar-social-gestion.entity';
import { BienestarSocialGestionService } from '@services/bienestar-social-gestion.service';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-bienestar-social-gestion',
  standalone: true,
  imports: [ CommonModule, BreadcrumbsComponent ],
  templateUrl: './bienestar-social-gestion.html',
  styles: ``
})
export default class BienestarSocialGestionComponent implements OnInit, OnDestroy {
  private readonly bienestarSocialGestionService = inject( BienestarSocialGestionService );
  private readonly sweetalertService = inject( SweetalertService );
  private readonly modalImagenService = inject( ModalImagenService );

  public bienestarSocial = signal<BienestarSocialGestion[]>([]);
  public bienestarSocialTemp = signal<BienestarSocialGestion[]>([]);
  public totalBienestarSocial = signal<number>(0);
  public page = signal<number>(1);
  public offset = signal<number>(0);
  public total = signal<number>(1);
  public limit = signal<number>(1);
  public loading = signal<boolean>(true);

  // sanitize
  public sanitizer = inject( DomSanitizer );

  public docSubs: Subscription = new Subscription();

  ngOnInit(): void {

    this.loadBienestarSocial();
    this.docSubs = this.modalImagenService.newDocument
    .pipe( delay( 100 ) )
    .subscribe( doc => this.loadBienestarSocial());
  }
  ngOnDestroy(): void {
    this.docSubs.unsubscribe();
  }

  loadBienestarSocial(){
    this.loading.update(()=>true);
    this.bienestarSocialGestionService.loadBienestarSocial( this.offset() ).subscribe(resp=>{
      const { total, limit, page, data } = resp;
      this.limit.set(limit);
      this.bienestarSocial.set(data);
      this.bienestarSocialTemp.set(data);
      this.totalBienestarSocial.set(total)
      this.page.set(page);
      this.total.set(total);
      // this.docUrl = this.nternshipService.;

      this.loading.update(()=>false);
    });
  }

  changePage(value: number) {
    this.page.update((current) => current + value);
    if (this.page() < 1) {
      this.page.update(() => 1);
      return;
    };
    if (this.page() > Math.ceil(this.totalBienestarSocial() / this.limit())) {
      this.page.update((current) => current - value);
      return;
    }

    this.loadBienestarSocial();
  }

  search( term: string ){
    if( term.length === 0 ) {
      this.bienestarSocial.update(()=>this.bienestarSocialTemp())
      return;
    }

    this.bienestarSocialGestionService.search(term)
    .subscribe(resp=>{
      this.bienestarSocial.set(resp);
    })
  }

  async createBienestarSocial(){

    const { value: formValues } = await Swal.fire({
      title: "Crear pasantía",
      html: `
        <input id="swal-input1" class="swal2-input" required placeholder="Título" >
        <input id="swal-input2" class="swal2-input" required placeholder="Año" >
        <input id="swal-input3" class="swal2-input" required placeholder="Resúmen" >
      `,
      confirmButtonText: 'Registrar',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById("swal-input1") as HTMLInputElement)?.value,
          (document.getElementById("swal-input2") as HTMLInputElement)?.value,
          (document.getElementById("swal-input3") as HTMLInputElement)?.value,
        ];
      }
    });
    if (formValues) {
      const [
        title,
        year,
        summary ] = formValues;

        const bienestar = {
          title,
          year,
          summary
        }
      this.bienestarSocialGestionService.createBienestarSocial( bienestar )
      .subscribe({
        next: () => {
          this.sweetalertService.sweetAlert2('center', 'success', 'Success', `Pasantía creada exitosamente`, true, 2500);
          this.loadBienestarSocial();
        },
        error: (err) => {
          this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.error}`, true, 2500);
        }
      });
    }
  }

  async updateBienestarSocial( bienestar: BienestarSocialGestion ){

    const { value: formValues } = await Swal.fire({
      title: "Editar Registro",
      html: `
        <input id="swal-input1" class="swal2-input" placeholher="Título" value="${ bienestar.title }">
        <input id="swal-input2" class="swal2-input" placeholher="Aço" value="${ bienestar.year }">
        <input id="swal-input3" class="swal2-input" placeholher="Resúmen" value="${ bienestar.summary || 'sin resumen'}">
      `,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById("swal-input1") as HTMLInputElement)?.value,
          (document.getElementById("swal-input2") as HTMLInputElement)?.value,
          (document.getElementById("swal-input3") as HTMLInputElement)?.value,
        ];
      }
    });
    if (formValues) {
      const [ title, year, summary ] = formValues;
      const bienestarData = {
        id: bienestar.id,
        title,
        year,
        summary,
      }
      this.bienestarSocialGestionService.updateBienestarSocial( bienestarData ).subscribe({
        next: () => {
          this.sweetalertService.sweetAlert2('center', 'success', 'Success', `Pasantiía actualizada`, true, 2500);
          this.loadBienestarSocial();
        },
        error: (err) => {
          this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.error}`, true, 2500);
        }
      });
    }
  }

  removeBienestarSocial(bienestar: BienestarSocialGestion){

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta accion no se puede revertir!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bienestarSocialGestionService.removeBienestarSocial(bienestar.id).subscribe();
        this.loadBienestarSocial();
        this.sweetalertService.sweetAlert2('center', 'success', 'Success', `Registro eliminado`, true, 2500);
      }
    });
  }

  openModalDocument(bienestar:BienestarSocialGestion){
    this.modalImagenService.openModalDocument( 'bienestar-social', bienestar.id, bienestar.doc );
  }
}
