/**
 * Description: Contains user authentication logic.
 *
 * Author: Luis Reyes.
 * Creation Date: Thursday 25/01/2024
 * Last Modification: Monday 29/01/2024
 * Version: v0.2.0
 * */

import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { LoginForm } from '@interfaces/login-form.interface';
import { SweetalertService } from '@services/sweetalert.service';
import { UsersService } from '@services/users.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  private readonly router = inject(Router);

  public formSubmitted = false;
  private readonly sweetalertService = inject(SweetalertService);
  private readonly usersService = inject(UsersService);

  private readonly fb = inject(FormBuilder);
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') ?? '', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  login() {
    this.usersService.login(this.loginForm.value as LoginForm)
      .subscribe({
        next: (resp) => {
          if (this.loginForm.get('remember')!.value) {
            localStorage.setItem('email', this.loginForm.get<string>('email')!.value);
          } else {
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          console.log(err.error.message[0]);
          this.sweetalertService.sweetAlert2('center', 'error', 'Error', `${err.error.message}`, true, 1500);
        }
      })
  }

}
