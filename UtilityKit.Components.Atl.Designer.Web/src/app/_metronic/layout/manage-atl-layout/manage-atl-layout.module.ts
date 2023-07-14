import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ProjectDashboardComponent } from "src/app/modules/atl/project-dashboard/project-dashboard.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AtlModule } from "src/app/modules/atl/atl.module";

const routes: Routes = [
  {
    path: '',
    component: ProjectDashboardComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ManageAtlLayoutModule {}
