import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutoMapComponent } from './auto-map/auto-map.component';
import { ReplacementFilterComponent } from './replacement-filter/replacement-filter.component';
import { FieldMappingForm } from './field-mapping-form';
import { StaticValueComponent } from './static-value/static-value.component';
import { DataSourceEntityTypeEnum } from '../../atl-project-model';
import {
  AddFieldMapsToMapRecordRequestDto,
  FieldMapDto,
  GetFieldMapForEditDto,
  GetFieldMapForEditResponce,
  GetMapRecordDto,
  MapRecordFieldMapsDto,
} from '../../map-record.model';
import { AssetGroupMappingService } from '../asset-group-mapping.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MapRecordService } from '../../map-record.service';
import { finalize } from 'rxjs';
import { Field } from '../../data-source.model';

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
  @Output() onCompletenessChanged = new EventEmitter<any>();
  mapRecord: GetMapRecordDto;
  mapRecordFieldMaps: MapRecordFieldMapsDto;
  DataSourceEntityType = DataSourceEntityTypeEnum;
  destinationFields: import('../../shared/destinationField').Field[];
  dataSourceFields: Field[] | undefined;

  saving = false;
  fieldMapsRequest: AddFieldMapsToMapRecordRequestDto =
    new AddFieldMapsToMapRecordRequestDto();
  updatedFormGroup: any;

  constructor(
    private modalService: NgbModal,
    private modal: NgbModal,
    private _assetGroupMappingService: AssetGroupMappingService,
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService,
    private _mapRecordService: MapRecordService
  ) {}

  fieldMapForm = this.fb.group({
    id: [''],
    filter: [null],
    status: [null],
    fieldMapFormArray: this.fb.array([]),
  });

  private fillFieldMapRecords(
    destinationFields:
      | import('../../shared/destinationField').Field[]
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
  }

  private fillFieldMapRecordsForEdit(
    getFieldMapForEdit: GetFieldMapForEditDto[]
  ) {
    getFieldMapForEdit?.forEach((df) => {
      let group = this.fb.group({
        destinationFieldName: [df.destinationFieldName],
        sourceFieldName: [df.sourceFieldName],
        isNull: [df.isNull],
        staticValue: [df.staticValue],
        isMapped: [df.isMapped],
        replacementFilters: [df.replacementFilters],
      });
      this.fieldMapFormArray.push(group);
    });
  }

  ngOnInit(): void {
    this.resetCurrentMapRecord();
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
  }

  openStaticValue(selectedFormGroup: AbstractControl<any, any>) {
    this.staticValueComponent.show(selectedFormGroup);
  }

  close() {
    this.modal.dismissAll();
    this.fieldMapForm.reset();
    this.fieldMapFormArray.clear();
  }

  show(
    mapRecord: GetMapRecordDto,
    destinationFields:
      | import('../../shared/destinationField').Field[]
      | undefined
  ) {
    this._spinnerService.show();
    this.mapRecord = mapRecord;
    this.destinationFields = destinationFields!;
    this.id?.setValue(this.mapRecord.id!);
    this.dataSourceFields = this._assetGroupMappingService.getDataSourceFields(
      this.mapRecord
    );
    this._mapRecordService
      .GetFieldMapForEdit(this.mapRecord.id)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe({
        next: (result: GetFieldMapForEditResponce) => {
          if (result.getFieldMapForEdit.length > 0) {
            this.fillFieldMapRecordsForEdit(result.getFieldMapForEdit);
          } else {
            this.fillFieldMapRecords(destinationFields);
          }
          // console.log(result);
          this._spinnerService.hide();
        },
        error: (e) => {
          this._toastrService.error(e.error.Message, 'Error');
        },
      });
    this.modal.open(this.fieldMappingComponent, { size: 'lg' });
  }

  get fieldMapFormArray() {
    return <FormArray>this.fieldMapForm.get('fieldMapFormArray');
  }

  get id() {
    return this.fieldMapForm.get('id');
  }

  clearFieldMapRecords() {}

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

  gerFormValue() {
    this.fieldMapsRequest.mapRecordFieldMaps.fieldMapsJson = <FieldMapDto[]>(
      this.fieldMapForm.value.fieldMapFormArray
    );
    this.fieldMapsRequest.mapRecordFieldMaps.mapRecordId =
      this.fieldMapForm.value.id!;
  }

  handleSelectSourceFiled(selectedFormGroup: AbstractControl<any, any>) {
    let updatedFormGroup = <FormGroup>selectedFormGroup;
    updatedFormGroup.controls['isNull'].setValue(false);
    updatedFormGroup.controls['staticValue'].setValue('');
    updatedFormGroup.controls['replacementFilters'].setValue([]);

    updatedFormGroup.controls['isMapped'].setValue(true);
  }

  save() {
    this.gerFormValue();
    console.log(this.fieldMapForm.value);

    console.log(this.fieldMapsRequest);
    // return;
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
}
