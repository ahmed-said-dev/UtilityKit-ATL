import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtlSchema } from 'src/app/pages/models/data-source.model';
import { DataSourceService } from 'src/app/pages/services/data-source.service';
import { CheckWhiteSpaceValidator } from 'src/app/pages/validators/CheckWhiteSpaceValidator';
import { UniqueDataSourceNameValidator } from 'src/app/pages/validators/UniqueDataSourceNameValidator';

export class CadDataSourceForm extends FormGroup {
  constructor(
    readonly model: AtlSchema,
    private _dataSourceService: DataSourceService,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        name: [
          model?.name,
          {
            validators: [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(30),
              CheckWhiteSpaceValidator(),
            ],

            asyncValidators: [
              UniqueDataSourceNameValidator.createValidator(
                _dataSourceService,
                model
              ),
            ],
            // updateOn: 'blur',
          },
        ],
        uploadFileName: ['', Validators.required],
      }).controls
    );
  }

  getFormValue(): AtlSchema {
    var model = new AtlSchema();
    if (this.valid) {
      model.name = this.controls.name.value;
    }
    return model;
  }
}
