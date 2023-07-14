import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AddStructureSettingsToMapRecordRequestDto,
  StructureSettingsDto,
} from 'src/app/pages/models/map-record.model';

export class ConfigureStructureForm extends FormGroup {
  constructor(
    readonly model: AddStructureSettingsToMapRecordRequestDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        mapRecordId: [model?.mapRecordId],
        spatialRelation: [
          model?.structureSettingsJson?.relationShip,
          Validators.required,
        ],
        tree: [''],
      }).controls
    );
  }

  getFormValue(): AddStructureSettingsToMapRecordRequestDto {
    var model = new AddStructureSettingsToMapRecordRequestDto();
    if (this.valid) {
      let structureSettingsJson: StructureSettingsDto =
        new StructureSettingsDto();

      model.mapRecordId = this.controls.mapRecordId.value;
      structureSettingsJson.relationShip = this.controls.spatialRelation.value;
      model.structureSettingsJson = structureSettingsJson;
    }
    return model;
  }
}
