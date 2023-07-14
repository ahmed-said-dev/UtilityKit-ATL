import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPreviewRoutingModule } from './content-preview-routing.module';
import { ContentPreviewComponent } from './content-preview.component';
import { DataSourceViewCatalogComponent } from './data-source-view-catalog/data-source-view-catalog.component';
import { DestinationViewCatalogComponent } from './destination-view-catalog/destination-view-catalog.component';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { EmptyViewCatalogComponent } from './empty-view-catalog/empty-view-catalog.component';

@NgModule({
  declarations: [
    ContentPreviewComponent,
    DataSourceViewCatalogComponent,
    DestinationViewCatalogComponent,
    EmptyViewCatalogComponent,
  ],
  imports: [CommonModule, ContentPreviewRoutingModule, TreeModule, TableModule],
  exports: [ContentPreviewComponent],
})
export class ContentPreviewModule {}
