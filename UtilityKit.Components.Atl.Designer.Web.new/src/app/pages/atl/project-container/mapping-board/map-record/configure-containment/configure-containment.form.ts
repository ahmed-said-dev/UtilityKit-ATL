import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddContainmentSettingsToMapRecordRequestDto } from 'src/app/pages/models/map-record.model';

export class ConfigureContainmentForm extends FormGroup {
  constructor(
    readonly model: AddContainmentSettingsToMapRecordRequestDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        mapRecordId: [model?.mapRecordId],
        spatialRelation: [
          model?.containmentSettingsJson.relationShip
            ? model?.containmentSettingsJson.relationShip
            : null,
          Validators.required,
        ],
        tree: [''],
      }).controls
    );
  }

  getFormValue(): AddContainmentSettingsToMapRecordRequestDto {
    var model = new AddContainmentSettingsToMapRecordRequestDto();
    if (this.valid) {
      model.mapRecordId = this.controls.mapRecordId.value;
      model.containmentSettingsJson.relationShip =
        this.controls.spatialRelation.value;
    }
    return model;
  }
}
