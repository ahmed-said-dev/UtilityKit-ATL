import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPreviewRoutingModule } from './content-preview-routing.module';
import { ContentPreviewComponent } from './content-preview.component';
import { DataSourceViewCatalogComponent } from './data-source-view-catalog/data-source-view-catalog.component';
import { DestinationViewCatalogComponent } from './destination-view-catalog/destination-view-catalog.component';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { EmptyViewCatalogComponent } from './empty-view-catalog/empty-view-catalog.component';
// import { FieldsComponent } from './destination-view-catalog/fields/fields.component';
// import { AssetsGroupsComponent } from './destination-view-catalog/assets-groups/assets-groups.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ContentPreviewComponent,
    DataSourceViewCatalogComponent,
    DestinationViewCatalogComponent,
    EmptyViewCatalogComponent,
    // FieldsComponent,
    // AssetsGroupsComponent,
  ],
  imports: [
    CommonModule,
    ContentPreviewRoutingModule,
    TreeModule,
    TableModule,
    InlineSVGModule,
    NgbAccordionModule
  ],
  exports: [ContentPreviewComponent],
})
export class ContentPreviewModule {}
