import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Field } from 'src/app/pages/models/data-source.model';
import {
  AddConfigureThreeDToMapRecordRequestDto,
  GetConfigureThreeDForEditResponce,
  GetMapRecordDto,
  ZValueSettingTypeEnum,
  ZValueSettingsDto,
  ZConditionDto,
} from 'src/app/pages/models/map-record.model';
import { MapRecordService } from 'src/app/pages/services/map-record.service';
import { AssetGroupMappingService } from 'src/app/pages/services/mapping-board.service';
import { ConfigureThreeDForm } from './configure-three-d.form';

const Empty_Three_D_Configuration: AddConfigureThreeDToMapRecordRequestDto = {
  mapRecordId: '',
  zValueSettingsJson: new ZValueSettingsDto(
    undefined,
    undefined,
    ZValueSettingTypeEnum.zFieldName,
    []
  ),
};

@Component({
  selector: 'app-configure-three-d',
  templateUrl: './configure-three-d.component.html',
  styleUrls: ['./configure-three-d.component.scss'],
})
export class ConfigureThreeDComponent implements OnInit {
  @ViewChild('configureThreeDTemplate')
  configureThreeDTemplate: ConfigureThreeDComponent;
  ConfigureThreeDForm: ConfigureThreeDForm;
  configureThreeD: AddConfigureThreeDToMapRecordRequestDto =
    new AddConfigureThreeDToMapRecordRequestDto();
  dataSourceFields: Field[] | undefined;
  ZValueSettingTypeEnum = ZValueSettingTypeEnum;
  zConditionList?: ZConditionDto[] = [];
  saving = false;
  inputMapRecordId: string | undefined;
  @Output() onCompletenessChanged = new EventEmitter<any>();

  constructor(
    private modal: NgbModal,
    private _assetGroupMappingService: AssetGroupMappingService,
    private _mapRecordService: MapRecordService,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.resetCurrentMapRecord();
    this.intializeForm();
  }

  private intializeForm() {
    this.ConfigureThreeDForm = new ConfigureThreeDForm(this.configureThreeD);
    if (
      !this.configureThreeD.zValueSettingsJson?.zFieldName &&
      !this.configureThreeD.zValueSettingsJson?.zDefaultValue &&
      !(this.configureThreeD.zValueSettingsJson?.zConditionsJson?.length == 0)
    ) {
      this.zFieldName?.setValidators(Validators.required);
      this.zFieldName?.updateValueAndValidity();
    }
  }

  private resetCurrentMapRecord() {
    if (!this.configureThreeD?.zValueSettingsJson?.zValueSettingType) {
      this.configureThreeD = Empty_Three_D_Configuration;
    }
  }

  close() {
    this.resetCurrentMapRecord();
    this.modal.dismissAll();
  }

  show(mapRecord: GetMapRecordDto) {
    this.inputMapRecordId = mapRecord.id;
    this._spinnerService.show();
    this._mapRecordService
      .getConfigureThreeDForEdit(mapRecord.id)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe({
        next: (result: GetConfigureThreeDForEditResponce) => {
          console.log(result);
          this.configureThreeD = result.getConfigureThreeDForEdit;
          if (this.configureThreeD.zValueSettingsJson) {
            this.zConditionList =
              this.configureThreeD.zValueSettingsJson.zConditionsJson;
          }
          // this.resetCurrentMapRecord();
          this.intializeForm();
          this._spinnerService.hide();
          console.log(this.ConfigureThreeDForm.controls);
        },
        error: (e) => {
          this._toastrService.error(e.error.Message, 'Error');
        },
      });

    this.modal.open(this.configureThreeDTemplate);

    this.dataSourceFields =
      this._assetGroupMappingService.getDataSourceFields(mapRecord);
  }

  handleRadioChange(zValueSettingType: ZValueSettingTypeEnum) {
    if (zValueSettingType == ZValueSettingTypeEnum.zFieldName) {
      this.zDefaultValue?.setValue(null);
      this.condition?.setValue(null);
      this.value?.setValue(null);
      this.zDefaultValue?.clearValidators();
      this.condition?.clearValidators();
      this.value?.clearValidators();
      this.zFieldName?.setValidators(Validators.required);
      this.zConditionList = [];
    } else if (zValueSettingType == ZValueSettingTypeEnum.zDefaultValue) {
      this.zFieldName?.setValue(null);
      this.condition?.setValue(null);
      this.value?.setValue(null);
      this.zFieldName?.clearValidators();
      this.condition?.clearValidators();
      this.value?.clearValidators();

      this.zDefaultValue?.setValidators(Validators.required);
      this.zDefaultValue?.updateValueAndValidity();

      this.zConditionList = [];
    } else {
      this.zFieldName?.setValue(null);
      this.zDefaultValue?.setValue(null);
      this.zFieldName?.clearValidators();
      this.zDefaultValue?.clearValidators();
      this.condition?.setValidators(Validators.required);
      this.value?.setValidators(Validators.required);
    }
    this.zFieldName?.updateValueAndValidity();
    this.zDefaultValue?.updateValueAndValidity();
    this.condition?.updateValueAndValidity();
    this.value?.updateValueAndValidity();
  }

  save() {
    this.saving = true;
    this.ConfigureThreeDForm.controls['mapRecordId'].setValue(
      this.inputMapRecordId
    );
    this.configureThreeD = this.ConfigureThreeDForm.getFormValue();
    if (
      this.configureThreeD.zValueSettingsJson.zValueSettingType ===
      this.ZValueSettingTypeEnum.zCondition
    ) {
      if (this.zConditionList && this.zConditionList.length > 0) {
        this.configureThreeD.zValueSettingsJson.zConditionsJson =
          this.zConditionList;
      } else {
        this._toastrService.warning(
          'Please click "Add" button. </br>to fill the Condition list!',
          'Warning',
          { enableHtml: true }
        );
        this.saving = false;
        return;
      }
    }

    // return;
    this._mapRecordService
      .addConfigureThreeDToMapRecord(this.configureThreeD)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.saving = false;
          this.close();
          this._toastrService.success(
            'Configure three D has been added to map record Successfully',
            'Success'
          );
          this.onCompletenessChanged.emit();
        },
        error: (e) => {
          this._toastrService.error(e.error.Message, 'Error');
        },
      });
  }

  OnAdd3D() {
    let zCondition: ZConditionDto = new ZConditionDto();
    if (!this.condition?.value) {
      this.condition?.setValidators(Validators.required);
      this.condition?.updateValueAndValidity();
      return;
    } else {
      this.condition?.clearValidators();
      this.condition?.updateValueAndValidity();
    }
    if (!this.value?.value) {
      this.value?.setValidators(Validators.required);
      this.value?.updateValueAndValidity();
      return;
    } else {
      this.value?.clearValidators();
      this.value?.updateValueAndValidity();
    }

    zCondition.condition = this.condition?.value;
    zCondition.value = this.value?.value;

    this.zConditionList?.push(zCondition);

    this.resetConditionFileds();
  }

  onRemove3D(configure: ZConditionDto) {
    this.zConditionList = this.zConditionList?.filter(
      (obj) => obj !== configure
    );
    this.resetConditionFileds();
  }

  resetConditionFileds() {
    if (this.zConditionList && this.zConditionList?.length > 0) {
      this.condition?.setValue(null);
      this.value?.setValue(null);

      this.condition?.clearValidators();
      this.value?.clearValidators();

      this.condition?.updateValueAndValidity();
      this.value?.updateValueAndValidity();
    } else {
      this.condition?.setValidators(Validators.required);
      this.value?.setValidators(Validators.required);
      this.condition?.updateValueAndValidity();
      this.value?.updateValueAndValidity();
    }
  }

  get zFieldName() {
    return this.ConfigureThreeDForm.get('zFieldName');
  }

  get zDefaultValue() {
    return this.ConfigureThreeDForm.get('zDefaultValue');
  }

  get condition() {
    return this.ConfigureThreeDForm.get('condition');
  }

  get value() {
    return this.ConfigureThreeDForm.get('value');
  }

  get radio3D() {
    return this.ConfigureThreeDForm.get('radio3D');
  }
}
