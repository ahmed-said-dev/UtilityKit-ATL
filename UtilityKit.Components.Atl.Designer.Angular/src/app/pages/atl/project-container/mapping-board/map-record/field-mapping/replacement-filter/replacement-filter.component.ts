import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ReplacementFilterDto } from 'src/app/pages/models/map-record.model';
import { ReplacementFilterForm } from './replacement-filter.form';
@Component({
  selector: 'app-replacement-filter',
  templateUrl: './replacement-filter.component.html',
  styleUrls: ['./replacement-filter.component.scss'],
})
export class ReplacementFilterComponent implements OnInit {
  @ViewChild('replacementFilterTemplate')
  replacementFilterTemplate: ReplacementFilterComponent;
  @Output() popupClosed = new EventEmitter();
  replacementFilterForm: ReplacementFilterForm;
  modalRef: NgbModalRef;
  destinationFieldName: string = '';
  replacementFilterList: any[] = [];
  replacementFilter: ReplacementFilterDto = new ReplacementFilterDto();
  fieldMap: any;
  replacementFilters: any;
  saving: boolean = false;

  constructor(private modal: NgbModal, private _toastrService: ToastrService) {}

  ngOnInit(): void {}
  show(fieldMap: FormGroup) {
    this.intializeForm();
    this.fieldMap = fieldMap;
    this.destinationFieldName = fieldMap.controls['destinationFieldName'].value;
    this.replacementFilters = fieldMap.controls['replacementFilters'].value;
    this.replacementFilterList = JSON.parse(
      JSON.stringify(this.replacementFilters)
    ) as typeof this.replacementFilters;

    this.modalRef = this.modal.open(this.replacementFilterTemplate);
  }

  private intializeForm() {
    this.replacementFilterForm = new ReplacementFilterForm(
      this.replacementFilter
    );
    this.replacementFilterList = [];
  }

  close() {
    this.modalRef.close();
    this.popupClosed.emit();
  }

  OnAdd() {
    let replacementFilter: any = {};

    if (!this.replace?.value) {
      this.replace?.setValidators(Validators.required);
      this.replace?.updateValueAndValidity();
      return;
    } else {
      this.replace?.clearValidators();
      this.replace?.updateValueAndValidity();
    }
    if (!this.with?.value) {
      this.with?.setValidators(Validators.required);
      this.with?.updateValueAndValidity();
      return;
    } else {
      this.with?.clearValidators();
      this.with?.updateValueAndValidity();
    }

    replacementFilter.replace = this.replace?.value;
    replacementFilter.with = this.with?.value;
    this.replacementFilterList?.push(replacementFilter);
    this.resetReplacementFileds();
  }

  save() {
    this.saving = true;

    this.updateForm();
    this.close();
    this.saving = false;
  }

  updateForm() {
    this.fieldMap.controls['isNull'].setValue(false);
    this.fieldMap.controls['sourceFieldName'].setValue(null);
    this.fieldMap.controls['staticValue'].setValue('');

    this.fieldMap.controls['isMapped'].setValue(true);
    this.fieldMap.controls['replacementFilters'].setValue(
      this.replacementFilterList
    );
  }

  onRemove(replacementFilter: ReplacementFilterDto) {
    this.replacementFilterList = this.replacementFilterList?.filter(
      (obj) => obj !== replacementFilter
    );
    this.resetReplacementFileds();
  }

  get replace() {
    return this.replacementFilterForm.get('replace');
  }

  get with() {
    return this.replacementFilterForm.get('with');
  }

  get replaceWithList() {
    return this.replacementFilterForm.get('replaceWithList');
  }
  resetReplacementFileds() {
    if (this.replacementFilterList && this.replacementFilterList?.length > 0) {
      this.replaceWithList?.setValue(null);
      this.replace?.setValue(null);
      this.with?.setValue(null);

      this.replaceWithList?.clearValidators();
      this.replace?.clearValidators();
      this.with?.clearValidators();

      this.replaceWithList?.updateValueAndValidity();
      this.replace?.updateValueAndValidity();
      this.with?.updateValueAndValidity();
    } else {
      this.replaceWithList?.setValidators(Validators.required);
      this.replace?.setValidators(Validators.required);
      this.with?.setValidators(Validators.required);

      this.replaceWithList?.updateValueAndValidity();
      this.replace?.updateValueAndValidity();
      this.with?.updateValueAndValidity();
    }
  }
}
