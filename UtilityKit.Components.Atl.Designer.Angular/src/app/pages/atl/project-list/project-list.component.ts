import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { catchError, finalize, of } from 'rxjs';
import { ATLProjectDto } from '../../models/atl-project-model';
import { AtlProjectService } from '../../services/atl-project.service';
import { CreateBlankComponent } from '../project-container/context/create-blank/create-blank.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  @ViewChild('createBalnkModal')
  createBalnkModal: CreateBlankComponent;
  @ViewChild('dt1') dt1: Table | undefined;

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
    this.openProjectMapping(atlProjectId);
  }

  handleOpenProjectClick(atlProjectId: string) {
    this.openProjectMapping(atlProjectId);
  }

  openProjectMapping(atlProjectId: string) {
    let url = `atl/project-container/${atlProjectId}/project-mapping/content-preview`;
    this._router.navigateByUrl(url);
  }

  handleSearchChange(event: any, stringVal: string) {
    this.dt1!.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }

  createBlankProject() {
    this.createBalnkModal.show();
  }

  editProject(aTLProjectId: string) {
    this.createBalnkModal.show(aTLProjectId);
  }

  handleUpdateFromList() {
    this.getAll();
  }
}
