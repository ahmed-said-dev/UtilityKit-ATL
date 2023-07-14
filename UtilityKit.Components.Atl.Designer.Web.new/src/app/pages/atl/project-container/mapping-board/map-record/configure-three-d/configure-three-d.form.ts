import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AddConfigureThreeDToMapRecordRequestDto,
  ZValueSettingTypeEnum,
} from 'src/app/pages/models/map-record.model';
// import {
//   AddConfigureThreeDToMapRecordRequestDto,
//   ZValueSettingTypeEnum,
// } from '../../map-record.model';

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
        zFieldName: [model?.zValueSettingsJson?.zFieldName],
        zDefaultValue: [model?.zValueSettingsJson?.zDefaultValue],
        condition: [''],
        value: [''],
      }).controls
    );
  }

  getFormValue(): AddConfigureThreeDToMapRecordRequestDto {
    var model = new AddConfigureThreeDToMapRecordRequestDto();
    if (this.valid) {
      model.mapRecordId = this.controls.mapRecordId.value;
      model.zValueSettingsJson.zFieldName = this.controls.zFieldName.value;
      model.zValueSettingsJson.zDefaultValue =
        this.controls.zDefaultValue.value;
      model.zValueSettingsJson.zValueSettingType = this.controls.radio3D.value;
    }
    return model;
  }
}
