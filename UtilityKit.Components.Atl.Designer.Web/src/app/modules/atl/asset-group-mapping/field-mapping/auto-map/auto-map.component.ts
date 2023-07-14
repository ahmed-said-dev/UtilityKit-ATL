import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Field } from '../../../data-source.model';

@Component({
  selector: 'app-auto-map',
  templateUrl: './auto-map.component.html',
  styleUrls: ['./auto-map.component.scss'],
})
export class AutoMapComponent implements OnInit {
  @ViewChild('autoMapTemplate')
  autoMapTemplate: AutoMapComponent;
  modalRef: NgbModalRef;
  saving: boolean = false;
  fieldMapFormArray: FormArray;
  dataSourceFields: Field[] | undefined;
  constructor(private modal: NgbModal, private fb: FormBuilder) {}
  autoMapForm = this.fb.group({
    matchCase: [false],
    containWord: [false],
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

  save() {
    if (this.matchCase?.value && this.containWord?.value) {
    } else if (this.matchCase && !this.containWord) {
      this.fieldMapFormArray.controls.filter((ac) => {
        let dataSourceFieldName: string | undefined =
          this.dataSourceFields?.find(
            (ds) =>
              !ac.get('isMapped')?.value &&
              ds.name === ac.get('destinationFieldName')?.value
          )?.name;

        if (dataSourceFieldName) {
          ac.get('sourceFieldName')?.setValue(dataSourceFieldName);
          ac.get('isMapped')?.setValue(true);
        }
      });
    } else if (this.containWord?.value && !this.matchCase?.value) {
      this.fieldMapFormArray.controls.filter((ac) => {
        let dataSourceFieldName: string | undefined =
          this.dataSourceFields?.find(
            (ds) =>
              !ac.get('isMapped')?.value &&
              ac.get('destinationFieldName')?.value.includes(ds.name)
          )?.name;

        if (dataSourceFieldName) {
          ac.get('sourceFieldName')?.setValue(dataSourceFieldName);
          ac.get('isMapped')?.setValue(true);
        }
      });
    } else {
      this.fieldMapFormArray.controls.filter((ac) => {
        let dataSourceFieldName: string | undefined =
          this.dataSourceFields?.find(
            (ds) =>
              !ac.get('isMapped')?.value &&
              ds.name.toLowerCase() ==
                ac.get('destinationFieldName')?.value.toLowerCase()
          )?.name;

        if (dataSourceFieldName) {
          ac.get('sourceFieldName')?.setValue(dataSourceFieldName);
          ac.get('isMapped')?.setValue(true);
        }
      });
    }
    this.close();
  }

  close() {
    this.modalRef.close();
  }

  get matchCase() {
    return this.autoMapForm.get('matchCase');
  }

  get containWord() {
    return this.autoMapForm.get('containWord');
  }
}
