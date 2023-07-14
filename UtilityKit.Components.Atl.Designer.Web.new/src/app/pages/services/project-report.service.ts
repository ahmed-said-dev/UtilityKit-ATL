import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectReportService {
  constructor() {}

  //update project report
  private projectCompletenessValueMsg = new Subject<string>();

  public getDataSourceViewCatalogMsg(): Observable<string> {
    return this.projectCompletenessValueMsg.asObservable();
  }

  public updateDataSourceViewCatalogMsg(message: string): void {
    this.projectCompletenessValueMsg.next(message);
  }
  //update project report
}
