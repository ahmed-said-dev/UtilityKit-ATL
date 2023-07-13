import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CommonService } from 'src/app/shared/services/Common.service';
import { environment } from 'src/environments/environment';
import {
  AddProjectReportRequestDto,
  ATLProjectDto,
  ContainmentSettingsInputDto,
  GetATLProjectReportResponce,
  GetATLProjectWithMapRecordCountResponce,
  StructureAttachmentSettingsInputDto,
  UNDProject,
} from '../models/atl-project-model';

@Injectable({
  providedIn: 'root',
})
export class AtlProjectService {
  private readonly aTLProjectApi = `${environment.apiUrl}/ATLProject`;
  private readonly uNDProjectApi = `${environment.undApiUrl}/UndProject`;
  private readonly uNDDetailsApi = `${environment.undApiUrl}/UndProject/undDetails`;
  private readonly getUndDetailsForContainmentApi = `${environment.undApiUrl}/UndProject/GetUndDetailsForContainment`;
  private readonly getUndDetailsForContainmentStructuralAttachementApi = `${environment.undApiUrl}/UndProject/GetUndDetailsForStructuralAttachement`;

  undProject?: UNDProject;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  public add(aTLProject: ATLProjectDto): Observable<ATLProjectDto> {
    return this.http.post<ATLProjectDto>(
      `${this.aTLProjectApi}`,
      aTLProject,
      this.commonService.httpOptions
    );
  }

  public edit(aTLProjectId: ATLProjectDto): Observable<ATLProjectDto> {
    return this.http.put<ATLProjectDto>(
      `${this.aTLProjectApi}`,
      aTLProjectId,
      this.commonService.httpOptions
    );
  }

  public update(atlProject: ATLProjectDto): Observable<ATLProjectDto> {
    return this.http.put<ATLProjectDto>(
      `${this.aTLProjectApi}/Update`,
      atlProject,
      this.commonService.httpOptions
    );
  }

  public checkUniqueness(atlProject: ATLProjectDto): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.aTLProjectApi}/CheckUniqueness`,
      atlProject,
      this.commonService.httpOptions
    );
  }

  public getAll(): Observable<ATLProjectDto[]> {
    return this.http.get<ATLProjectDto[]>(
      `${this.aTLProjectApi}`,
      this.commonService.httpOptions
    );
  }

  public getATLMapRecordCount(
    aTLProjectId: string
  ): Observable<GetATLProjectWithMapRecordCountResponce> {
    return this.http.get<GetATLProjectWithMapRecordCountResponce>(
      `${this.aTLProjectApi}/GetATLMapRecordCount/${aTLProjectId}`
    );
  }

  public getAllUND(): Observable<UNDProject[]> {
    return this.http.get<UNDProject[]>(`${this.uNDProjectApi}`);
  }

  public getUND(uNDProjectId: string): Observable<UNDProject> {
    return this.http.get<UNDProject>(`${this.uNDDetailsApi}/${uNDProjectId}`);
  }

  public getAtlProject(aTLProjectId: string): Observable<ATLProjectDto> {
    return this.http.get<ATLProjectDto>(
      `${this.aTLProjectApi}/${aTLProjectId}`
    );
  }

  public getUndDetailsForContainment(
    input: ContainmentSettingsInputDto
  ): Observable<UNDProject> {
    return this.http.get<UNDProject>(
      `${this.getUndDetailsForContainmentApi}/${input.projectId}/${input.networkID}/${input.assetTableID}/${input.assetGroupID}/${input.assetTypeID}`
    );
  }

  public getUndDetailsForStructuralAttachement(
    input: StructureAttachmentSettingsInputDto
  ): Observable<UNDProject> {
    return this.http.get<UNDProject>(
      `${this.getUndDetailsForContainmentStructuralAttachementApi}/${input.projectId}/${input.networkID}/${input.assetTableID}/${input.assetGroupID}/${input.assetTypeID}`
    );
  }

  public addProjectReport(
    addProjectReportRequest: AddProjectReportRequestDto
  ): Observable<any> {
    return this.http.put<AddProjectReportRequestDto>(
      `${this.aTLProjectApi}/AddProjectReport`,
      addProjectReportRequest,
      this.commonService.httpOptions
    );
  }

  public getATLProjectReport(
    aTLProjectId: string
  ): Observable<GetATLProjectReportResponce> {
    return this.http.get<GetATLProjectReportResponce>(
      `${this.aTLProjectApi}/GetATLProjectReport/${aTLProjectId}`
    );
  }
}
