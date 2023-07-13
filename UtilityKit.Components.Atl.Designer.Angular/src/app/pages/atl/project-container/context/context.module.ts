import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContextRoutingModule } from './context-routing.module';
import { ContextComponent } from './context.component';
import { TableModule } from 'primeng/table';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [ContextComponent],
  imports: [
    CommonModule,
    ContextRoutingModule,
    TableModule,
    InlineSVGModule,
    NgbTooltipModule,
  ],
})
export class ContextModule {}
