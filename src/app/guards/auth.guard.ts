import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

import { UsersService } from '@services/users.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);

  return userService.validateToken().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true; // Permite el acceso si está autenticado
      } else {
        router.navigateByUrl('/login'); // Redirige a login si no está autenticado
        return false; // Deniega el acceso
      }
    }),
    catchError(() => {
      router.navigateByUrl('/login'); // En caso de error en la validación, redirige a login
      return of(false); // Deniega el acceso
    })
  );
};
