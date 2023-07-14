import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddAssemblySettingsToMapRecordRequestDto } from '../../map-record.model';

export class ConfigureAssemblyForm extends FormGroup {
  constructor(
    readonly model: AddAssemblySettingsToMapRecordRequestDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        mapRecordId: [model?.mapRecordId],
        spatialRelation: [
          model?.assemblySettingsJson.relationShip,
          Validators.required,
        ],
        tree: [''],
      }).controls
    );
  }

  getFormValue(): AddAssemblySettingsToMapRecordRequestDto {
    var model = new AddAssemblySettingsToMapRecordRequestDto();
    if (this.valid) {
      model.mapRecordId = this.controls.mapRecordId.value;
      model.assemblySettingsJson.relationShip =
        this.controls.spatialRelation.value;
    }
    return model;
  }
}
