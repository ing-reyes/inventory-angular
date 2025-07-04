import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export default class ResetPasswordComponent {
  private readonly fb = inject(FormBuilder);
  
    public formResetPassword = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
    })
  
    resetPassword(){
      if( this.formResetPassword.invalid ) return;
  
      // TODO: Usar Sweetalert para verificar que todo haya salido bien y redireccionar a la pantalla de revisar el correo
      console.log(this.formResetPassword.value);
    }
}
