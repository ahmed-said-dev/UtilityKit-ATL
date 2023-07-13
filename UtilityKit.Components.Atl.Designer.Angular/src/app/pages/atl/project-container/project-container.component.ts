import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, fromEvent, of, Subject, takeUntil } from 'rxjs';
import {
  ATLProjectDto,
  GetATLProjectWithMapRecordCountResponce,
} from '../../models/atl-project-model';
import { AtlProjectService } from '../../services/atl-project.service';
import { ProjectMappingService } from '../../services/project-mapping.service';
import { CreateBlankComponent } from './context/create-blank/create-blank.component';
import { ProjectReportComponent } from './context/project-report/project-report.component';
import { ViewExecutionPlanComponent } from './context/view-execution-plan/view-execution-plan.component';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
})
export class ProjectContainerComponent implements OnInit {
  @ViewChild('projectReportComponent', { static: false })
  projectReportComponent: ProjectReportComponent;
  @ViewChild('viewExecutionPlanComponent', { static: false })
  viewExecutionPlanComponent: ViewExecutionPlanComponent;
  @ViewChild('createBalnkModal')
  createBalnkModal: CreateBlankComponent;
  private unsubscriber1: Subject<void> = new Subject<void>();
  showError: boolean = false;
  mapRecordsCount: any;
  projectCompletenessValue: any;
  destination: any;
  undProjectId: any;
  aTLProject?: ATLProjectDto;
  aTLProjectId: any;
  displayProjectReportButton: boolean = false;
  constructor(
    private _atlProjectService: AtlProjectService,
    private _activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private _spinnerService: NgxSpinnerService,
    private _router: Router,
    private _ProjectMappingService: ProjectMappingService
  ) {}

  ngOnInit(): void {
    history.pushState(null, '', location.href);
    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber1))
      .subscribe((_) => {
        history.pushState(null, '', location.href);

        this.showError = true;
      });

    this._activatedRoute.params.subscribe(() => {
      this._ProjectMappingService
        .getDisplayProectReportButtonMsg()
        .subscribe((result) => {
          this.displayProjectReportButton = result;
        });
    });

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
          // this._spinnerService.hide();
        })
      )
      .subscribe((result: GetATLProjectWithMapRecordCountResponce) => {
        this.aTLProject = result.atlProject;
        this.mapRecordsCount = result.mapRecordsCount;
        this.projectCompletenessValue = result.projectCompletenessValue;
        if (this.aTLProject.undProjectId != null) {
          this.displayProjectReportButton = true;
        }
        this.cdr.detectChanges();
        // this._spinnerService.hide();
      });
  }

  handleProjectReportClick() {
    this.projectReportComponent.show(this.aTLProjectId);
  }

  viewExecutionPlan() {
    this.viewExecutionPlanComponent.show(this.aTLProjectId);
  }

  back() {
    let state: string = this._router.routerState.snapshot.url;
    if (state.includes('/mapping-board')) {
      let url = `/atl/project-container/${this.aTLProjectId}/project-mapping/content-preview`;
      this._router.navigateByUrl(url);
    }
    if (state.includes('/project-mapping')) {
      let url = `/atl/project-list`;
      this._router.navigateByUrl(url);
    }
  }

  onCloseBlankATL(atlProjectId: string) {
    let url = `atl/project-container/${atlProjectId}/project-mapping/content-preview`;
    this._router.navigateByUrl(url);
  }

  editProject() {
    this.createBalnkModal.show(this.aTLProjectId);
  }

  handleupdateFromProjectContainer() {
    this.get(this.aTLProjectId);
  }
}
