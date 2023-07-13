import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { MapModeEnum } from '../atl-project-model';
import {
  GetMapRecordDto,
  GetMapRecordsByAssetGroupIdResponce,
} from '../map-record.model';
import { MapRecordService } from '../map-record.service';

@Component({
  selector: 'app-view-execution-plan',
  templateUrl: './view-execution-plan.component.html',
  styleUrls: ['./view-execution-plan.component.scss'],
})
export class ViewExecutionPlanComponent implements OnInit {
  mapRecords: GetMapRecordDto[] = [];
  atlId: string;
  assetGroupId: string;
  MapModeEnum = MapModeEnum;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _mapRecordService: MapRecordService, // inject service,
    private cdr: ChangeDetectorRef,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.atlId = this._activatedRoute.snapshot.params['atlId'];
    this.assetGroupId = this._activatedRoute.snapshot.params['assetGroupId'];
    this.getAllMapRecordsForExecutionPlan(this.atlId);
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
      });
  }
}
