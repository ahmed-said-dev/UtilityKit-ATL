import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplacementFilterDto } from 'src/app/pages/models/map-record.model';
import { CheckWhiteSpaceValidator } from 'src/app/pages/validators/CheckWhiteSpaceValidator';
// import { ReplacementFilterDto } from '../../../map-record.model';

export class ReplacementFilterForm extends FormGroup {
  constructor(
    readonly model: ReplacementFilterDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        replace: [
          null,
          Validators.compose([Validators.required, CheckWhiteSpaceValidator()]),
        ],
        with: [
          null,
          Validators.compose([Validators.required, CheckWhiteSpaceValidator()]),
        ],
        replaceWithList: ['', Validators.required],
      }).controls
    );
  }

  getFormValue(): ReplacementFilterDto {
    var model = new ReplacementFilterDto();
    if (this.valid) {
      model.replace = this.controls.replace.value;
      model.with = this.controls.with.value;
    }
    return model;
  }
}
