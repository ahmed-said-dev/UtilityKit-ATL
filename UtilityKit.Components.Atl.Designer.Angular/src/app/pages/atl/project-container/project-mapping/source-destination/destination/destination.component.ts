import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { ConnectToUndComponent } from './connect-to-und/connect-to-und.component';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/services/Swal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AssetTable,
  ATLProjectDto,
  Network,
  UNDProject,
} from 'src/app/pages/models/atl-project-model';
import { AtlProjectService } from 'src/app/pages/services/atl-project.service';
import * as _lodash from 'lodash';
import { addIcons } from 'src/app/shared/helpers/add-Icons.helper';
import { ProjectMappingService } from 'src/app/pages/services/project-mapping.service';
@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit, OnDestroy, OnChanges {
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
  activeTabId = '';
  highlightedAssetTableRow: number;
  constructor(
    private _aTLProjectService: AtlProjectService,
    private cdr: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService,
    private _swalService: SwalService,
    private _spinnerService: NgxSpinnerService,
    private _router: Router,
    private _ProjectMappingService: ProjectMappingService
  ) {}

  ngOnDestroy(): void {
    this._aTLProjectService.undProject = this.undProject;
  }

  ngOnInit(): void {
    this.atlProject.id = this._activatedRoute.snapshot.params['atlId'];
    // this.get(this.uNDProjectId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.uNDProjectId.currentValue) {
      this.uNDProjectId = changes.uNDProjectId.currentValue;
      this.get(this.uNDProjectId);
    } else {
      this.get();
    }
  }

  openConnectToUnd() {
    this.connectUNDModal.show();
  }

  get(uNDProjectId?: string) {
    // this._spinnerService.show();
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

            this.undProject.network = _lodash.sortBy(
              undProject.network,
              ['domain'],
              ['desc']
            );
            this.undProject.network = addIcons(this.undProject.network);
            this.activeTabId = undProject.network.find(
              (n) => n.domain == false
            )?.id!;

            this.undProject.network.forEach(
              (t) => (t.assetTables = _lodash.sortBy(t.assetTables, ['order']))
            );

            this.connectUnd.emit({
              isConnected: true,
              undProjectId: this.undProject.projectId,
            });
          } else {
            this.isATLConnectUND = false;
          }
          // this._spinnerService.hide();
          this.cdr.detectChanges();
        });
    } else {
      this.isATLConnectUND = false;
      this.undProject = new UNDProject();
      // this._spinnerService.hide();
    }
  }

  handleUNDConnect(uNDProjectId: string) {
    if (uNDProjectId != null) {
      this.get(uNDProjectId);
      this._ProjectMappingService.DisplayProectReportButtonMsg(true);
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
              this._ProjectMappingService.DisplayProectReportButtonMsg(false);
            },
            error: (e) => {
              this._toastrService.error(e.error.Message, 'Error');
            },
          });
      }
    );
  }

  changeTab(tabId: string) {
    this.activeTabId = tabId;
  }

  openViewCatalog(assetTable: AssetTable, highlightedAssetTable: number) {
    this.highlightedAssetTableRow = highlightedAssetTable;
    this._ProjectMappingService.updateDestinationViewCatalogMsg(assetTable);

    let url = `atl/project-container/${this.atlProject.id}/project-mapping/content-preview/destination-view-catalog`;
    this._router.navigateByUrl(url);
  }
}
