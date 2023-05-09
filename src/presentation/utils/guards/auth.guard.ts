import { inject } from '@angular/core';
import { of } from 'rxjs';
import { TokenResponse } from '../../../domain/interfaces/responses';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router)

  const token = localStorage.getItem('token');
  if (token) {
    const decodeToken: TokenResponse = jwt_decode(token);

    if (decodeToken.uid) {
      return of(true);
    }
  }
  router.navigate(['/login']);
  return of(false);
};
