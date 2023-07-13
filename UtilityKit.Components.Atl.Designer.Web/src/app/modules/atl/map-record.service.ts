import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/Common.service';
import { environment } from 'src/environments/environment';
import {
  AddAssemblySettingsToMapRecordRequestDto,
  AddConfigureTerminalToMapRecordRequestDto,
  AddConfigureThreeDToMapRecordRequestDto,
  AddContainmentSettingsToMapRecordRequestDto,
  AddFieldMapsToMapRecordRequestDto,
  AddMapRecordRequest,
  AddStructureSettingsToMapRecordRequestDto,
  EditMapRecordRequest,
  GetAllMapRecordsForExecutionPlanResponce,
  GetAssemblySettingsMapRecordForEditResponce,
  GetConfigureTerminalForEditResponce,
  GetConfigureThreeDForEditDto,
  GetConfigureThreeDForEditResponce,
  GetContainmentSettingsMapRecordForEditResponce,
  GetFieldMapForEditResponce,
  GetMapRecordResponse,
  GetMapRecordsByAssetGroupIdResponce,
  GetStructureSettingsMapRecordForEditResponce,
  MapRecordDto,
} from './map-record.model';

@Injectable({
  providedIn: 'root',
})
export class MapRecordService {
  private readonly mapRecordApi = `${environment.apiUrl}/MapRecord`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  public getMapRecordByAssetGroupId(
    atlId: string,
    assetGroupId: string
  ): Observable<GetMapRecordsByAssetGroupIdResponce> {
    return this.http.get<GetMapRecordsByAssetGroupIdResponce>(
      `${this.mapRecordApi}/${atlId}/${assetGroupId}`
    );
  }

  public getAllMapRecordsForExecutionPlan(
    atlId: string
  ): Observable<GetAllMapRecordsForExecutionPlanResponce> {
    return this.http.get<GetAllMapRecordsForExecutionPlanResponce>(
      `${this.mapRecordApi}/GetAllMapRecordsForExecutionPlan/${atlId}`
    );
  }

  public add(addMapRecordRequest: AddMapRecordRequest): Observable<any> {
    return this.http.post<any>(
      `${this.mapRecordApi}`,
      addMapRecordRequest,
      this.commonService.httpOptions
    );
  }

  public delete(mapRecordId?: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mapRecordApi}/${mapRecordId}`);
  }

  public clone(mapRecordId?: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.mapRecordApi}/clone/${mapRecordId}`,
      mapRecordId
    );
  }

  public Activation(mapRecordId?: string): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.mapRecordApi}/Activation/${mapRecordId}`,
      mapRecordId
    );
  }

  public getDistinctAssetGroupIds(atlId: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.mapRecordApi}/GetDistinctAssetGroupIds/${atlId}`
    );
  }

  public get(mapRecordId: string): Observable<GetMapRecordResponse> {
    return this.http.get<GetMapRecordResponse>(
      `${this.mapRecordApi}/GetMapRecord/${mapRecordId}`
    );
  }

  public update(editMapRecordRequest: EditMapRecordRequest): Observable<any> {
    return this.http.put<any>(
      `${this.mapRecordApi}`,
      editMapRecordRequest,
      this.commonService.httpOptions
    );
  }

  public addFieldMapsToMapRecord(
    addFieldMapsToMapRecordRequestDto: AddFieldMapsToMapRecordRequestDto
  ): Observable<any> {
    return this.http.put<any>(
      `${this.mapRecordApi}/AddFieldMapToMapRecord`,
      addFieldMapsToMapRecordRequestDto,
      this.commonService.httpOptions
    );
  }

  public GetFieldMapForEdit(
    mapRecordId?: string
  ): Observable<GetFieldMapForEditResponce> {
    return this.http.get<GetFieldMapForEditResponce>(
      `${this.mapRecordApi}/GetFieldMapForEdit/${mapRecordId}`,
      this.commonService.httpOptions
    );
  }

  public addConfigureThreeDToMapRecord(
    addConfigureThreeDToMapRecordRequestDto: AddConfigureThreeDToMapRecordRequestDto
  ): Observable<any> {
    return this.http.put<any>(
      `${this.mapRecordApi}/AddConfigureThreeDToMapRecord`,
      addConfigureThreeDToMapRecordRequestDto,
      this.commonService.httpOptions
    );
  }

  public getConfigureThreeDForEdit(
    mapRecordId?: string
  ): Observable<GetConfigureThreeDForEditResponce> {
    return this.http.get<GetConfigureThreeDForEditResponce>(
      `${this.mapRecordApi}/GetConfigureThreeDForEdit/${mapRecordId}`,
      this.commonService.httpOptions
    );
  }

  public addConfigureTerminalToMapRecord(
    addConfigureTerminalToMapRecordRequestDto: AddConfigureTerminalToMapRecordRequestDto
  ): Observable<any> {
    return this.http.put<any>(
      `${this.mapRecordApi}/AddConfigureTerminalToMapRecord`,
      addConfigureTerminalToMapRecordRequestDto,
      this.commonService.httpOptions
    );
  }

  public getConfigureTerminalMapRecordForEdit(
    mapRecordId?: string
  ): Observable<GetConfigureTerminalForEditResponce> {
    return this.http.get<GetConfigureTerminalForEditResponce>(
      `${this.mapRecordApi}/GetConfigureTerminalMapRecordForEdit/${mapRecordId}`,
      this.commonService.httpOptions
    );
  }

  public addContainmentSettingsToMapRecord(
    addContainmentSettingsToMapRecordRequestDto: AddContainmentSettingsToMapRecordRequestDto
  ): Observable<any> {
    return this.http.put<any>(
      `${this.mapRecordApi}/AddContainmentSettingsToMapRecord`,
      addContainmentSettingsToMapRecordRequestDto,
      this.commonService.httpOptions
    );
  }

  public getContainmentSettingsForEditQuery(
    mapRecordId?: string
  ): Observable<GetContainmentSettingsMapRecordForEditResponce> {
    return this.http.get<GetContainmentSettingsMapRecordForEditResponce>(
      `${this.mapRecordApi}/GetContainmentSettingsForEditQuery/${mapRecordId}`,
      this.commonService.httpOptions
    );
  }

  public addStructureSettingsToMapRecord(
    addStructureSettingsToMapRecordRequestDto: AddStructureSettingsToMapRecordRequestDto
  ): Observable<any> {
    return this.http.put<any>(
      `${this.mapRecordApi}/AddStructureSettingsToMapRecord`,
      addStructureSettingsToMapRecordRequestDto,
      this.commonService.httpOptions
    );
  }

  public getStructureSettingsForEditQuery(
    mapRecordId?: string
  ): Observable<GetStructureSettingsMapRecordForEditResponce> {
    return this.http.get<GetStructureSettingsMapRecordForEditResponce>(
      `${this.mapRecordApi}/GetStructureSettingsForEditQuery/${mapRecordId}`,
      this.commonService.httpOptions
    );
  }

  public addAssemblySettingsToMapRecord(
    addAssemblySettingsToMapRecordRequestDto: AddAssemblySettingsToMapRecordRequestDto
  ): Observable<any> {
    return this.http.put<any>(
      `${this.mapRecordApi}/AddAssemblySettingsToMapRecord`,
      addAssemblySettingsToMapRecordRequestDto,
      this.commonService.httpOptions
    );
  }

  public getAssemblySettingsForEditQuery(
    mapRecordId?: string
  ): Observable<GetAssemblySettingsMapRecordForEditResponce> {
    return this.http.get<GetAssemblySettingsMapRecordForEditResponce>(
      `${this.mapRecordApi}/GetAssemblySettingsForEditQuery/${mapRecordId}`,
      this.commonService.httpOptions
    );
  }
}
