import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { DataSourceService } from '../services/data-source.service';
import { AtlSchema } from '../models/data-source.model';

@Injectable({ providedIn: 'root' })
export class UniqueDataSourceNameValidator {
  static createValidator(
    _dataSourceService: DataSourceService,
    schema: AtlSchema
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      schema.name = control.value;
      return _dataSourceService
        .checkUniqueness(schema)
        .pipe(map((result: boolean) => (result ? { nameExists: true } : null)));
    };
  }
}
