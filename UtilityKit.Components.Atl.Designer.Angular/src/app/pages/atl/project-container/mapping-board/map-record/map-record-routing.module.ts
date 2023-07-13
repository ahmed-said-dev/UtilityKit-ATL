import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureAssemblyComponent } from './configure-assembly/configure-assembly.component';
import { ConfigureContainmentComponent } from './configure-containment/configure-containment.component';
import { ConfigureStructureComponent } from './configure-structure/configure-structure.component';
import { ConfigureTerminalComponent } from './configure-terminal/configure-terminal.component';
import { ConfigureThreeDComponent } from './configure-three-d/configure-three-d.component';
import { FieldMappingComponent } from './field-mapping/field-mapping.component';
import { ManageMappingRecordComponent } from './manage-mapping-record/manage-mapping-record.component';
import { MapRecordEmptyComponent } from './map-record-empty/map-record-empty.component';
import { MapRecordListComponent } from './map-record-list/map-record-list.component';
import { MapRecordComponent } from './map-record.component';
const routes: Routes = [
  {
    path: '',
    component: MapRecordComponent,
    children: [
      {
        path: '',
        component: MapRecordEmptyComponent,
      },
      {
        path: ':assetGroupId/list',
        component: MapRecordListComponent,
      },
      {
        path: 'manageMappingRecord',
        component: ManageMappingRecordComponent,
      },
      {
        path: 'fieldMapping',
        component: FieldMappingComponent,
      },
      {
        path: 'threeD',
        component: ConfigureThreeDComponent,
      },
      {
        path: 'terminals',
        component: ConfigureTerminalComponent,
      },
      {
        path: 'containment',
        component: ConfigureContainmentComponent,
      },
      {
        path: 'structure',
        component: ConfigureStructureComponent,
      },
      {
        path: 'assembly',
        component: ConfigureAssemblyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRecordRoutingModule {}
