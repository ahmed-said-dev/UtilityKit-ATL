import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'atl',
    loadChildren: () => import('./atl/atl.module').then((m) => m.AtlModule),
    data: { layout: 'dark-header' },
  },
  {
    path: '',
    redirectTo: '/atl',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
