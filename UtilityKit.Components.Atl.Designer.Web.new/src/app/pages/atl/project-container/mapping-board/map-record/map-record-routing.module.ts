import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureThreeDComponent } from './configure-three-d/configure-three-d.component';
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
        path: 'threeD',
        component: ConfigureThreeDComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRecordRoutingModule {}
