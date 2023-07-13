import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of } from 'rxjs';
import {
  ATLProjectDto,
  GetATLProjectWithMapRecordCountResponce,
} from 'src/app/pages/models/atl-project-model';
import { AtlProjectService } from 'src/app/pages/services/atl-project.service';
import { ProjectReportService } from 'src/app/pages/services/project-report.service';

@Component({
  selector: 'app-project-completeness-value',
  templateUrl: './project-completeness-value.component.html',
  styleUrls: ['./project-completeness-value.component.scss'],
})
export class ProjectCompletenessValueComponent implements OnInit {
  projectCompletenessValue: any;
  atlProjectId: any;

  constructor(
    private _atlProjectService: AtlProjectService,
    private cdr: ChangeDetectorRef,
    private _spinnerService: NgxSpinnerService,
    private _activatedRoute: ActivatedRoute,
    private _projectReportService: ProjectReportService
  ) {}

  ngOnInit(): void {
    this.atlProjectId = this._activatedRoute.snapshot.params['atlId'];
    this.get(this.atlProjectId);
    this._projectReportService
      .getDataSourceViewCatalogMsg()
      .subscribe((atlProjectId) => {
        this.get(atlProjectId);
      });
  }

  get(atlProjectId: string) {
    this._spinnerService.show();
    this._atlProjectService
      .getATLMapRecordCount(atlProjectId)
      .pipe(
        catchError((errorMessage) => {
          return of(errorMessage);
        }),
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((result: GetATLProjectWithMapRecordCountResponce) => {
        this.projectCompletenessValue = result.projectCompletenessValue;
        this.cdr.detectChanges();
        this._spinnerService.hide();
      });
  }
}
