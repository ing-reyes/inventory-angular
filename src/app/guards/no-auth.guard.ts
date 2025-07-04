import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '@services/users.service';
import { catchError, map, of } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);

  return userService.validateToken().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigateByUrl('/dashboard'); // Redirige al dashboard si ya está autenticado
        return false; // Deniega el acceso a la ruta de auth
      } else {
        return true; // Permite el acceso a la ruta de auth si no está autenticado
      }
    }),
    catchError(() => {
      // Si hay un error en la validación del token, asumimos que no está autenticado
      // y permitimos el acceso a la ruta de auth (para que pueda intentar iniciar sesión)
      return of(true);
    })
  );
};
