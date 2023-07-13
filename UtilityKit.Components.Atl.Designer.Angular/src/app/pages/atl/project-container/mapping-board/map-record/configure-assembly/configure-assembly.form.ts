import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AddAssemblySettingsToMapRecordRequestDto,
  AssemblySettingsDto,
} from 'src/app/pages/models/map-record.model';

export class ConfigureAssemblyForm extends FormGroup {
  constructor(
    readonly model: AddAssemblySettingsToMapRecordRequestDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        mapRecordId: [model?.mapRecordId],
        spatialRelation: [
          model?.assemblySettingsJson?.relationShip,
          Validators.required,
        ],
        tree: [''],
      }).controls
    );
  }

  getFormValue(): AddAssemblySettingsToMapRecordRequestDto {
    var model = new AddAssemblySettingsToMapRecordRequestDto();
    if (this.valid) {
      let assemblySettingsJson: AssemblySettingsDto = new AssemblySettingsDto();

      model.mapRecordId = this.controls.mapRecordId.value;
      assemblySettingsJson.relationShip = this.controls.spatialRelation.value;
      model.assemblySettingsJson = assemblySettingsJson;
    }
    return model;
  }
}
