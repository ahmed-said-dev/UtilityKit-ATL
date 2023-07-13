import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AddConfigureThreeDToMapRecordRequestDto,
  ZValueSettingsDto,
  ZValueSettingTypeEnum,
} from 'src/app/pages/models/map-record.model';

export class ConfigureThreeDForm extends FormGroup {
  constructor(
    readonly model: AddConfigureThreeDToMapRecordRequestDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        mapRecordId: [model?.mapRecordId],
        radio3D: [
          model?.zValueSettingsJson?.zValueSettingType
            ? model?.zValueSettingsJson?.zValueSettingType
            : ZValueSettingTypeEnum.zFieldName,
        ],
        zFieldName: [
          model?.zValueSettingsJson?.zFieldName,
          model?.zValueSettingsJson?.zValueSettingType ==
          ZValueSettingTypeEnum.zFieldName
            ? Validators.required
            : '',
        ],
        zDefaultValue: [
          model?.zValueSettingsJson?.zDefaultValue,
          model?.zValueSettingsJson?.zValueSettingType ==
          ZValueSettingTypeEnum.zDefaultValue
            ? Validators.required
            : '',
        ],
        condition: [''],
        value: [''],
        conditionValueList: [
          '',
          model?.zValueSettingsJson?.zValueSettingType ==
          ZValueSettingTypeEnum.zCondition
            ? Validators.required
            : '',
        ],
      }).controls
    );
  }

  getFormValue(): AddConfigureThreeDToMapRecordRequestDto {
    var model = new AddConfigureThreeDToMapRecordRequestDto();
    if (this.valid) {
      model.mapRecordId = this.controls.mapRecordId.value;
      let zValueSettingsJson: ZValueSettingsDto = new ZValueSettingsDto();
      zValueSettingsJson.zFieldName = this.controls.zFieldName.value;
      zValueSettingsJson.zDefaultValue = this.controls.zDefaultValue.value;
      zValueSettingsJson.zValueSettingType = this.controls.radio3D.value;
      model.zValueSettingsJson = zValueSettingsJson;
    }
    return model;
  }
}
