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
import { SchemaDataSourceForm } from './schema-data-source.form';

@Component({
  selector: 'app-schema-data-source',
  templateUrl: './schema-data-source.component.html',
  styleUrls: ['./schema-data-source.component.scss'],
})
export class SchemaDataSourceComponent implements OnInit {
  @ViewChild('schemaDataSource') schemaDataSource: SchemaDataSourceComponent;
  addSchemaToATLRequest: AddSchemaToATLRequest = new AddSchemaToATLRequest();
  addSchemaToATLResponce: AddSchemaToATLResponce = new AddSchemaToATLResponce();
  @Output() connectSchema = new EventEmitter();
  fileUrl: string = '';
  saving = false;
  schemaDataSourceForm: SchemaDataSourceForm;
  dataSource: AtlSchema = new AtlSchema();
  atlProjectId: string;
  response: any;
  cancelClicked: boolean = false;
  fileType = FileTypeEnum.GEOFile;
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
    this.schemaDataSourceForm = new SchemaDataSourceForm(
      this.dataSource,
      this._dataSourceService
    );
  }

  handleConnect() {
    this.saving = true;
    this._spinnerService.show();
    // if (!this.fileUrl) {
    //   this._toastrService.warning('Please add file URL', 'Warning');
    //   this.saving = false;
    //   this._spinnerService.hide();
    // }
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
    /*
    1- here i should to read file from computer.
    2- write code in back end to convert this file to Schema Object and save it ot cache.
    3- fire event imetter to parent with schema object id.
    4- in the parent component call get method to get schema object by id returened from child component.
    */
  }

  show() {
    this.modal.open(this.schemaDataSource);
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
