import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreateBlankComponent } from '../project-container/context/create-blank/create-blank.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  @ViewChild('createBalnkModal')
  createBalnkModal: CreateBlankComponent;

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  createBlankProject() {
    this.createBalnkModal.show();
  }

  onCloseBlankATL(atlProjectId: string) {
    let url = `atl/project-container/${atlProjectId}/project-mapping`;
    this._router.navigateByUrl(url);
  }

  // handleOpenProjectClick(atlProjectId: any) {
  //   let url = `atl/project-container/${atlProjectId}/project-mapping`;
  //   this._router.navigateByUrl(url);
  // }
}
