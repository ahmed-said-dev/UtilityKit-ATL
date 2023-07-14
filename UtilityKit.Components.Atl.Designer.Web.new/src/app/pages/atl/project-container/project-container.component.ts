import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of } from 'rxjs';
import {
  ATLProjectDto,
  GetATLProjectWithMapRecordCountResponce,
} from '../../models/atl-project-model';
import { AtlProjectService } from '../../services/atl-project.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
})
export class ProjectContainerComponent implements OnInit {
  mapRecordsCount: any;
  projectCompletenessValue: any;
  destination: any;
  undProjectId: any;
  aTLProject?: ATLProjectDto;
  aTLProjectId: any;
  constructor(
    private _atlProjectService: AtlProjectService,
    private _activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private _spinnerService: NgxSpinnerService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.aTLProjectId = this._activatedRoute.snapshot.params['atlId'];
    this.get(this.aTLProjectId);
  }

  get(atlProjectId: any) {
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
        this.aTLProject = result.atlProject;
        this.mapRecordsCount = result.mapRecordsCount;
        this.projectCompletenessValue = result.projectCompletenessValue;
        this.cdr.detectChanges();
        this._spinnerService.hide();
      });
  }

  handleProjectReportClick() {
    let url = `atl/project-container/${this.aTLProjectId}/project-report`;
    this._router.navigateByUrl(url);
  }
}
