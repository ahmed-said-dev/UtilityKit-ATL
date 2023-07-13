import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Schema } from 'src/app/pages/models/data-source.model';
import { ViewCatalogType } from 'src/app/pages/models/atl-project-model';


const DATA_SOURCE_VIEW_CATALOG_STORAGE = '';

@Injectable({
  providedIn: 'root',
})
export class ProjectMappingService {
  constructor() {}

  //DataSource View Catalog
  private dataSourceViewCatalogMsg = new Subject<Schema>();

  // public getDataSourceViewCatalogMsg(): Observable<Schema> {
  //   return this.dataSourceViewCatalogMsg.asObservable();
  // }

  public updateDataSourceViewCatalogMsg(message: Schema): void {
    this.dataSourceViewCatalogMsg.next(message);
    localStorage.setItem(
      'DATA_SOURCE_VIEW_CATALOG_STORAGE',
      JSON.stringify(message)
    );
  }

  getCurrentDataSourceViewCatalog() {
    return JSON.parse(localStorage.getItem('DATA_SOURCE_VIEW_CATALOG_STORAGE')!);
  }
  //DataSource View Catalog

  //destination View Catalog
  private destinationViewCatalogMsg = new Subject<string>();

  public getDestinationViewCatalogMsg(): Observable<string> {
    return this.destinationViewCatalogMsg.asObservable();
  }

  public updateDestinationViewCatalogMsg(message: string): void {
    this.destinationViewCatalogMsg.next(message);
  }
  //destination View Catalog

    // View Catalog type
    private viewCatalogTypeMsg= new Subject<ViewCatalogType>();

    public getViewCatalogTypeMsg(): Observable<ViewCatalogType> {
      return this.viewCatalogTypeMsg.asObservable();
    }

    public updateViewCatalogTypeMsg(message: ViewCatalogType): void {
      this.viewCatalogTypeMsg.next(message);
    }
    //DataSource View type
}
