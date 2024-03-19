import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: 'configuration',
    loadComponent: () => import('./config/config.page').then(m => m.ConfigPage)
  },
  {
    path: 'request',
    loadComponent: () => import('./request/request.page').then(m => m.RequestPage)
  }
];
