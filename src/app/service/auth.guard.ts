import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let account = sessionStorage.getItem('account');
  if (account == 'true') {
    return true;
  } else {
    window.location.href = '/';
    return false;
  }
};
