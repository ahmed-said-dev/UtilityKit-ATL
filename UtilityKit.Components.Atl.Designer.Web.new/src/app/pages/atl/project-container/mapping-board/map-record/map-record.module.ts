import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRecordRoutingModule } from './map-record-routing.module';
import { MapRecordComponent } from './map-record.component';
import { ConfigureTerminalComponent } from './configure-terminal/configure-terminal.component';
import { ManageMappingRecordComponent } from './manage-mapping-record/manage-mapping-record.component';
import { ConfigureThreeDComponent } from './configure-three-d/configure-three-d.component';
import { ConfigureStructureComponent } from './configure-structure/configure-structure.component';
import { ConfigureContainmentComponent } from './configure-containment/configure-containment.component';
import { TreeModule } from 'primeng/tree';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigureAssemblyComponent } from './configure-assembly/configure-assembly.component';
import { FieldMappingComponent } from './field-mapping/field-mapping.component';
import { StaticValueComponent } from './field-mapping/static-value/static-value.component';
import { ReplacementFilterComponent } from './field-mapping/replacement-filter/replacement-filter.component';
import { AutoMapComponent } from './field-mapping/auto-map/auto-map.component';
import { MapRecordListComponent } from './map-record-list/map-record-list.component';
import { MapRecordEmptyComponent } from './map-record-empty/map-record-empty.component';

@NgModule({
  declarations: [
    MapRecordComponent,
    ConfigureTerminalComponent,
    ManageMappingRecordComponent,
    ConfigureThreeDComponent,
    ConfigureStructureComponent,
    ConfigureContainmentComponent,
    ConfigureAssemblyComponent,
    FieldMappingComponent,
    StaticValueComponent,
    ReplacementFilterComponent,
    AutoMapComponent,
    MapRecordListComponent,
    MapRecordEmptyComponent,
  ],
  imports: [
    CommonModule,
    MapRecordRoutingModule,
    TreeModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
  ],
  exports: [MapRecordComponent],
})
export class MapRecordModule {}
