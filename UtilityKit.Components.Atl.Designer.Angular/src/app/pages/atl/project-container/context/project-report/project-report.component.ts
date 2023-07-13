import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of } from 'rxjs';
import {
  GetATLProjectReportResponce,
  ProjectReportDto,
} from 'src/app/pages/models/atl-project-model';
import { AtlProjectService } from 'src/app/pages/services/atl-project.service';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss'],
})
export class ProjectReportComponent implements OnInit {
  @ViewChild('projectReportTemplate', { static: false })
  projectReportTemplate: ProjectReportComponent;

  projectReport: ProjectReportDto[];
  projectCompletenessValue: number;
  constructor(
    private _atlProjectService: AtlProjectService,
    private cdr: ChangeDetectorRef,
    private _spinnerService: NgxSpinnerService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {}
  show(aTLProjectId: any) {
    this.getAtlReport(aTLProjectId);
  }
  getAtlReport(aTLProjectId: string) {
    this._spinnerService.show();
    this._atlProjectService
      .getATLProjectReport(aTLProjectId)
      .pipe(
        catchError((errorMessage) => {
          return of(errorMessage);
        }),
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((getATLProjectReportResponce: GetATLProjectReportResponce) => {
        this.projectReport = getATLProjectReportResponce.projectReportJson;
        this.projectCompletenessValue =
          getATLProjectReportResponce.projectCompletenessValue;
        this.cdr.detectChanges();
        this.modal.open(this.projectReportTemplate, { size: 'xl' });
      });
  }

  close() {
    this.modal.dismissAll();
  }
}
