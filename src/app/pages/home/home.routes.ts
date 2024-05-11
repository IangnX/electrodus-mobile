import { Routes } from '@angular/router';
import { ConfigPage } from './config/config.page';

export const homeRoutes: Routes = [
  {
    path: 'configuration',
    component: ConfigPage,
    loadChildren: () => import('./config/configuration.routes').then(m => m.configurationRoutes)
  },
  {
    path: 'request',
    loadComponent: () => import('./request/request.page').then(m => m.RequestPage)
  },
  {
    path: '**',
    redirectTo: 'request',
    pathMatch: 'full',
  },
];
