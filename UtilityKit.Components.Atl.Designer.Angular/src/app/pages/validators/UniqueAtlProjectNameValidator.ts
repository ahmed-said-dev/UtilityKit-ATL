import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { ATLProjectDto } from '../models/atl-project-model';
import { AtlProjectService } from '../services/atl-project.service';
import { delay, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UniqueAtlProjectNameValidator {
  static createValidator(
    _atlProjectService: AtlProjectService,
    atlProject: ATLProjectDto
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      atlProject.name = control.value;
      return _atlProjectService
        .checkUniqueness(atlProject)
        .pipe(map((result: boolean) => (result ? { nameExists: true } : null)));
    };
  }

  // for delay
  //   static createValidator(
  //     _atlProjectService: AtlProjectService,
  //     atlProject: ATLProjectDto
  //   ): AsyncValidatorFn {
  //     return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //       atlProject.name = control.value;

  //       return control.value
  //         ? of(control.value).pipe(
  //             delay(300),
  //             distinctUntilChanged(),
  //             switchMap(() =>
  //               _atlProjectService
  //                 .checkUniqueness(atlProject)
  //                 .pipe(
  //                   map((result: boolean) =>
  //                     result ? { nameExists: true } : null
  //                   )
  //                 )
  //             )
  //           )
  //         : of();
  //     };
  //   }
}
