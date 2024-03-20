import { Routes } from '@angular/router';

export const configurationRoutes: Routes = [
  {
    path: 'user-profile',
    loadComponent: () => import('./user-profile/user-profile.page').then(m => m.UserProfilePage)
  }
];
