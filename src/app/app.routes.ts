import { Routes } from '@angular/router';
import { TabsComponent } from './pages/home/tabs/tabs.component';
import { SessionGuard } from './guards/session.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: TabsComponent,
    loadChildren: () => import('./pages/home/home.routes').then( m => m.homeRoutes),
    canActivate: [SessionGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'crear-cuenta',
    loadComponent: () => import('./pages/registry/registry.page').then( m => m.RegistryPage)
  },
  //TODO:ESTO DEBO CAMBIARLO A UNA RUTA HIJA
  {
    path: 'user-profile',
    loadComponent: () => import('./pages/home/config/user-profile/user-profile.page').then(m => m.UserProfilePage),
    canActivate: [SessionGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];

/*

  {
    path: 'config',
    loadComponent: () => import('./pages/home/config/config.page').then( m => m.ConfigPage)
  },
  {
    path: 'request',
    loadComponent: () => import('./pages/home/request/request.page').then( m => m.RequestPage)
  },
  */
