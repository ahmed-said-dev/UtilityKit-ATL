import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceDestinationRoutingModule } from './source-destination-routing.module';
import { SourceDestinationComponent } from './source-destination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ViewCatalogComponent } from './data-source/view-catalog/view-catalog.component';
import { SchemaDataSourceComponent } from './data-source/schema-data-source/schema-data-source.component';
import { DataSourceComponent } from './data-source/data-source.component';
import { ConnectToUndComponent } from './destination/connect-to-und/connect-to-und.component';
import { DestinationComponent } from './destination/destination.component';
import { NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SourceDestinationComponent,
    DestinationComponent,
    ConnectToUndComponent,
    DataSourceComponent,
    SchemaDataSourceComponent,
    ViewCatalogComponent,
  ],
  imports: [
    CommonModule,
    SourceDestinationRoutingModule,
    InlineSVGModule,
    TreeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTooltipModule
  ],
  exports: [SourceDestinationComponent],
})
export class SourceDestinationModule {}
