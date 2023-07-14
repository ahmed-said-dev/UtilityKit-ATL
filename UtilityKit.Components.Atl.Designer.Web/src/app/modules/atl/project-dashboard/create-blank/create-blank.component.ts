import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ATLProjectDto } from '../../atl-project-model';
import { AtlProjectService } from '../../atl-project.service';
import { CreateBlankForm } from './create-blank.form';
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
  createBlankModalContent: any;
  atlProject: ATLProjectDto = new ATLProjectDto();
  @Output() closeModalEvent = new EventEmitter<ATLProjectDto>();
  saving = false;
  createBlankForm: CreateBlankForm;

  constructor(
    private _atlProjectService: AtlProjectService,
    private modal: NgbModal,
    private _toastrService: ToastrService,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
  }

  ngOnInit(): void {
    this.resetCurrentMapRecord();
    this.intializeForm();
  }

  private resetCurrentMapRecord() {
    if (!this.atlProject || !this.atlProject.id)
      this.atlProject = Empty_Atl_project;
  }

  private intializeForm() {
    this.createBlankForm = new CreateBlankForm(this.atlProject);
  }
  save() {
    this.saving = true;
    this.atlProject = this.createBlankForm.getFormValue();
    // return;
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
          this.closeModalEvent.emit(result);
        },
        error: (e) => {
          this._toastrService.error(e.error.Message, 'Error');
        },
      });
  }

  close() {
    this.createBlankForm.reset();
    this.modal.dismissAll();
  }

  show() {
    this.modal.open(this.createBlankModalContent);
  }

  get name() {
    return this.createBlankForm.get('name');
  }
}
