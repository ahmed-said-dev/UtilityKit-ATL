import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { CreateBlankComponent } from './project-dashboard/create-blank/create-blank.component';
import { ProjectsListComponent } from './project-dashboard/projects-list/projects-list.component';
import { ServicesListComponent } from './project-dashboard/services-list/services-list.component';
import { OpenProjectComponent } from './open-project/open-project.component';
import { SchemaDataSourceComponent } from './open-project/data-source/schema-data-source/schema-data-source.component';
import { GeodatabaseDataSourceComponent } from './open-project/data-source/geodatabase-data-source/geodatabase-data-source.component';
import { ShapefileDataSourceComponent } from './open-project/data-source/shapefile-data-source/shapefile-data-source.component';
import { CadDataSourceComponent } from './open-project/data-source/cad-data-source/cad-data-source.component';
import { OracleDataSourceComponent } from './open-project/data-source/oracle-data-source/oracle-data-source.component';
import { SqlDataSourceComponent } from './open-project/data-source/sql-data-source/sql-data-source.component';
import { DestinationComponent } from './open-project/destination/destination.component';
import { ConnectToUndComponent } from './open-project/destination/connect-to-und/connect-to-und.component';
import { ViewCatalogComponent } from './open-project/data-source/view-catalog/view-catalog.component';
// import { MappingBoardComponent } from './project-mapping/mapping-board/mapping-board.component';
import { AssetGroupMappingComponent } from './asset-group-mapping/asset-group-mapping.component';
import { ManageMappingRecordComponent } from './asset-group-mapping/manage-mapping-record/manage-mapping-record.component';
import { ConfigureTerminalComponent } from './asset-group-mapping/configure-terminal/configure-terminal.component';
import { ConfigureThreeDComponent } from './asset-group-mapping/configure-three-d/configure-three-d.component';
import { FieldMappingComponent } from './asset-group-mapping/field-mapping/field-mapping.component';
import { ReplacementFilterComponent } from './asset-group-mapping/field-mapping/replacement-filter/replacement-filter.component';
import { StaticValueComponent } from './asset-group-mapping/field-mapping/static-value/static-value.component';
import { RouterModule } from '@angular/router';
import { DropdownMenusModule } from '../../_metronic/partials/content/dropdown-menus/dropdown-menus.module';
import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DataSourceComponent } from './open-project/data-source/data-source.component';
import { ConfirmationDialogComponent } from './shared/commo/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TreeModule } from 'primeng/tree';
import { UNDProject } from './atl-project-model';
import { AutoMapComponent } from './asset-group-mapping/field-mapping/auto-map/auto-map.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfigureContainmentComponent } from './asset-group-mapping/configure-containment/configure-containment.component';
import { CreateFromTemplateComponent } from './project-dashboard/create-from-template/create-from-template.component';
import { ConfigureStructureComponent } from './asset-group-mapping/configure-structure/configure-structure.component';
import { ConfigureAssemblyComponent } from './asset-group-mapping/configure-assembly/configure-assembly.component';
import { ViewExecutionPlanComponent } from './view-execution-plan/view-execution-plan.component';
import { ProjectMappingComponent } from './open-project/project-mapping/project-mapping.component';
import { MappingBoardComponent } from './mapping-board/mapping-board.component';
import { DirectAccessGuard } from './asset-group-mapping/direct-access-guard';
import { ProjectReportComponent } from './project-report/project-report.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'project-mapping',
        component: ProjectMappingComponent,
        children: [
          {
            path: ':atlId/open-project',
            component: OpenProjectComponent,
          },
          {
            path: ':atlId/project-report',
            component: ProjectReportComponent,
          },
          {
            path: ':atlId/mapping-board/:undProjectId',
            component: MappingBoardComponent,
          },
          {
            path: ':atlId/asset-group-mapping/:assetGroupId',
            component: AssetGroupMappingComponent,
            canActivate: [DirectAccessGuard],
          },
          {
            path: ':atlId/view-execution-plan',
            component: ViewExecutionPlanComponent,
          },
        ],
      },
    ]),
    NgbTooltipModule,
    NgbAccordionModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTooltipModule,
    InlineSVGModule,
    DropdownMenusModule,
    NgbDropdownModule,
    MatDialogModule,
    TreeModule,
    ProgressSpinnerModule,
    MenuModule,
    RippleModule,
    ButtonModule,
  ],

  declarations: [
    ProjectDashboardComponent,
    CreateBlankComponent,
    ServicesListComponent,
    ProjectsListComponent,
    OpenProjectComponent,
    DataSourceComponent,
    DestinationComponent,
    SchemaDataSourceComponent,
    GeodatabaseDataSourceComponent,
    ShapefileDataSourceComponent,
    CadDataSourceComponent,
    OracleDataSourceComponent,
    SqlDataSourceComponent,
    DestinationComponent,
    ConnectToUndComponent,
    ViewCatalogComponent,
    MappingBoardComponent,
    AssetGroupMappingComponent,
    ManageMappingRecordComponent,
    ConfigureTerminalComponent,
    ConfigureThreeDComponent,
    FieldMappingComponent,
    ReplacementFilterComponent,
    StaticValueComponent,
    ConfirmationDialogComponent,
    AutoMapComponent,
    ProjectMappingComponent,
    ConfigureContainmentComponent,
    CreateFromTemplateComponent,
    ConfigureStructureComponent,
    ConfigureAssemblyComponent,
    ViewExecutionPlanComponent,
    ProjectReportComponent,
  ],
})
export class AtlModule {}
