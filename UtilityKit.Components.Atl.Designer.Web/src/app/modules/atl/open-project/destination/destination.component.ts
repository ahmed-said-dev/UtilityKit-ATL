import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import {
  AddProjectReportRequestDto,
  AssetTable,
  ATLProjectDto,
  Network,
  UNDProject,
} from '../../atl-project-model';
import { AtlProjectService } from '../../atl-project.service';
import { ConnectToUndComponent } from './connect-to-und/connect-to-und.component';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/services/Swal.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit, OnDestroy {
  @ViewChild('connectUNDModal') connectUNDModal: ConnectToUndComponent;
  @Input() uNDProjectId: string;
  @Input() undHasMapRecords: boolean;
  @Output() connectUnd = new EventEmitter<{
    isConnected: boolean;
    undProjectId?: string;
  }>();
  undProject?: UNDProject;
  isATLConnectUND: boolean = false;
  atlProject: ATLProjectDto = new ATLProjectDto();
  networks: Network[] = [];
  assetTables: AssetTable[] = [];
  constructor(
    private _aTLProjectService: AtlProjectService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService,
    private _swalService: SwalService,
    private _spinnerService: NgxSpinnerService
  ) {}
  ngOnDestroy(): void {
    this._aTLProjectService.undProject = this.undProject;
  }

  ngOnInit(): void {
    this.atlProject.id = this._activatedRoute.snapshot.params['atlId'];
    this.get(this.uNDProjectId);
  }

  openConnectToUnd() {
    this.connectUNDModal.show();
  }

  get(uNDProjectId?: string) {
    if (uNDProjectId) {
      this._spinnerService.show();
      this._aTLProjectService
        .getUND(uNDProjectId)
        .pipe(
          catchError((errorMessage) => {
            return of(errorMessage);
          }),
          finalize(() => {
            this._spinnerService.hide();
          })
        )
        .subscribe((undProject: UNDProject) => {
          this.undProject = undProject;
          if (undProject) {
            // this.formatUndToProjectReport(undProject)
            // let addProjectReportRequest: AddProjectReportRequestDto =
            //   new AddProjectReportRequestDto();
            // addProjectReportRequest.undProject = undProject;

            // this._aTLProjectService
            //   .addProjectReport(addProjectReportRequest)
            //   .subscribe((result) => console.log(result));
            this.isATLConnectUND = true;
            this.connectUnd.emit({
              isConnected: true,
              undProjectId: this.undProject.projectId,
            });
          } else {
            this.isATLConnectUND = false;
          }
          this._spinnerService.hide();
        });
    } else {
      this.isATLConnectUND = false;
    }
    this.cdr.detectChanges();
  }

  formatUndToProjectReport(undProject: UNDProject) {
    throw new Error('Method not implemented.');
  }

  handleUNDConnect(uNDProjectId: string) {
    if (uNDProjectId != null) {
      this.get(uNDProjectId);
    }
  }

  handleDisconnect(undHasMapRecords: boolean) {
    if (undHasMapRecords) {
      this._toastrService.error(
        `the "${this.undProject?.name}" und project has map recrod`,
        'Error'
      );
      return;
    }
    this._swalService.confirmation(
      'Disconnect ATL Project',
      `Are you sure to disconnect ${this.undProject?.name}?`,
      () => {
        this._aTLProjectService
          .edit(this.atlProject)
          .pipe(
            catchError((errorMessage) => {
              return of(errorMessage);
            })
          )
          .subscribe({
            next: () => {
              this._toastrService.success(
                `"${this.undProject?.name}" has been disconnected Successfully`,
                'Success'
              );
              this.get();
              this.connectUnd.emit({
                isConnected: false,
              });
            },
            error: (e) => {
              this._toastrService.error(e.error.Message, 'Error');
            },
          });
      }
    );
  }
}
