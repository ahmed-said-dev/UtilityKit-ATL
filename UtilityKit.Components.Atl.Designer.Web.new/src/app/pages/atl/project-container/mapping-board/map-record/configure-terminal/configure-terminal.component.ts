import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Field } from 'src/app/pages/models/data-source.model';
import {
  AddConfigureTerminalToMapRecordRequestDto,
  GetConfigureTerminalForEditResponce,
  GetMapRecordDto,
  TerminalSettingsDto,
} from 'src/app/pages/models/map-record.model';
import { MapRecordService } from 'src/app/pages/services/map-record.service';
import { AssetGroupMappingService } from 'src/app/pages/services/mapping-board.service';
import { ConfigureTerminalForm } from './configure-terminal.form';

const Empty_Configure_Terminal: AddConfigureTerminalToMapRecordRequestDto = {
  mapRecordId: '',
  terminalSettingsJson: new TerminalSettingsDto(undefined, undefined),
};
@Component({
  selector: 'app-configure-terminal',
  templateUrl: './configure-terminal.component.html',
  styleUrls: ['./configure-terminal.component.scss'],
})
export class ConfigureTerminalComponent implements OnInit {
  @ViewChild('configureTerminalTemplate')
  configureTerminalTemplate: ConfigureTerminalComponent;
  fields: Field[] | undefined;
  @Output() onCompletenessChanged = new EventEmitter<any>();
  constructor(
    private modal: NgbModal,
    private _assetGroupMappingService: AssetGroupMappingService,
    private _mapRecordService: MapRecordService,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) {}
  configureTerminalForm: ConfigureTerminalForm;
  configureTerminalObject: AddConfigureTerminalToMapRecordRequestDto =
    new AddConfigureTerminalToMapRecordRequestDto();
  saving = false;

  ngOnInit(): void {
    // this.resetCurrentMapRecord();
    this.intializeForm();
  }

  // private resetCurrentMapRecord() {
  //   this.configureTerminalObject = Empty_Configure_Terminal;
  // }

  private intializeForm() {
    this.configureTerminalForm = new ConfigureTerminalForm(
      this.configureTerminalObject
    );
  }
  close() {
    this.modal.dismissAll();
  }

  show(mapRecord: GetMapRecordDto) {
    this._spinnerService.show();
    this._mapRecordService
      .getConfigureTerminalMapRecordForEdit(mapRecord.id)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe({
        next: (result: GetConfigureTerminalForEditResponce) => {
          console.log(result);
          this.configureTerminalObject = result.getConfigureTerminalForEdit;
          this.intializeForm();
          this._spinnerService.hide();
          this.setValidations();
        },
        error: (e) => {
          this._toastrService.error(e.error.Message, 'Error');
        },
      });
    this.fields = this._assetGroupMappingService.getDataSourceFields(mapRecord);
    this.mapRecordId?.setValue(mapRecord.id);
    this.modal.open(this.configureTerminalTemplate);
  }
  setValidations() {
    if (!this.toTerminalFieldName?.value) {
      this.fromTerminalFieldName?.setValidators(Validators.required);
      this.fromTerminalFieldName?.updateValueAndValidity();
    } else {
      this.fromTerminalFieldName?.clearValidators();
      this.fromTerminalFieldName?.updateValueAndValidity();
    }
    if (!this.fromTerminalFieldName?.value) {
      this.toTerminalFieldName?.setValidators(Validators.required);
      this.toTerminalFieldName?.updateValueAndValidity();
    } else {
      this.toTerminalFieldName?.clearValidators();
      this.toTerminalFieldName?.updateValueAndValidity();
    }
  }

  selectChanged() {
    this.setValidations();
  }
  save() {
    this.saving = true;
    this.configureTerminalObject = this.configureTerminalForm.getFormValue();
    this._mapRecordService
      .addConfigureTerminalToMapRecord(this.configureTerminalObject)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe({
        next: () => {
          this.saving = false;
          this.close();
          this._toastrService.success(
            'Configure terminal has been added Successfully',
            'Success'
          );
          this.configureTerminalObject =
            new AddConfigureTerminalToMapRecordRequestDto();
          this.intializeForm();
          this.onCompletenessChanged.emit();
        },
        error: (e) => {
          this._toastrService.error(e.error.Message, 'Error');
        },
      });
  }

  get mapRecordId() {
    return this.configureTerminalForm.get('mapRecordId');
  }

  get fromTerminalFieldName() {
    return this.configureTerminalForm.get('fromTerminalFieldName');
  }

  get toTerminalFieldName() {
    return this.configureTerminalForm.get('toTerminalFieldName');
  }
}
