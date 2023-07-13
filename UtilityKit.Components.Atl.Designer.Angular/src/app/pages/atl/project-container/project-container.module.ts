import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectContainerRoutingModule } from './project-container-routing.module';
import { ProjectContainerComponent } from './project-container.component';
import { ProjectCompletenessValueComponent } from 'src/app/shared/components/project-completeness-value/project-completeness-value.component';
import { TableModule } from 'primeng/table';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharingModule } from 'src/app/shared/modules/share.module';
import { ProjectReportComponent } from './context/project-report/project-report.component';
import { ViewExecutionPlanComponent } from './context/view-execution-plan/view-execution-plan.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProjectContainerComponent,
    ProjectReportComponent,
    ProjectCompletenessValueComponent,
    ViewExecutionPlanComponent,
  ],
  imports: [
    CommonModule,
    ProjectContainerRoutingModule,
    TableModule,
    InlineSVGModule,
    SharingModule,
    NgbTooltipModule,
  ],
})
export class ProjectContainerModule {}
