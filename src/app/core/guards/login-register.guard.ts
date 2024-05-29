import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const loginRegisterGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('eToken')) {
    router.navigate(['/notes']);
    return false;
  }
  return true;
};
