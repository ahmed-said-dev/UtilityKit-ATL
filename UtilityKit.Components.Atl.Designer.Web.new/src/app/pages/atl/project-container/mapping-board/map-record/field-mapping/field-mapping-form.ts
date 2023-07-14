import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { MapRecordFieldMapsDto } from 'src/app/pages/models/map-record.model';

export class FieldMappingForm {
  constructor(
    readonly model: MapRecordFieldMapsDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    fb.group({
      id: [model?.mapRecordId, Validators.required],
      filter: [null],
      status: [null],
      fieldMapRecords: new FormArray([this.FillFormArray()]),
    }).controls;
  }

  private FillFormArray(): FormGroup {
    return new FormGroup({
      destinationField: new FormControl(null, Validators.required),
      dataSourceField: new FormControl(null, Validators.required),
    });
  }
}
