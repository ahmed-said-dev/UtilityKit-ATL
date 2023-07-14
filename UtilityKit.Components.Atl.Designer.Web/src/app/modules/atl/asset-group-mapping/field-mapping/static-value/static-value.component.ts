import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-static-value',
  templateUrl: './static-value.component.html',
  styleUrls: ['./static-value.component.scss'],
})
export class StaticValueComponent implements OnInit {
  @ViewChild('StaticValueTemplate')
  StaticValueTemplate: StaticValueComponent;
  modalRef: NgbModalRef;
  fieldMap: FormGroup<any>;
  destinationFieldName: any;
  saving: boolean = false;
  constructor(private modal: NgbModal, private fb: FormBuilder) {}

  staticValueForm = this.fb.group({
    staticValue: ['', Validators.required],
  });

  ngOnInit(): void {}

  show(selectedFormGroup: AbstractControl<any, any>) {
    this.fieldMap = <FormGroup>selectedFormGroup;
    this.destinationFieldName =
      this.fieldMap.controls['destinationFieldName'].value;
    this.staticValue?.setValue(this.fieldMap.controls['staticValue'].value);
    this.modalRef = this.modal.open(this.StaticValueTemplate);
  }

  close() {
    this.modalRef.close();
    this.staticValueForm.reset();
  }
  save() {
    this.saving = true;
    this.fieldMap.controls['isNull'].setValue(false);
    this.fieldMap.controls['sourceFieldName'].setValue(null);
    this.fieldMap.controls['replacementFilters'].setValue([]);

    this.fieldMap.controls['isMapped'].setValue(true);
    this.fieldMap.controls['staticValue'].setValue(this.staticValue?.value);
    this.close();
    this.saving = false;
  }
  get staticValue() {
    return this.staticValueForm.get('staticValue');
  }
}
