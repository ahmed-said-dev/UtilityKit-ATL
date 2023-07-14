import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-map-record',
  templateUrl: './map-record.component.html',
  styleUrls: ['./map-record.component.scss'],
})
export class MapRecordComponent implements OnInit {
  refreshed: boolean;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (browserRefresh) {
      let atlId = this._activatedRoute.snapshot.params['atlId'];
      let undId = this._activatedRoute.snapshot.params['undId'];

      let url = `atl/project-container/${atlId}/mapping-board/${undId}/map-record`;
      this._router.navigateByUrl(url);
    }
  }
}
