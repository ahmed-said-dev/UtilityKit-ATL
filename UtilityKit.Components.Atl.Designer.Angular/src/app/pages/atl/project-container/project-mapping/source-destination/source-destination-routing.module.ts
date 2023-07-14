import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceDestinationComponent } from './source-destination.component';

const routes: Routes = [{ path: '', component: SourceDestinationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceDestinationRoutingModule { }
