import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectMappingRoutingModule } from './project-mapping-routing.module';
import { ProjectMappingComponent } from './project-mapping.component';
import { SourceDestinationModule } from './source-destination/source-destination.module';
import { ContentPreviewModule } from './content-preview/content-preview.module';
import { TableModule } from 'primeng/table';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [ProjectMappingComponent],
  imports: [
    CommonModule,
    ProjectMappingRoutingModule,
    SourceDestinationModule,
    ContentPreviewModule,
    TableModule,
    InlineSVGModule,
  ],
})
export class ProjectMappingModule {}
