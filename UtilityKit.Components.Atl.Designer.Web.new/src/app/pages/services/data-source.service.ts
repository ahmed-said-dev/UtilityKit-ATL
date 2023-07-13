import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/Common.service';
import { environment } from 'src/environments/environment';
import {
  AddSchemaToATLRequest,
  AddSchemaToATLResponce,
  Schema,
} from '../models/data-source.model';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  private readonly dataSourceApi = `${environment.apiUrl}/DataSource`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  // public get(): Observable<Schema> {
  //   return this.http.get<Schema>(`${this.dataSourceApi}`);
  // }
  public get(aTLProjectId: string): Observable<AddSchemaToATLResponce[]> {
    return this.http.get<AddSchemaToATLResponce[]>(
      `${this.dataSourceApi}/${aTLProjectId}`
    );
  }

  public add(
    addSchemaToATLRequest: AddSchemaToATLRequest
  ): Observable<AddSchemaToATLResponce> {
    return this.http.post<AddSchemaToATLResponce>(
      `${this.dataSourceApi}`,
      addSchemaToATLRequest,
      this.commonService.httpOptions
    );
  }

  public delete(schemaId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.dataSourceApi}/${schemaId}`);
  }
}
