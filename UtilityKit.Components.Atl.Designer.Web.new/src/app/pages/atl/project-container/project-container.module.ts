import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectContainerRoutingModule } from './project-container-routing.module';
import { ProjectContainerComponent } from './project-container.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { ProjectCompletenessValueComponent } from 'src/app/shared/components/project-completeness-value/project-completeness-value.component';
import { TableModule } from 'primeng/table';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharingModule } from 'src/app/shared/modules/share.module';

@NgModule({
  declarations: [
    ProjectContainerComponent,
    ProjectReportComponent,
    ProjectCompletenessValueComponent,
  ],
  imports: [
    CommonModule,
    ProjectContainerRoutingModule,
    TableModule,
    InlineSVGModule,
    SharingModule,
  ],
})
export class ProjectContainerModule {}
