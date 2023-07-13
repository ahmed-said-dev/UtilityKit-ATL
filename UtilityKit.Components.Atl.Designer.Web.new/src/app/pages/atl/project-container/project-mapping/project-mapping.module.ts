import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectMappingRoutingModule } from './project-mapping-routing.module';
import { ProjectMappingComponent } from './project-mapping.component';
import { SourceDestinationModule } from './source-destination/source-destination.module';
import { ContentPreviewModule } from './content-preview/content-preview.module';

@NgModule({
  declarations: [ProjectMappingComponent],
  imports: [
    CommonModule,
    ProjectMappingRoutingModule,
    SourceDestinationModule,
    ContentPreviewModule,
  ],
})
export class ProjectMappingModule {}
