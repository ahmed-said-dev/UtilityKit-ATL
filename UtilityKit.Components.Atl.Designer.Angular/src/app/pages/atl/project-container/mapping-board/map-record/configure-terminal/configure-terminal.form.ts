import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AddConfigureTerminalToMapRecordRequestDto,
  TerminalSettingsDto,
} from 'src/app/pages/models/map-record.model';

export class ConfigureTerminalForm extends FormGroup {
  constructor(
    readonly model: AddConfigureTerminalToMapRecordRequestDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        mapRecordId: [model?.mapRecordId],
        fromTerminalFieldName: [
          model?.terminalSettingsJson?.fromTerminalFieldName,
        ],
        toTerminalFieldName: [model?.terminalSettingsJson?.toTerminalFieldName],
      }).controls
    );
  }

  getFormValue(): AddConfigureTerminalToMapRecordRequestDto {
    var model = new AddConfigureTerminalToMapRecordRequestDto();
    if (this.valid) {
      let terminalSettings: TerminalSettingsDto = new TerminalSettingsDto();
      terminalSettings.fromTerminalFieldName =
        this.controls.fromTerminalFieldName.value;
      terminalSettings.toTerminalFieldName =
        this.controls.toTerminalFieldName.value;

      model.mapRecordId = this.controls.mapRecordId.value;
      model.terminalSettingsJson = terminalSettings;
    }
    return model;
  }
}
