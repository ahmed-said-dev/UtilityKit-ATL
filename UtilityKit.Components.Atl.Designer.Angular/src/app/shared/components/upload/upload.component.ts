import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { FileTypeEnum } from '../../models/file-type';
import { CommonService } from '../../services/Common.service';

export class RequestData {
  dataFilePath: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit, OnChanges {
  progress: number;
  message: string;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onDeleteFile = new EventEmitter();

  private readonly mapRecordApi = `${environment.apiUrl}/Upload`;
  fileName: string;
  dataFilePath: string;
  atlProjectId: any;
  @Input() cancelClicked: boolean;
  @Input() fileType: FileTypeEnum;
  accept: string;
  constructor(
    private http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.atlProjectId = this._activatedRoute.snapshot.params['atlId'];
    this.setAcceptedExtension(this.fileType);
  }

  setAcceptedExtension(fileType: FileTypeEnum) {
    if (fileType == FileTypeEnum.CADFile) {
      this.accept = '.dwg';
    }
    if (fileType == FileTypeEnum.GEOFile) {
      this.accept = '.zip,.rar,.7zip';
    }

    return;
  }
  ngOnChanges() {
    if (this.cancelClicked && this.fileName) {
      this.deleteDataSource();
    }
  }
  uploadFile = (files: any) => {
    this._spinnerService.show();
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('fileType', FileTypeEnum[this.fileType]);

    this.http
      .post(`${this.mapRecordApi}`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round((100 * event.loaded) / event.total!);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.fileName = fileToUpload.name;
            this._spinnerService.hide();
            this.onUploadFinished.emit(this.fileName);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  };
  deleteDataSource() {
    this.http
      .delete<boolean>(`${this.mapRecordApi}/${this.fileName}`)
      .subscribe({
        next: (result) => {
          this.fileName = '';
          this.onDeleteFile.emit();
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  }

  // uploadFile = (files) => {
  //   if (files.length === 0) {
  //     return;
  //   }

  //   let filesToUpload : File[] = files;
  //   const formData = new FormData();

  //   Array.from(filesToUpload).map((file, index) => {
  //     return formData.append('file'+index, file, file.name);
  //   });

  //   this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe(
  //       {next: (event) => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     },
  //     error: (err: HttpErrorResponse) => console.log(err)
  //   });
  // }
}
