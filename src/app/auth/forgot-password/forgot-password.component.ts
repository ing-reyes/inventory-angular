import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export default class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);

  public formForgot = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
  })

  forgotPassword(){
    if( this.formForgot.invalid ) return;

    // TODO: Usar Sweetalert para verificar que todo haya salido bien y redireccionar a la pantalla de revisar el correo
    console.log(this.formForgot.value);
  }
}
