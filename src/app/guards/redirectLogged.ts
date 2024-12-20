import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const redirectLogged = () => {
  const router = inject(Router);
  if (typeof window !== 'undefined' && window.localStorage) {
    if (!localStorage.getItem('user_token')) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }
  router.navigate(['/']);
  return false;
};
