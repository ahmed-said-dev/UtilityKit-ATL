import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-project-mapping',
  templateUrl: './project-mapping.component.html',
})
export class ProjectMappingComponent implements OnInit {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    if (browserRefresh) {
      let atlId = this._activatedRoute.snapshot.params['atlId'];
      let url = `/atl/project-container/${atlId}/project-mapping/content-preview`;
      this._router.navigateByUrl(url);
    }
  }
}
