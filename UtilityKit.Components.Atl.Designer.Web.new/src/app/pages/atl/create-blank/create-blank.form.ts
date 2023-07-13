import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ATLProjectDto } from '../../models/atl-project-model';

export class CreateBlankForm extends FormGroup {
  constructor(
    readonly model: ATLProjectDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        id: [model?.id],
        name: [
          model?.name,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100),
          ],
        ],
        description: [model?.description],
      }).controls
    );
  }

  getFormValue(): ATLProjectDto {
    var model = new ATLProjectDto();
    if (this.valid) {
      model.id = this.controls.id.value;
      model.name = this.controls.name.value;
      model.description = this.controls.description.value;
    }
    return model;
  }
}
