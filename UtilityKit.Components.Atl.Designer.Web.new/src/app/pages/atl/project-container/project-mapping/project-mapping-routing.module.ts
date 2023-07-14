import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectMappingComponent } from './project-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectMappingComponent,
    children: [
      {
        path: 'content-preview',
        loadChildren: () =>
          import('./content-preview/content-preview.module').then(
            (m) => m.ContentPreviewModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectMappingRoutingModule {}
