import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, of, switchMap } from 'rxjs';
import {
  AddProjectReportRequestDto,
  ATLProjectDto,
  UNDProject,
} from '../../../atl-project-model';
import { AtlProjectService } from '../../../atl-project.service';

@Component({
  selector: 'app-connect-to-und',
  templateUrl: './connect-to-und.component.html',
  styleUrls: ['./connect-to-und.component.scss'],
})
export class ConnectToUndComponent implements OnInit {
  @ViewChild('connectToUnd', { static: false })
  connectToUnd: ConnectToUndComponent;
  @Output() connect = new EventEmitter<any>();
  allUNDProjects: UNDProject[] = [];
  filteredUNDProjects: UNDProject[] = [];
  uNDProject: UNDProject;
  aTLProject: ATLProjectDto;
  saving = false;

  selectedUNDId?: string = '';
  undProject: UNDProject;
  constructor(
    private modal: NgbModal,
    private _aTLProjectService: AtlProjectService,
    private _activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) {}

  getUndProjects() {
    this._spinnerService.show();
    this._aTLProjectService
      .getAllUND()
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe({
        next: (result) => {
          this.allUNDProjects = result;
          this.filteredUNDProjects = result;
          this._spinnerService.hide();
          this.modal.open(this.connectToUnd);
        },
        error: (e) => {
          this._toastrService.error(e.error.Message, 'Error');
        },
      });
  }
  ngOnInit(): void {}

  show() {
    this.getUndProjects();
  }

  close() {
    this.modal.dismissAll();
    this.selectedUNDId = '';
  }

  handleSearchChange(event: any) {
    let filter: string = event.target.value;
    this.filteredUNDProjects = this.allUNDProjects.filter((und) =>
      und.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  handleSelectUND(uNDProjectId?: string) {
    this.selectedUNDId = uNDProjectId;
  }

  handleConnectCLick() {
    this.saving = true;
    this._spinnerService.show();

    let atlProjectId = this._activatedRoute.snapshot.params['atlId'];
    let aTLProject: ATLProjectDto = new ATLProjectDto();
    aTLProject.id = atlProjectId;
    aTLProject.undProjectId = this.selectedUNDId;

    let ObservableUndProjectDetails = this._aTLProjectService.getUND(
      this.selectedUNDId!
    );

    ObservableUndProjectDetails.pipe(
      catchError((errorMessage) => {
        return of(errorMessage);
      }),
      finalize(() => {
        this._spinnerService.hide();
      }),
      switchMap((undProject: UNDProject) => {
        aTLProject.undProject = undProject;
        return this._aTLProjectService.edit(aTLProject);
      })
    ).subscribe({
      next: (atlUndResult: any) => {
        this.saving = false;

        this.connect.emit(atlUndResult.undProjectId);
        this.cdr.detectChanges();
        this.close();
        this._toastrService.success(
          'UND project has been connected Successfully',
          'Success'
        );
      },
      error: (e) => {
        this._toastrService.error(e.error.Message, 'Error');
      },
    });
  }
}
