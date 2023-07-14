import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { MapModeEnum } from 'src/app/pages/models/atl-project-model';
import {
  GetMapRecordDto,
  GetMapRecordsByAssetGroupIdResponce,
} from 'src/app/pages/models/map-record.model';
import { MapRecordService } from 'src/app/pages/services/map-record.service';

@Component({
  selector: 'app-view-execution-plan',
  templateUrl: './view-execution-plan.component.html',
  styleUrls: ['./view-execution-plan.component.scss'],
})
export class ViewExecutionPlanComponent implements OnInit {
  @ViewChild('viewExecutionPlanTemplate', { static: false })
  viewExecutionPlanTemplate: ViewExecutionPlanComponent;

  mapRecords: GetMapRecordDto[] = [];
  atlId: string;
  MapModeEnum = MapModeEnum;
  constructor(
    private _mapRecordService: MapRecordService, // inject service,
    private cdr: ChangeDetectorRef,
    private _spinnerService: NgxSpinnerService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {}

  show(aTLProjectId: any) {
    this.getAllMapRecordsForExecutionPlan(aTLProjectId);
  }
  getAllMapRecordsForExecutionPlan(atlId: string) {
    this._spinnerService.show();
    this._mapRecordService
      .getAllMapRecordsForExecutionPlan(atlId)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((result: GetMapRecordsByAssetGroupIdResponce) => {
        this._spinnerService.hide();
        this.mapRecords = result.getMapRecords;
        this.cdr.detectChanges();
        this.modal.open(this.viewExecutionPlanTemplate, { size: 'xl' });
      });
  }
  close() {
    this.modal.dismissAll();
  }
}
