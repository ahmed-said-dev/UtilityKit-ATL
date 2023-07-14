import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, Observable, of } from 'rxjs';
import { ATLProjectDto } from 'src/app/pages/models/atl-project-model';
import { AtlProjectService } from 'src/app/pages/services/atl-project.service';
@Injectable({ providedIn: 'root' })
export class LandingListGuard implements CanActivate {
  hasProject = false;
  constructor(
    private _router: Router,
    private _atlProjectService: AtlProjectService,
    private _spinnerService: NgxSpinnerService
  ) {}

  canActivate(): Observable<boolean> {
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
      .subscribe((result: ATLProjectDto[]) => {
        if (result.length > 0) {
          let url = `atl/project-list`;
          this._router.navigateByUrl(url);
          return of(false);
        }
      });
    return of(true);
  }
}
