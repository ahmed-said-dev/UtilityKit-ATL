import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AddContainmentSettingsToMapRecordRequestDto,
  AddStructureSettingsToMapRecordRequestDto,
} from '../../map-record.model';

export class ConfigureStructureForm extends FormGroup {
  constructor(
    readonly model: AddStructureSettingsToMapRecordRequestDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        mapRecordId: [model?.mapRecordId],
        spatialRelation: [
          model?.structureSettingsJson.relationShip,
          Validators.required,
        ],
        tree: [''],
      }).controls
    );
  }

  getFormValue(): AddStructureSettingsToMapRecordRequestDto {
    var model = new AddStructureSettingsToMapRecordRequestDto();
    if (this.valid) {
      model.mapRecordId = this.controls.mapRecordId.value;
      model.structureSettingsJson.relationShip =
        this.controls.spatialRelation.value;
    }
    return model;
  }
}
