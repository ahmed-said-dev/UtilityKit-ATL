import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, of, Subscription, switchMap } from 'rxjs';
import {
  AssetType,
  DataSourceEntityTypeEnum,
  MapModeEnum,
} from 'src/app/pages/models/atl-project-model';
import {
  AddSchemaToATLResponce,
  DataSourceDto,
  FeatureClass,
  Table,
} from 'src/app/pages/models/data-source.model';
import { DataSourceService } from 'src/app/pages/services/data-source.service';
import {
  AddMapRecordRequest,
  DestinationDto,
  EditMapRecordRequest,
  GetMapRecordResponse,
  MapRecordDto,
  SourceDataDto,
  TerminalSettingsDto,
} from 'src/app/pages/models/map-record.model';
import { MapRecordService } from 'src/app/pages/services/map-record.service';
import {
  AssetGroupMappingData,
  AssetGroupMappingService,
} from 'src/app/pages/services/mapping-board.service';
import { MapRecordForm } from './manage-mapping-record-form';
import { ActivatedRoute } from '@angular/router';

const Empty_Map_Record: MapRecordDto = {
  id: '',
  mapMode: null,
  destinationNetworkJson: new DestinationDto(),
  sourceDataJson: new SourceDataDto(),
  aTLProjectId: '',
  dataSourceId: null,
  isActive: true,
  order: 0,
  fieldMapsJson: [],
};
@Component({
  selector: 'app-manage-mapping-record',
  templateUrl: './manage-mapping-record.component.html',
  styleUrls: ['./manage-mapping-record.component.scss'],
})
export class ManageMappingRecordComponent implements OnInit {
  @ViewChild('manageMappingRecordTemplate')
  manageMappingRecordTemplate: ManageMappingRecordComponent;
  @Input() assetGroupMappingData: AssetGroupMappingData;
  @Output() assetGroupId = new EventEmitter();

  mapRecordForm: MapRecordForm;
  MapMode = MapModeEnum;
  DataSourceEntityType = DataSourceEntityTypeEnum;
  mapRecord: MapRecordDto = new MapRecordDto();
  addSchemaToATLResponce: AddSchemaToATLResponce[] = [];
  selectedDataSource: DataSourceDto | undefined;
  tables: Table[] | undefined;
  featureClasses: FeatureClass[] | undefined;
  displayTables: boolean = true;
  saving = false;
  subscription: Subscription;
  constructor(
    private modal: NgbModal,
    private _dataSourceService: DataSourceService,
    private cdr: ChangeDetectorRef,
    private _mapRecordService: MapRecordService,
    private _toastrService: ToastrService,
    config: NgbModalConfig,
    private _spinnerService: NgxSpinnerService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,

    private _assetGroupMappingService: AssetGroupMappingService
  ) {
    config.backdrop = 'static';
  }

  ngOnInit(): void {
    this.resetCurrentMapRecord();
    this.intializeForm();
    // this._activatedRoute.params.subscribe((params) => {
    //   this.resetCurrentMapRecord();
    //   this.intializeForm();
    //   this.show(this._activatedRoute.snapshot.queryParams['id']);
    // });
  }

  private resetCurrentMapRecord() {
    if (!this.mapRecord || !this.mapRecord.id)
      this.mapRecord = Empty_Map_Record;
  }

  private intializeForm() {
    this.mapRecordForm = new MapRecordForm(this.mapRecord);
  }

  show(id?: string) {
    this._spinnerService.show();
    this.assetGroupMappingData =
      this._assetGroupMappingService.getCurrentAssetGroupMapping();

    let dataSourceObservable = this._dataSourceService.get(
      this.assetGroupMappingData.aTLProjectId
    );

    if (id) {
      let mapRecordObservable = this._mapRecordService.get(id);

      dataSourceObservable
        .pipe(
          catchError((errorMessage) => {
            return of(errorMessage);
          }),
          finalize(() => {
            this._spinnerService.hide();
          }),
          switchMap((result: AddSchemaToATLResponce[]) => {
            this.addSchemaToATLResponce = result;
            return mapRecordObservable;
          })
        )
        .subscribe((result: GetMapRecordResponse) => {
          this.mapRecord = result.mapRecord;
          this.intializeForm();
          this.setDataSourceList(this.mapRecord.dataSourceId!);
          this.displayTables =
            this.mapRecord.sourceDataJson.dataSourceEntityType ==
            DataSourceEntityTypeEnum.table;
          this._spinnerService.hide();
          this.cdr.detectChanges();
          this.modal.open(this.manageMappingRecordTemplate, { size: 'lg' });
        });
    } else {
      dataSourceObservable
        .pipe(
          catchError((errorMessage) => {
            return of(errorMessage);
          }),
          finalize(() => {
            this._spinnerService.hide();
          })
        )
        .subscribe((result: AddSchemaToATLResponce[]) => {
          this.addSchemaToATLResponce = result;
          this._spinnerService.hide();
          this.cdr.detectChanges();
          this._spinnerService.hide();
          this.modal.open(this.manageMappingRecordTemplate, { size: 'lg' });
        });
    }
    this.setDataSourceList();
  }

  setDataSourceList(datasourceId?: string) {
    // this.selectedDataSource = this.addSchemaToATLResponce.find(
    //   (ds) => ds.id == datasourceId
    // );
    this.tables = this.addSchemaToATLResponce.find(
      (ds) => ds.dataSource.id == datasourceId
    )?.dataSource.dataSourceSchemaJson.tables;
    this.featureClasses = this.addSchemaToATLResponce.find(
      (ds) => ds.dataSource.id == datasourceId
    )?.dataSource.dataSourceSchemaJson.featureClasses;
  }

  onChangeDataSource(event: any) {
    let datasourceId = event.target.value;
    this.setDataSourceList(datasourceId);
    this.displayTables = true;
    this.mapRecordForm.controls['dataSourceEntityName'].setValue(null);
    this.mapRecordForm.controls['dataSourceEntityType'].setValue(null);
  }

  onChangeDataSourceEntityType(event: any) {
    let dataSourceEntityType = event.target.value;
    if (dataSourceEntityType == DataSourceEntityTypeEnum.table) {
      this.displayTables = true;
      this.mapRecordForm.controls['dataSourceEntityName'].setValue(null);
    } else {
      this.displayTables = false;
      this.mapRecordForm.controls['dataSourceEntityName'].setValue(null);
    }
  }

  save() {
    this.saving = true;

    this.mapRecord = this.mapRecordForm.getFormValue();

    let assetType = this._assetGroupMappingService
      .getCurrentAssetGroupMapping()
      .assetTypes?.find(
        (at: AssetType) =>
          at.id == this.mapRecordForm.controls['assetTypeId'].value
      );
    this.mapRecord.destinationNetworkJson.assetTypeName = assetType?.name;
    if (this.mapRecord.id) {
      let editMapRecordRequest = new EditMapRecordRequest();
      editMapRecordRequest.mapRecord = this.mapRecord;
      this._mapRecordService
        .update(editMapRecordRequest)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe({
          next: () => {
            this.close();
            this.saving = false;
            this.assetGroupId.emit();

            this._toastrService.info(
              'Map record has been updated Successfully',
              'info'
            );
          },
          error: (e) => {
            this._toastrService.error(e.error, 'Error');
          },
        });
    } else {
      this.mapRecord.destinationNetworkJson.assetTypeCode = assetType?.code!;
      this.mapRecord.aTLProjectId = this.assetGroupMappingData.aTLProjectId;

      this.mapRecord.destinationNetworkJson.networkId =
        this.assetGroupMappingData.networkId;

      this.mapRecord.destinationNetworkJson.networkName =
        this.assetGroupMappingData.networkName;

      this.mapRecord.destinationNetworkJson.assetTableId =
        this.assetGroupMappingData.assetTableId;

      this.mapRecord.destinationNetworkJson.assetTableName =
        this.assetGroupMappingData.assetTableName;

      this.mapRecord.destinationNetworkJson.assetGroupId =
        this.assetGroupMappingData.assetGroupId;

      this.mapRecord.destinationNetworkJson.assetGroupName =
        this.assetGroupMappingData.assetGroupName;

      this.mapRecord.destinationNetworkJson.assetGroupCode =
        this.assetGroupMappingData.assetGroupCode;

      this.mapRecord.destinationNetworkJson.assetTableType =
        this.assetGroupMappingData.assetTableType;

      let addMapRecordRequest = new AddMapRecordRequest();
      addMapRecordRequest.mapRecord = this.mapRecord;
      this._mapRecordService
        .add(addMapRecordRequest)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe({
          next: () => {
            this.close();
            this.saving = false;
            this.assetGroupId.emit();

            this._toastrService.success(
              'Map record has been added Successfully',
              'Success'
            );
            this._assetGroupMappingService.updatemapRecordAddedMsg(true);
          },
          error: (e) => {
            this._toastrService.error(e.error.Errors, 'Error');
          },
        });
    }
  }

  close() {
    this.modal.dismissAll();
    this.mapRecordForm.reset();
    this.mapRecord = new MapRecordDto();
  }

  get dataSourceId() {
    return this.mapRecordForm.get('dataSourceId');
  }

  get mapMode() {
    return this.mapRecordForm.get('mapMode');
  }

  get assetTypeId() {
    return this.mapRecordForm.get('assetTypeId');
  }
  get dataSourceEntityName() {
    return this.mapRecordForm.get('dataSourceEntityName');
  }
  get dataSourceEntityType() {
    return this.mapRecordForm.get('dataSourceEntityType');
  }
}
