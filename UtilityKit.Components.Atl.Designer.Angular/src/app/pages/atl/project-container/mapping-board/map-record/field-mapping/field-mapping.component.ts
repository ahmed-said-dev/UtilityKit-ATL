import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutoMapComponent } from './auto-map/auto-map.component';
import { ReplacementFilterComponent } from './replacement-filter/replacement-filter.component';
import { FieldMappingForm } from './field-mapping-form';
import { StaticValueComponent } from './static-value/static-value.component';
import { DataSourceEntityTypeEnum } from 'src/app/pages/models/atl-project-model';
import {
  AddFieldMapsToMapRecordRequestDto,
  FieldMapDto,
  GetFieldMapForEditDto,
  GetFieldMapForEditResponce,
  GetMapRecordDto,
  MapRecordFieldMapsDto,
} from 'src/app/pages/models/map-record.model';
import { AssetGroupMappingService } from 'src/app/pages/services/mapping-board.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MapRecordService } from 'src/app/pages/services/map-record.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Field } from 'src/app/pages/models/data-source.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MenuComponent } from 'src/app/_metronic/kt/components';
import * as _lodash from 'lodash';
import { SwalService } from 'src/app/shared/services/Swal.service';

const Empty_Map_Record_Field_Map: MapRecordFieldMapsDto = {
  mapRecordId: '',
  fieldMapsJson: [],
};
@Component({
  selector: 'app-field-mapping',
  templateUrl: './field-mapping.component.html',
  styleUrls: ['./field-mapping.component.scss'],
})
export class FieldMappingComponent implements OnInit {
  @ViewChild('fieldMappingComponent')
  fieldMappingComponent: FieldMappingComponent;
  @ViewChild('replacementFilterComponent')
  replacementFilterComponent: ReplacementFilterComponent;
  @ViewChild('staticValueComponent')
  staticValueComponent: StaticValueComponent;
  @ViewChild('autoMapComponent')
  autoMapComponent: AutoMapComponent;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCompletenessChanged = new EventEmitter<any>();
  mapRecord: GetMapRecordDto;
  mapRecordFieldMaps: MapRecordFieldMapsDto;
  DataSourceEntityType = DataSourceEntityTypeEnum;
  destinationFields: import('src/app/pages/models/destination.field.model').Field[];
  dataSourceFields: Field[] | undefined;
  filterClicked = false;
  saving = false;
  fieldMapsRequest: AddFieldMapsToMapRecordRequestDto =
    new AddFieldMapsToMapRecordRequestDto();
  updatedFormGroup: any;
  // status = 0;
  // filterFieldName = '';
  backUp: FormArray<any>;

  constructor(
    private modal: NgbModal,
    private _assetGroupMappingService: AssetGroupMappingService,
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService,
    private _mapRecordService: MapRecordService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private cdr: ChangeDetectorRef,
    private _swalService: SwalService
  ) {}

  fieldMapForm = this.fb.group({
    id: [''],
    filterFieldName: [''],
    status: [0],
    fieldMapFormArray: this.fb.array([]),
    selectedField: [''],
  });

  private fillFieldMapRecords(
    destinationFields:
      | import('src/app/pages/models/destination.field.model').Field[]
      | undefined
  ) {
    destinationFields?.forEach((df) => {
      let group = this.fb.group({
        destinationFieldName: [df.name],
        sourceFieldName: [null],
        isNull: [false],
        staticValue: [''],
        isMapped: [false],
        replacementFilters: [[]],
      });
      this.fieldMapFormArray.push(group);
    });
    this.backUp = _lodash.cloneDeep(this.fieldMapFormArray);
  }

  private fillFieldMapRecordsForEdit(
    getFieldMapForEdit: GetFieldMapForEditDto[]
  ) {
    getFieldMapForEdit?.forEach((df) => {
      let group = this.fb.group({
        destinationFieldName: [
          df.destinationFieldName,
          { disabled: true, readonly: true },
        ],
        sourceFieldName: [df.sourceFieldName],
        isNull: [df.isNull],
        staticValue: [df.staticValue],
        isMapped: [df.isMapped],
        replacementFilters: [df.replacementFilters],
      });
      this.fieldMapFormArray.push(group);
      this.backUp = _lodash.cloneDeep(this.fieldMapFormArray);
    });
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.resetCurrentMapRecord();
      this.show(this._activatedRoute.snapshot.queryParams['id']);
    });
  }

  private resetCurrentMapRecord() {
    if (!this.mapRecordFieldMaps)
      this.mapRecordFieldMaps = Empty_Map_Record_Field_Map;
  }

  openAutoMap() {
    this.autoMapComponent.show(this.fieldMapFormArray, this.dataSourceFields);
  }

  openReplacementFilter(selectedFormGroup: any) {
    this.updatedFormGroup = selectedFormGroup;
    this.replacementFilterComponent.show(selectedFormGroup);
  }

  setNull(selectedFormGroup: AbstractControl<any, any>) {
    let updatedFormGroup = <FormGroup>selectedFormGroup;
    updatedFormGroup.controls['sourceFieldName'].setValue(null);
    updatedFormGroup.controls['staticValue'].setValue('');
    updatedFormGroup.controls['replacementFilters'].setValue([]);

    updatedFormGroup.controls['isMapped'].setValue(true);
    updatedFormGroup.controls['isNull'].setValue(true);
    this.checkSelectedFieldValidation();
  }

  openStaticValue(selectedFormGroup: AbstractControl<any, any>) {
    this.staticValueComponent.show(selectedFormGroup);
  }

  close() {
    this.modal.dismissAll();
    this.fieldMapForm.reset();
    this.fieldMapFormArray.clear();
    this._location.back();
  }

  show(mapRecordId: string) {
    this._spinnerService.show();
    this.id?.setValue(mapRecordId);
    this.dataSourceFields =
      this._assetGroupMappingService.getDataSourceFields();
    this.dataSourceFields = _lodash.sortBy(this.dataSourceFields, ['name']);

    this._mapRecordService
      .GetFieldMapForEdit(mapRecordId)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
          this.menuReinitialization();
        })
      )
      .subscribe({
        next: (result: GetFieldMapForEditResponce) => {
          if (result.getFieldMapForEdit.length > 0) {
            this.fillFieldMapRecordsForEdit(result.getFieldMapForEdit);
          } else {
            this.fillFieldMapRecords(
              this._assetGroupMappingService.getDestinationFields()
            );
          }
          this.checkSelectedFieldValidation();
          this._spinnerService.hide();

          this.cdr.detectChanges();
        },
        error: (e) => {
          this._toastrService.error(e.error.Message, 'Error');
        },
      });
  }

  get fieldMapFormArray() {
    return <FormArray>this.fieldMapForm.get('fieldMapFormArray');
  }

  get filterFieldName() {
    return this.fieldMapForm.get('filterFieldName') as FormControl;
  }

  get status() {
    return this.fieldMapForm.get('status');
  }

  get selectedField() {
    return this.fieldMapForm.get('selectedField');
  }

  get id() {
    return this.fieldMapForm.get('id');
  }

  clearFieldMapRecords() {}

  checkSelectedFieldValidation() {
    let hasValue = false;
    this.fieldMapFormArray.controls.forEach((element) => {
      if (element.get('isMapped')?.value) {
        hasValue = true;
      }
    });

    if (!hasValue) {
      this.selectedField?.setValidators(Validators.required);
    } else {
      this.selectedField?.clearValidators();
    }
    this.selectedField?.updateValueAndValidity();
  }

  addFieldMaps() {
    let fieldMapsJson: FieldMapDto[] = [];
    this.fieldMapFormArray.controls.forEach((element) => {
      let fieldMap: FieldMapDto = new FieldMapDto();
      fieldMap.destinationFieldName = element.get(
        'destinationFieldName'
      )?.value;
      fieldMap.sourceFieldName = element.get('sourceFieldName')?.value;

      fieldMapsJson.push(fieldMap);
    });
    this.fieldMapsRequest.mapRecordFieldMaps.fieldMapsJson = fieldMapsJson;
    this.fieldMapsRequest.mapRecordFieldMaps.mapRecordId = this.id?.value!;
  }

  getFormValue() {
    // if (this.status > 0 || this.filterFieldName) {
    //   this.fieldMapFormArray.controls.forEach((destination) => {
    //     this.fieldMapForm.controls['fieldMapFormArray'].value.forEach(
    //       (source: any) => {
    //         if (
    //           destination.get('destinationFieldName')?.value ==
    //             source.destinationFieldName &&
    //           destination.get('sourceFieldName')?.value !=
    //             source.sourceFieldName
    //         ) {
    //           return destination
    //             .get('sourceFieldName')
    //             ?.setValue(source.sourceFieldName);
    //         }
    //       }
    //     );
    //   });
    // }

    this.fieldMapsRequest.mapRecordFieldMaps.fieldMapsJson = <FieldMapDto[]>(
      this.fieldMapForm.controls['fieldMapFormArray'].value
    );
    this.fieldMapsRequest.mapRecordFieldMaps.mapRecordId =
      this.fieldMapForm.value.id!;
  }

  handleSelectSourceFiled(selectedFormGroup: AbstractControl<any, any>) {
    let updatedFormGroup = <FormGroup>selectedFormGroup;
    updatedFormGroup.controls['isNull'].setValue(false);
    updatedFormGroup.controls['staticValue'].setValue('');
    updatedFormGroup.controls['replacementFilters'].setValue([]);
    if (updatedFormGroup.controls.sourceFieldName.value != 'null') {
      updatedFormGroup.controls['isMapped'].setValue(true);
    } else {
      updatedFormGroup.controls['isMapped'].setValue(false);
    }

    this.checkSelectedFieldValidation();
  }

  save() {
    this.getFormValue();
    this.saving = true;
    this._mapRecordService
      .addFieldMapsToMapRecord(this.fieldMapsRequest)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.close();
          this.saving = false;
          this._toastrService.success(
            'Field Maps have been added to map record Successfully',
            'Success'
          );
          this.onCompletenessChanged.emit();
        },
        error: (e) => {
          this._toastrService.error(e.error, 'Error');
        },
      });
  }

  delete() {
    this._swalService.confirmation(
      'Delete field map',
      `Are you sure to delete this field map?`,
      () => {
        this._spinnerService.show();
        let mapRecordFieldMaps = new MapRecordFieldMapsDto();
        mapRecordFieldMaps.fieldMapsJson = [];
        mapRecordFieldMaps.mapRecordId = this.fieldMapForm.value.id!;
        this.fieldMapsRequest.mapRecordFieldMaps = mapRecordFieldMaps;
        this._mapRecordService
          .addFieldMapsToMapRecord(this.fieldMapsRequest)
          .pipe(
            finalize(() => {
              this._spinnerService.hide();
            })
          )
          .subscribe({
            next: (result) => {
              this.close();
              this._spinnerService.hide();
              this._toastrService.success(
                'Field Maps have been deleted Successfully',
                'Success'
              );
              this.onCompletenessChanged.emit();
            },
            error: (e) => {
              this._toastrService.error(e.error, 'Error');
            },
          });
      }
    );
  }

  onPopupClosed() {
    this.checkSelectedFieldValidation();
  }

  menuReinitialization() {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }

  handleSearch() {}

  formArr$ = this.filterFieldName.valueChanges.pipe(
    startWith(''),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((val) => {
      return of(this.formArr as AbstractControl[]).pipe(
        map((formArr: AbstractControl[]) =>
          formArr.filter((group: AbstractControl) => {
            return group
              .get('destinationFieldName')
              ?.value.toLowerCase()
              .includes(val.toLowerCase());
          })
        )
      );
    })
  );

  formArr$1 = this.status?.valueChanges.pipe(
    startWith(0),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((val) => {
      return of(this.formArr as AbstractControl[]).pipe(
        map((formArr: AbstractControl[]) =>
          formArr.filter((group: AbstractControl) => {
            return group.get('isMapped')?.value == val;
          })
        )
      );
    })
  );
  get formArr() {
    return (this.fieldMapForm.get('fieldMapFormArray') as FormArray).controls;
  }
}
