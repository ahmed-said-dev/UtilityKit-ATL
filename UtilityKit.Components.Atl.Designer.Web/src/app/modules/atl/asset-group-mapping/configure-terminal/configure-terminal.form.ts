import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddConfigureTerminalToMapRecordRequestDto } from '../../map-record.model';

export class ConfigureTerminalForm extends FormGroup {
  constructor(
    readonly model: AddConfigureTerminalToMapRecordRequestDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        mapRecordId: [model?.mapRecordId],
        fromTerminalFieldName: [model?.terminalSettingsJson?.fromTerminalFieldName],
        toTerminalFieldName: [model?.terminalSettingsJson?.toTerminalFieldName],
      }).controls
    );
  }

  getFormValue(): AddConfigureTerminalToMapRecordRequestDto {
    var model = new AddConfigureTerminalToMapRecordRequestDto();
    if (this.valid) {
      model.mapRecordId = this.controls.mapRecordId.value;
      model.terminalSettingsJson.fromTerminalFieldName = this.controls.fromTerminalFieldName.value;
      model.terminalSettingsJson.toTerminalFieldName = this.controls.toTerminalFieldName.value;
    }
    return model;
  }
}
