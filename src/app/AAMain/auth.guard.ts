import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from './appService';
import { UserRole } from '../usersManagement/services/user';

// Its some basic guard that dont let the wrong person enter not enabled for them sites, but only in forntend YET!

export const authGuard: CanActivateFn = () => {
  const appService = inject(AppService);
  if (appService.isLoggedIn()) {
    return true;
  }
  appService.openLoginModal();
  return inject(Router).createUrlTree(['/home']);
};

export const adminGuard: CanActivateFn = () => {
  const appService = inject(AppService);
  if (appService.isLoggedIn() && appService.getUserRole() === UserRole.ADMIN) {
    return true;
  }
  return inject(Router).createUrlTree(['/home']);
};
