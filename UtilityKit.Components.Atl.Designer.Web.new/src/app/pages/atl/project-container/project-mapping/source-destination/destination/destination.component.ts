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
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { ConnectToUndComponent } from './connect-to-und/connect-to-und.component';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/services/Swal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AssetTable,
  ATLProjectDto,
  Network,
  NetworkTypeEnum,
  UNDProject,
} from 'src/app/pages/models/atl-project-model';
import { AtlProjectService } from 'src/app/pages/services/atl-project.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit, OnDestroy {
  tabs = {
    STRUCTURE_TAB: 0,
    DOMAIN_TAB: 1,
  };

  activeTabId = this.tabs.STRUCTURE_TAB; // 0 => Asset Groups | 1 => Fields | 2 => Attribute Assignment

  @ViewChild('connectUNDModal') connectUNDModal: ConnectToUndComponent;
  @Input() uNDProjectId: string;
  @Input() undHasMapRecords: boolean;
  @Output() connectUnd = new EventEmitter<{
    isConnected: boolean;
    undProjectId?: string;
  }>();
  undProject?: UNDProject;
  isATLConnectUND: boolean = true;
  atlProject: ATLProjectDto = new ATLProjectDto();
  networks: Network[] = [];
  assetTables: AssetTable[] = [];
  undProjectDomain: Network[];
  undProjectStructure: Network[];
  constructor(
    private _aTLProjectService: AtlProjectService,
    private cdr: ChangeDetectorRef,
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
    this._spinnerService.show();
    if (uNDProjectId) {
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
            this.isATLConnectUND = true;
            this.undProjectDomain = undProject.network.filter(
              (n) => n.domain == true
            );
            this.undProjectStructure = undProject.network.filter(
              (n) => n.domain == false
            );

            this.connectUnd.emit({
              isConnected: true,
              undProjectId: this.undProject.projectId,
            });
          } else {
            this.isATLConnectUND = false;
          }
          this._spinnerService.hide();
          this.cdr.detectChanges();
        });
    } else {
      this.isATLConnectUND = false;
    }
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

  changeTab(tabId: number) {
    this.activeTabId = tabId;
  }
}
