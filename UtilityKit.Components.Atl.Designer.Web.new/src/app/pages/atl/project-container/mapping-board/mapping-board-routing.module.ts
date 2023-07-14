import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappingBoardComponent } from './mapping-board.component';

const routes: Routes = [
  {
    path: '',
    component: MappingBoardComponent,
    children: [
      {
        path: 'map-record',
        loadChildren: () =>
          import('./map-record/map-record.module').then(
            (m) => m.MapRecordModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MappingBoardRoutingModule {}
