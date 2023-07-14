import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class NgbModalDismissAllGuard implements CanActivateChild {
  constructor(private modalService: NgbModal) {}

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.modalService.hasOpenModals()) this.modalService.dismissAll();
    return true;
  }
}
