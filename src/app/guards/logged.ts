import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof window !== 'undefined' && window.localStorage) {
    if (localStorage.getItem('user_token')) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }
  router.navigate(['/login']);
  return false;
};
