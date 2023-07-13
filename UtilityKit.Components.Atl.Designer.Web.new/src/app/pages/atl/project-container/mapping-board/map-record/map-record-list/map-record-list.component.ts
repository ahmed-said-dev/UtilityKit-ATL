import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, of, Subscription } from 'rxjs';
import { SwalService } from 'src/app/shared/services/Swal.service';
import {
  AssetTableTypeEnum,
  ContainmentSettingsInputDto,
  MapModeEnum,
  StructureAttachmentSettingsInputDto,
} from 'src/app/pages/models/atl-project-model';
import {
  GetMapRecordDto,
  GetMapRecordsByAssetGroupIdResponce,
} from 'src/app/pages/models/map-record.model';
import { MapRecordService } from 'src/app/pages/services/map-record.service';
import {
  AssetGroupMappingData,
  AssetGroupMappingService,
} from 'src/app/pages/services/mapping-board.service';
import * as _lodash from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigureContainmentComponent } from '../configure-containment/configure-containment.component';
import { ConfigureThreeDComponent } from '../configure-three-d/configure-three-d.component';
import { FieldMappingComponent } from '../field-mapping/field-mapping.component';
import { ManageMappingRecordComponent } from '../manage-mapping-record/manage-mapping-record.component';
import { ConfigureStructureComponent } from '../configure-structure/configure-structure.component';
import { ConfigureAssemblyComponent } from '../configure-assembly/configure-assembly.component';
import { ConfigureTerminalComponent } from '../configure-terminal/configure-terminal.component';
import { MenuComponent } from 'src/app/_metronic/kt/components';
import { ProjectReportService } from 'src/app/pages/services/project-report.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-map-record-list',
  templateUrl: './map-record-list.component.html',
  styleUrls: ['./map-record-list.component.scss'],
})
export class MapRecordListComponent implements OnInit {
  @Input() toggleBtnClass: string = '';
  @Input() toggleBtnIconClass: string = 'svg-icon-2';
  @Input() menuPlacement: string = 'bottom-end';
  @Input() menuTrigger: string = "{default: 'click', lg: 'hover'}";

  @ViewChild('configureTerminalComponent')
  configureTerminalComponent: ConfigureTerminalComponent;
  @ViewChild('configureThreeDComponent')
  configureThreeDComponent: ConfigureThreeDComponent;
  @ViewChild('manageMappingRecordComponent')
  manageMappingRecordComponent: ManageMappingRecordComponent;
  @ViewChild('fieldMappingComponent')
  fieldMappingComponent: FieldMappingComponent;
  @ViewChild('configureContainmentComponent')
  configureContainmentComponent: ConfigureContainmentComponent;
  @ViewChild('configureStructureComponent')
  configureStructureComponent: ConfigureStructureComponent;
  @ViewChild('configureAssemblyComponent')
  configureAssemblyComponent: ConfigureAssemblyComponent;

  mappingRecoredId: string;
  atlId: any;
  assetGroupMappingData: AssetGroupMappingData;
  subscription: Subscription;
  assetGroupId: string;
  mapRecords: GetMapRecordDto[] = [];
  MapModeEnum = MapModeEnum;
  destinationFields:
    | import('src/app/pages/models/destination.field.model').Field[]
    | undefined;
  displayContainment = false;
  displayTerminal = false;
  displayAttachment = false;
  displayAssembly = false;
  display3D = false;
  percentage: number;
  undId: any;
  constructor(
    private _assetGroupMappingService: AssetGroupMappingService, // inject service
    private _mapRecordService: MapRecordService, // inject service,
    private cdr: ChangeDetectorRef,
    private _swalService: SwalService,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService,
    private _projectReportService: ProjectReportService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.atlId = params.atlId;
      this.assetGroupId = params.assetGroupId;
      this.undId = params.undId;

      this.getMapRecordByAssetGroupId(this.atlId, this.assetGroupId);
      this.setSubscription();
    });
  }

  getMapRecordByAssetGroupId(atlId: string, assetGroupId: string) {
    this._spinnerService.show();
    this._mapRecordService
      .getMapRecordByAssetGroupId(atlId, assetGroupId)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((result: GetMapRecordsByAssetGroupIdResponce) => {
        this.mapRecords = result.getMapRecords;
        this.mapRecords.forEach((element) => {
          let percentage = 0;
          element.completenessCriteriaJson?.forEach((cc) => {
            percentage += cc.value;
          });
          element.percentage = percentage;
        });
        // let indexs: number[] = [];
        // let orders: number[] = [];
        // let test: number[] = [1,  3,2, 4, 5];

        // this.mapRecords.forEach((element, index) => {
        //   index = index + 1;
        //   orders.push(element.order);
        //   indexs.push(index);
        // });
        // console.log('indexs  ' + indexs);
        // console.log('test  ' + test);
        // console.log( _lodash.isEqual(test,indexs));
        // console.log(orders);
        this._projectReportService.updateDataSourceViewCatalogMsg(atlId);
        this._spinnerService.hide();
        this.cdr.detectChanges();
        this.menuReinitialization();
      });
  }
  menuReinitialization() {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 50);
  }

  openConfigureTerminal(mapRecord: GetMapRecordDto) {
    this.configureTerminalComponent.show(mapRecord);
  }

  openConfigureContainment(mapRecord: GetMapRecordDto) {
    let containmentSettingsInput: ContainmentSettingsInputDto =
      new ContainmentSettingsInputDto();
    containmentSettingsInput.projectId =
      this.assetGroupMappingData.uNDProjectId;
    containmentSettingsInput.networkID = this.assetGroupMappingData.networkId!;
    containmentSettingsInput.assetTableID =
      this.assetGroupMappingData.assetTableId;
    containmentSettingsInput.assetGroupID =
      this.assetGroupMappingData.assetGroupId;
    containmentSettingsInput.assetTypeID =
      mapRecord.destinationNetworkJson.assetTypeId!;

    this.configureContainmentComponent.show(
      containmentSettingsInput,
      mapRecord
    );
  }

  openConfigureStructre(mapRecord: GetMapRecordDto) {
    let structuralAttachementInput: StructureAttachmentSettingsInputDto =
      new StructureAttachmentSettingsInputDto();
    structuralAttachementInput.projectId =
      this.assetGroupMappingData.uNDProjectId;
    structuralAttachementInput.networkID =
      this.assetGroupMappingData.networkId!;
    structuralAttachementInput.assetTableID =
      this.assetGroupMappingData.assetTableId;
    structuralAttachementInput.assetGroupID =
      this.assetGroupMappingData.assetGroupId;
    structuralAttachementInput.assetTypeID =
      mapRecord.destinationNetworkJson.assetTypeId!;

    this.configureStructureComponent.show(
      structuralAttachementInput,
      mapRecord
    );
  }

  openConfigureAssembly(mapRecord: GetMapRecordDto) {
    this.configureAssemblyComponent.show(
      this.assetGroupMappingData.uNDProjectId,
      mapRecord
    );
  }

  openConfigure3D(mapRecord: GetMapRecordDto) {
    this.configureThreeDComponent.show(mapRecord);
  }

  // router
  // openManageMappingRecord(id?: string) {
  //   let url = `atl/project-container/${this.atlId}/mapping-board/${this.undId}/map-record/manageMappingRecord`;
  //   this._router.navigate([url], { queryParams: { id: id } });
  // }

  openManageMappingRecord(id?: string) {
    this.manageMappingRecordComponent.show(id);
    //
  }

  openFieldMapping(mapRecord: GetMapRecordDto) {
    this.fieldMappingComponent.show(mapRecord, this.destinationFields);
  }

  setSubscription() {
    this.assetGroupMappingData =
      this._assetGroupMappingService.getCurrentAssetGroupMapping();
    this.destinationFields = this.assetGroupMappingData.fields;
    if (
      this.assetGroupMappingData.assetTableType ===
      AssetTableTypeEnum.StructureBoundry
    ) {
      this.displayContainment = true;
      this.display3D = true;
    }

    if (
      this.assetGroupMappingData.assetTableType ===
      AssetTableTypeEnum.DomainLine
    ) {
      this.displayTerminal = true;
      this.display3D = true;
    }
    if (
      this.assetGroupMappingData.assetTableType ===
      AssetTableTypeEnum.StructureLine
    ) {
      this.displayContainment = true;
      this.display3D = true;
    }

    if (
      this.assetGroupMappingData.assetTableType ===
      AssetTableTypeEnum.StructureJunction
    ) {
      this.displayAttachment = true;
      this.display3D = true;
    }

    if (
      this.assetGroupMappingData.assetTableType ===
      AssetTableTypeEnum.DomainAssembly
    ) {
      this.displayAssembly = true;
      this.display3D = true;
    }
    if (
      this.assetGroupMappingData.assetTableType ===
      AssetTableTypeEnum.DomainDevice
    ) {
      this.display3D = true;
    }

    if (
      this.assetGroupMappingData.assetTableType ===
      AssetTableTypeEnum.DomainJunction
    ) {
      this.display3D = true;
    }
  }

  getAssetGroupId() {
    this.getMapRecordByAssetGroupId(this.atlId, this.assetGroupId);
  }

  delete(mapRecordId?: string) {
    this._swalService.confirmation(
      'Delete Map Record',
      `Are you sure to delete this map record?`,
      () => {
        this._spinnerService.show();
        this._mapRecordService
          .delete(mapRecordId)
          .pipe(
            catchError((errorMessage) => {
              return of(errorMessage);
            }),
            finalize(() => {
              this._spinnerService.hide();
            })
          )
          .subscribe({
            next: () => {
              this._toastrService.success(
                'map record has been deleted Successfully',
                'Success'
              );
              this.getMapRecordByAssetGroupId(this.atlId, this.assetGroupId);
            },
            error: (e) => {
              this._toastrService.error(e.error.Message, 'Error');
              this._spinnerService.hide();
            },
          });
      }
    );
  }

  clone(mapRecordId?: string) {
    this._swalService.confirmation(
      'Clone Map Record',
      `Are you sure to clone this map record?`,
      () => {
        this._mapRecordService
          .clone(mapRecordId)
          .pipe(
            catchError((errorMessage) => {
              return of(errorMessage);
            })
          )
          .subscribe({
            next: () => {
              this._toastrService.success(
                'map record has been cloned Successfully',
                'Success'
              );
              this.getMapRecordByAssetGroupId(this.atlId, this.assetGroupId);
            },
            error: (e) => {
              this._toastrService.error(e.error.Message, 'Error');
            },
          });
      }
    );
  }

  Activation(activate: boolean, mapRecordId?: string) {
    let title = activate ? 'Activate Map Record' : 'DeActivate Map Record';
    let content = activate
      ? 'Are you sure to activate this map record?'
      : 'Are you sure to DeActivate this map record?';
    let tostr = activate
      ? 'map record has been activated Successfully'
      : 'map record has been DeActivate Successfully';

    this._swalService.confirmation(title, content, () => {
      this._mapRecordService
        .Activation(mapRecordId)
        .pipe(
          catchError((errorMessage) => {
            return of(errorMessage);
          })
        )
        .subscribe({
          next: () => {
            this._toastrService.success(tostr, 'Success');
            this.getMapRecordByAssetGroupId(this.atlId, this.assetGroupId);
          },
          error: (e) => {
            this._toastrService.error(e.error.Message, 'Error');
          },
        });
    });
  }

  handleOrderChange(mapRecord: GetMapRecordDto) {
    console.log(mapRecord);
  }

  handleonCompletenessChanged() {
    this.getMapRecordByAssetGroupId(this.atlId, this.assetGroupId);
  }
}
