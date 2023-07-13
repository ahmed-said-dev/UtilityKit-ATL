import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import {
  AddSchemaToATLRequest,
  AddSchemaToATLResponce,
  AtlSchema,
  Schema,
} from 'src/app/pages/models/data-source.model';
import { DataSourceService } from 'src/app/pages/services/data-source.service';
import { FileTypeEnum } from 'src/app/shared/models/file-type';
import { CadDataSourceForm } from './cad-data-source.form';

@Component({
  selector: 'app-cad-data-source',
  templateUrl: './cad-data-source.component.html',
  styleUrls: ['./cad-data-source.component.scss'],
})
export class CadDataSourceComponent implements OnInit {
  @ViewChild('cadDataSourceTemplate')
  cadDataSourceTemplate: CadDataSourceComponent;
  addSchemaToATLRequest: AddSchemaToATLRequest = new AddSchemaToATLRequest();
  addSchemaToATLResponce: AddSchemaToATLResponce = new AddSchemaToATLResponce();
  @Output() connectSchema = new EventEmitter();
  fileUrl: string = '';
  saving = false;
  schemaDataSourceForm: CadDataSourceForm;
  dataSource: AtlSchema = new AtlSchema();
  atlProjectId: string;
  response: any;
  cancelClicked: boolean = false;
  fileType = FileTypeEnum.CADFile;
  constructor(
    private modal: NgbModal,
    private _dataSourceService: DataSourceService,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.cancelClicked = false;
    this.atlProjectId = this._activatedRoute.snapshot.params['atlId'];
    this.dataSource.atlProjectId = this.atlProjectId;
    this.intializeForm();
  }

  private intializeForm() {
    this.schemaDataSourceForm = new CadDataSourceForm(
      this.dataSource,
      this._dataSourceService
    );
  }

  handleConnect() {
    this.saving = true;
    this._spinnerService.show();
    let atlProjectId = this._activatedRoute.snapshot.params['atlId'];
    this.addSchemaToATLRequest.ATLProjectId = atlProjectId;
    this.addSchemaToATLRequest.fileUrl = this.fileUrl;
    let schema1: Schema = new Schema();
    schema1.name = this.name?.value;
    this.addSchemaToATLRequest.schema = schema1;

    this._dataSourceService
      .add(this.addSchemaToATLRequest)
      .pipe(
        finalize(() => {
          this.saving = false;
          this._spinnerService.hide();
        })
      )
      .subscribe((addSchemaToATLResponceResult: AddSchemaToATLResponce) => {
        this.addSchemaToATLResponce = addSchemaToATLResponceResult;
        this.connectSchema.emit();
        this.close();
        this.saving = false;
        this._spinnerService.hide();
        this.fileUrl = '';
      });
  }

  show() {
    this.modal.open(this.cadDataSourceTemplate);
    this.cancelClicked = false;
  }

  close() {
    this.cancelClicked = true;
    this.modal.dismissAll();
    this.schemaDataSourceForm.reset();
  }

  DeleteFile() {
    this.uploadFileName?.setValidators(Validators.required);
    this.uploadFileName?.updateValueAndValidity();
  }

  get name() {
    return this.schemaDataSourceForm.get('name');
  }

  get uploadFileName() {
    return this.schemaDataSourceForm.get('uploadFileName');
  }

  uploadFinished = (path: string) => {
    this.fileUrl = path;
    this.uploadFileName?.clearValidators();
    this.uploadFileName?.updateValueAndValidity();

    // this.response = event;
  };
}
