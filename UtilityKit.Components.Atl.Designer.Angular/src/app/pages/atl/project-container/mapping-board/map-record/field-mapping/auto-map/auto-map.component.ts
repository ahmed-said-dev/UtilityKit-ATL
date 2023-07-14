import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Field } from 'src/app/pages/models/data-source.model';

export enum AutoMappingEnum {
  ExactWholeWord = 1,
  ContainsWord = 2,
}

@Component({
  selector: 'app-auto-map',
  templateUrl: './auto-map.component.html',
  styleUrls: ['./auto-map.component.scss'],
})
export class AutoMapComponent implements OnInit {
  @ViewChild('autoMapTemplate')
  autoMapTemplate: AutoMapComponent;
  @Output() popupClosed = new EventEmitter();
  modalRef: NgbModalRef;
  saving: boolean = false;
  fieldMapFormArray: FormArray;
  dataSourceFields: Field[] | undefined;
  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private _toastrService: ToastrService
  ) {}
  autoMapForm = this.fb.group({
    radioAutoMapping: [1],
  });

  ngOnInit(): void {}

  show(
    fieldMapFormArray: FormArray<FormGroup>,
    dataSourceFields: Field[] | undefined
  ) {
    this.fieldMapFormArray = fieldMapFormArray;
    this.dataSourceFields = dataSourceFields;
    this.modalRef = this.modal.open(this.autoMapTemplate);
  }
  handleRadioChange() {
    console.log(this.radioAutoMapping);
  }

  save() {
    let counter = 0;
    if (this.radioAutoMapping === AutoMappingEnum.ExactWholeWord) {
      this.fieldMapFormArray.controls.forEach((destinationField: any) => {
        if (destinationField.value.isMapped == false) {
          let dataSourceFieldName: string | undefined =
            this.dataSourceFields?.find(
              (ds) =>
                ds.name.toLowerCase() ===
                destinationField.value.destinationFieldName.toLowerCase()
            )?.name;
          if (dataSourceFieldName) {
            destinationField
              .get('sourceFieldName')
              ?.setValue(dataSourceFieldName);
            destinationField.get('isMapped')?.setValue(true);
            counter++;
          }
        }
      });
    }
    if (this.radioAutoMapping === AutoMappingEnum.ContainsWord) {
      this.fieldMapFormArray.controls.forEach((destinationField: any) => {
        if (destinationField.value.isMapped == false) {
          let dataSourceFieldName: string | undefined =
            this.dataSourceFields?.find((ds) =>
              destinationField.value.destinationFieldName
                .toLowerCase()
                .includes(ds.name.toLowerCase())
            )?.name;
          if (dataSourceFieldName) {
            destinationField
              .get('sourceFieldName')
              ?.setValue(dataSourceFieldName);
            destinationField.get('isMapped')?.setValue(true);
            counter++;
          }
        }
      });
    }
    if (counter == 0) {
      this._toastrService.success(`No Field Mapped!`, 'Success');
    } else if (
      counter > 0 &&
      counter < this.fieldMapFormArray.controls.length
    ) {
      this._toastrService.success(
        `${counter} Field Mapped Successfully`,
        'Success'
      );
    } else if (
      counter > 0 &&
      counter == this.fieldMapFormArray.controls.length
    ) {
      this._toastrService.success(`All Field Mapped Successfully`, 'Success');
    }
    this.close();
  }

  close() {
    this.modalRef.close();
    this.popupClosed.emit();
  }

  get radioAutoMapping() {
    return this.autoMapForm.get('radioAutoMapping')?.value;
  }
}
