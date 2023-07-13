import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of } from 'rxjs';
import {
  GetATLProjectReportResponce,
  ProjectReportDto,
} from '../atl-project-model';
import { AtlProjectService } from '../atl-project.service';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss'],
})
export class ProjectReportComponent implements OnInit {
  projectReport: ProjectReportDto[];
  projectCompletenessValue: number;
  constructor(
    private _router: Router,
    private _atlProjectService: AtlProjectService,
    private _activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    let aTLProjectId = this._activatedRoute.snapshot.params['atlId'];
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
      });
  }
}
