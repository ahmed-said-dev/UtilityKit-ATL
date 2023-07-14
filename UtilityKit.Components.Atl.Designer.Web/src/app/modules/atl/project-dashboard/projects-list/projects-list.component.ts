import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of } from 'rxjs';
import { ATLProjectDto } from '../../atl-project-model';
import { AtlProjectService } from '../../atl-project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  @Output() onDataLoaded = new EventEmitter();
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

  onCloseBlankATL() {
    this.getAll();
  }

  handleOpenProjectClick(atlProjectId: any) {
    let url = `atl/project-mapping/${atlProjectId}/open-project`;
    this._router.navigateByUrl(url);
  }

  handleSearchChange(event: any) {
    let filter: string = event.target.value;
    this.filteredAtlProjects = this.aTLProjects.filter((atl) =>
      atl.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
