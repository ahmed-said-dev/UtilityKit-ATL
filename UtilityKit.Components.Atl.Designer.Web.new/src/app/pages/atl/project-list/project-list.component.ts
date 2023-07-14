import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of } from 'rxjs';
import { ATLProjectDto } from '../../models/atl-project-model';
import { AtlProjectService } from '../../services/atl-project.service';
import { CreateBlankComponent } from '../create-blank/create-blank.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  @ViewChild('createBalnkModal')
  createBalnkModal: CreateBlankComponent;

  aTLProjects: ATLProjectDto[] = [];
  filteredAtlProjects: ATLProjectDto[] = [];
  constructor(
    private _atlProjectService: AtlProjectService,
    private cdr: ChangeDetectorRef,
    private _router: Router,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._spinnerService.show();
    this._atlProjectService
      .getAll()
      .pipe(
        catchError((errorMessage) => {
          return of(errorMessage);
        }),
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((result) => {
        this.aTLProjects = result;
        this.filteredAtlProjects = result;
        this.cdr.detectChanges();
        this._spinnerService.hide();
      });
  }

  onCloseBlankATL(atlProjectId: string) {
    let url = `atl/project-container/${atlProjectId}/project-mapping/content-preview`;
    this._router.navigateByUrl(url);
  }

  handleOpenProjectClick(atlProjectId: string) {
    let url = `atl/project-container/${atlProjectId}/project-mapping/content-preview`;
    this._router.navigateByUrl(url);
  }

  handleSearchChange(event: any) {
    let filter: string = event.target.value;
    this.filteredAtlProjects = this.aTLProjects.filter((atl) =>
      atl.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  createBlankProject() {
    this.createBalnkModal.show();
  }
}
