import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';

export function CheckWhiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      control.value?.length > 0 &&
      control.value?.replace(/\s/g, '').length == 0
    ) {
      return { whiteSpaces: true };
    }
    return null;
  };
}
