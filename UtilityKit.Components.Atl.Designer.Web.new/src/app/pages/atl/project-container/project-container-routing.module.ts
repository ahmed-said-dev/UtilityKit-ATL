import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectContainerComponent } from './project-container.component';
import { ProjectReportComponent } from './project-report/project-report.component';

const routes: Routes = [
  {
    path: ':atlId',
    component: ProjectContainerComponent,
    children: [
      {
        path: 'context',
        loadChildren: () =>
          import('./context/context.module').then((m) => m.ContextModule),
      },
      {
        path: 'project-mapping',
        loadChildren: () =>
          import('./project-mapping/project-mapping.module').then(
            (m) => m.ProjectMappingModule
          ),
      },
      {
        path: 'mapping-board/:undId',
        loadChildren: () =>
          import('./mapping-board/mapping-board.module').then(
            (m) => m.MappingBoardModule
          ),
      },
    ],
  },
  {
    path: ':atlId/project-report',
    component: ProjectReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectContainerRoutingModule {}
