import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, of } from 'rxjs';
import {
  ATLProjectDto,
  GetATLProjectWithMapRecordCountResponce,
  UNDProject,
} from 'src/app/pages/models/atl-project-model';
import { AtlProjectService } from 'src/app/pages/services/atl-project.service';
import { DestinationComponent } from './destination/destination.component';

@Component({
  selector: 'app-source-destination',
  templateUrl: './source-destination.component.html',
  styleUrls: ['./source-destination.component.scss'],
})
export class SourceDestinationComponent implements OnInit {
  @ViewChild('destination') destination: DestinationComponent; //TODO: should to revampping
  aTLProject: ATLProjectDto = new ATLProjectDto();
  connctedUNDProject: UNDProject;
  isUndConnected: boolean = false;
  uNDProject?: UNDProject = new UNDProject();
  isMappingBoardOpend: boolean = false;
  aTLProjectId: any;
  undProjectId: string = '';
  isDataSourceConnected: boolean = false;
  mapRecordsCount: number;
  projectCompletenessValue: any;

  constructor(
    private _router: Router,
    private _atlProjectService: AtlProjectService,
    private _activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.isMappingBoardOpend = false;
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
        if (this.aTLProject.undProjectId) {
          this.destination.get(this.aTLProject.undProjectId);
          this.undProjectId = this.aTLProject.undProjectId;
        }
        this.cdr.detectChanges();
        this._spinnerService.hide();
      });
  }

  handleOnConnectUND(event: { isConnected: boolean; undProjectId?: string }) {
    this.isUndConnected = event.isConnected;
    this.undProjectId = event.undProjectId!;
    this.cdr.detectChanges();
  }

  handleConnectDataSource(event: { isDataSourceConnected: boolean }) {
    this.isDataSourceConnected = event.isDataSourceConnected;
  }

  openMappingBoard() {
    let url = `atl/project-container/${this.aTLProjectId}/mapping-board/${this.undProjectId}/map-record`;
    this._router.navigateByUrl(url);
  }

  handleProjectReportClick() {
    let url = `atl/project-mapping/${this.aTLProjectId}/project-report`;
    this._router.navigateByUrl(url);
  }
}
