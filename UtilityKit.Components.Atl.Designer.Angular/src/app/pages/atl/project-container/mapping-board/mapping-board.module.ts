import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MappingBoardRoutingModule } from './mapping-board-routing.module';
import { MappingBoardComponent } from './mapping-board.component';
import { AssetGroupComponent } from './asset-group/asset-group.component';
import { MapRecordModule } from './map-record/map-record.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from "../../../../shared/modules/share.module";

@NgModule({
    declarations: [MappingBoardComponent, AssetGroupComponent],
    imports: [
        CommonModule,
        MappingBoardRoutingModule,
        MapRecordModule,
        InlineSVGModule,
        FormsModule,
        NgbAccordionModule,
        NgbPopoverModule,
        SharingModule
    ]
})
export class MappingBoardModule {}
