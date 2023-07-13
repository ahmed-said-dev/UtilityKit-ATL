import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Schema } from 'src/app/pages/models/data-source.model';
import {
  AssetTable,
  ViewCatalogType,
} from 'src/app/pages/models/atl-project-model';

@Injectable({
  providedIn: 'root',
})
export class ProjectMappingService {
  constructor() {}

  //DataSource View Catalog
  private dataSourceViewCatalogMsg = new BehaviorSubject<Schema>(new Schema());
  currentDataSourceViewCatalogMsg =
    this.dataSourceViewCatalogMsg.asObservable();

  public updateDataSourceViewCatalogMsg(message: Schema): void {
    this.dataSourceViewCatalogMsg.next(message);
    localStorage.setItem(
      'DATA_SOURCE_VIEW_CATALOG_STORAGE',
      JSON.stringify(message)
    );
  }
  //DataSource View Catalog

  //destination View Catalog
  private destinationViewCatalogMsg = new BehaviorSubject<AssetTable>(
    new AssetTable()
  );
  currentDestinationViewCatalogMsg =
    this.destinationViewCatalogMsg.asObservable();

  public updateDestinationViewCatalogMsg(message: AssetTable): void {
    this.destinationViewCatalogMsg.next(message);
  }
  //destination View Catalog

  // View Catalog type
  private viewCatalogTypeMsg = new Subject<ViewCatalogType>();
  currentviewCatalogTypeMsg = this.viewCatalogTypeMsg.asObservable();

  public getViewCatalogTypeMsg(): Observable<ViewCatalogType> {
    return this.viewCatalogTypeMsg.asObservable();
  }

  public updateViewCatalogTypeMsg(message: ViewCatalogType): void {
    this.viewCatalogTypeMsg.next(message);
  }
  //DataSource View type

  // Display proect report button
  private displayProjectReportButtonMsg = new Subject<boolean>();
  currentDisplayProectReportButtonMsg =
    this.displayProjectReportButtonMsg.asObservable();

  public getDisplayProectReportButtonMsg(): Observable<boolean> {
    return this.displayProjectReportButtonMsg.asObservable();
  }

  public DisplayProectReportButtonMsg(message: boolean): void {
    this.displayProjectReportButtonMsg.next(message);
  }
  //Display proect report button
}
