import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingListGuard } from 'src/app/shared/guards/landing-list.guard';
import { NgbModalDismissAllGuard } from 'src/app/shared/guards/ngb-modal-dismiss-all-guard';
// import { LandingListGuard } from 'src/app/shared/guards/landing-list.guard';
import { AtlComponent } from './atl.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    component: AtlComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
        canActivate: [LandingListGuard],
      },
      {
        path: 'project-list',
        component: ProjectListComponent,
      },

      {
        path: 'project-container',
        loadChildren: () =>
          import('./project-container/project-container.module').then(
            (m) => m.ProjectContainerModule
          ),
      },
    ],
    canActivateChild: [NgbModalDismissAllGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AtlRoutingModule {}
