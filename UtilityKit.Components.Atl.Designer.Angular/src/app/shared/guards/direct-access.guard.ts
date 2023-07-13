import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
@Injectable({ providedIn: 'root' })
export class DirectAccessGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const prevUrl = this._router
      .getCurrentNavigation()
      ?.previousNavigation?.finalUrl?.toString();
    if (
      prevUrl?.includes('/atl/project-mapping/') &&
      prevUrl?.includes('/mapping-board/')
    ) {
      return true;
    } else {
      let atlId = next.params.atlId;
      let url = `atl/project-mapping/${atlId}/open-project`;
      this._router.navigateByUrl(url);

      return false;
    }
  }
}
