import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../modules/atl/atl.module').then((m) => m.AtlModule),
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
