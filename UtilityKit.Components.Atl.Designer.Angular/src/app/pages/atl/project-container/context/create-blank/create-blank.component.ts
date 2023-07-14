import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CreateBlankForm } from './create-blank.form';
import { ATLProjectDto } from '../../../../models/atl-project-model';
import { AtlProjectService } from '../../../../services/atl-project.service';
import { NgxSpinnerService } from 'ngx-spinner';
const Empty_Atl_project: ATLProjectDto = {
  id: '',
  name: '',
  description: '',
};

@Component({
  selector: 'app-create-blank',
  templateUrl: './create-blank.component.html',
  styleUrls: ['./create-blank.component.scss'],
})
export class CreateBlankComponent implements OnInit {
  @ViewChild('createBlankModalContent', { static: false })
  createBlankModalContent: CreateBlankComponent;
  atlProject: ATLProjectDto = new ATLProjectDto();
  @Output() closeModalEvent = new EventEmitter<string>();
  @Output() updateFromList = new EventEmitter<string>();
  @Output() updateFromProjectContainer = new EventEmitter<string>();

  saving = false;
  createBlankForm: CreateBlankForm;

  constructor(
    private _atlProjectService: AtlProjectService,
    private modal: NgbModal,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.resetCurrentForm();
    this.intializeForm();
  }

  private resetCurrentForm() {
    if (!this.atlProject || !this.atlProject.id)
      this.atlProject = new ATLProjectDto();
  }

  private intializeForm() {
    this.createBlankForm = new CreateBlankForm(
      this.atlProject,
      this._atlProjectService
    );
  }
  save() {
    this.saving = true;
    this.atlProject = this.createBlankForm.getFormValue();
    if (this.atlProject.id) {
      this._atlProjectService
        .update(this.atlProject)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe({
          next: () => {
            this.close();
            this.saving = false;
            this._toastrService.info(
              'Atl project has been updated successfully',
              'info'
            );

            this.updateFromList.emit();
            this.updateFromProjectContainer.emit();
          },
          error: (e) => {
            this._toastrService.error(e.error.Message, 'Error');
          },
        });
    } else {
      this._atlProjectService
        .add(this.atlProject)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe({
          next: (result) => {
            this.close();
            this.saving = false;
            this._toastrService.success(
              'Atl project has been Saved Successfully',
              'Success'
            );
            this.closeModalEvent.emit(result.id);
          },
          error: (e) => {
            this._toastrService.error(e.error.Message, 'Error');
          },
        });
    }
  }

  checkUniqness(atlProject: ATLProjectDto) {}

  close() {
    this.atlProject = new ATLProjectDto();
    this.createBlankForm.reset();
    this.modal.dismissAll();
  }

  show(atlProjectId?: string) {
    this._spinnerService.show();
    if (atlProjectId) {
      this._atlProjectService
        .getAtlProject(atlProjectId)
        .pipe(
          catchError((errorMessage) => {
            return of(errorMessage);
          }),
          finalize(() => {
            this._spinnerService.hide();
          })
        )
        .subscribe((atlProject) => {
          this.atlProject = atlProject;
          this.resetCurrentForm();
          this.intializeForm();
          this.modal.open(this.createBlankModalContent);
        });
    } else {
      this.resetCurrentForm();
      this.intializeForm();
      this._spinnerService.hide();
      this.modal.open(this.createBlankModalContent);
    }
  }

  get name() {
    return this.createBlankForm.get('name');
  }
}
