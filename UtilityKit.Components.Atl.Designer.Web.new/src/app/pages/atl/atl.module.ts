import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlRoutingModule } from './atl-routing.module';
import { AtlComponent } from './atl.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { TableModule } from 'primeng/table';
import { CreateBlankComponent } from './create-blank/create-blank.component';
import { NgbModalConfig, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharingModule } from 'src/app/shared/modules/share.module';

@NgModule({
  declarations: [
    AtlComponent,
    LandingPageComponent,
    ProjectListComponent,
    CreateBlankComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtlRoutingModule,
    InlineSVGModule,
    TableModule,
    NgbTooltipModule,
    SharingModule
  ],
  exports: [],
})
export class AtlModule {
  constructor(config: NgbModalConfig) {
    config.backdrop = 'static';
    config.centered = true;
  }
}
