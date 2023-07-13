import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ATLProjectDto } from '../atl-project-model';
import { AtlProjectService } from '../atl-project.service';
import { CreateBlankComponent } from './create-blank/create-blank.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss'],
})
export class ProjectDashboardComponent implements OnInit {
  itemClass: string = 'ms-1 ms-lg-2';
  btnClass: string =
    'btn btn-icon btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px';
  toolbarButtonIconSizeClass: string = 'svg-icon-1';

  @ViewChild('projectList') projectListObj: ProjectsListComponent;
  @ViewChild('createBalnkModal')
  createBalnkModal: CreateBlankComponent;

  constructor(private _router: Router) {}
  ngOnInit(): void {}

  openCreateBlankATL() {
    this.createBalnkModal.show();
  }
  onCloseBlankATL(aTLProject: ATLProjectDto) {
    // this.projectListObj.getAll();
    let url = `atl/project-mapping/${aTLProject.id}/open-project`;
    this._router.navigateByUrl(url);
  }
}
