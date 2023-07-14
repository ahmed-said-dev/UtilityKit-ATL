import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtlProjectService } from 'src/app/pages/services/atl-project.service';
import { CheckWhiteSpaceValidator } from 'src/app/pages/validators/CheckWhiteSpaceValidator';
import { UniqueAtlProjectNameValidator } from 'src/app/pages/validators/UniqueAtlProjectNameValidator';
import { ATLProjectDto } from '../../../../models/atl-project-model';

export class CreateBlankForm extends FormGroup {
  constructor(
    readonly model: ATLProjectDto,
    private _atlProjectService: AtlProjectService,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        id: [model?.id],
        name: [
          model?.name,
          {
            validators: [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(100),
              CheckWhiteSpaceValidator(),
            ],

            asyncValidators: [
              UniqueAtlProjectNameValidator.createValidator(
                _atlProjectService,
                model
              ),
            ],
            // updateOn: 'blur',
          },
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
