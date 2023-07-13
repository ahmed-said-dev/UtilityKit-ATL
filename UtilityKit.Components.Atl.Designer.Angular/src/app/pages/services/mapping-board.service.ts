import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
// import { AssetTableTypeEnum, AssetType, DataSourceEntityTypeEnum } from '../atl-project-model';
// import { GetMapRecordDto } from '../map-record.model';

import {
  AssetTableTypeEnum,
  AssetType,
  ContainmentSettingsInputDto,
  DataSourceEntityTypeEnum,
  StructureAttachmentSettingsInputDto,
} from 'src/app/pages/models/atl-project-model';
import { Field } from 'src/app/pages/models/data-source.model';
import { GetMapRecordDto } from 'src/app/pages/models/map-record.model';

export class AssetGroupMappingData {
  networkId: string | undefined;
  networkName: string;
  assetTableId: string;
  assetTableName: string;
  assetGroupId: string;
  assetGroupName: string;
  assetGroupCode: number;
  assetTypes: AssetType[] | null;
  aTLProjectId: string;
  dataSourceId: string | null;
  fields:
    | import('src/app/pages/models/destination.field.model').Field[]
    | undefined;
  isLine: boolean | undefined;
  uNDProjectId: string;
  assetTableType: AssetTableTypeEnum;
}
const ASSET_GROUP_MAPPING_STORAGE = '';
const DATA_SOURCE_FIELD_STORAGE = '';
const DESTINATION_FIELD_STORAGE = '';
const CONTAINMENT_SETTING_STORAGE = '';
const STRUCTURE_SETTING_STORAGE = '';

@Injectable({
  providedIn: 'root',
})
export class AssetGroupMappingService {
  dataSourceFields: Field[] | undefined;
  DataSourceEntityType = DataSourceEntityTypeEnum;
  constructor() {}

  private assetGroupMappingDataMsg = new Subject<AssetGroupMappingData>();
  currentAssetGroupMappingDataMsg =
    this.assetGroupMappingDataMsg.asObservable();

  public updateMessage(message: AssetGroupMappingData): void {
    this.assetGroupMappingDataMsg.next(message);
    localStorage.setItem(
      'ASSET_GROUP_MAPPING_STORAGE',
      JSON.stringify(message)
    );
  }

  getCurrentAssetGroupMapping() {
    return JSON.parse(localStorage.getItem('ASSET_GROUP_MAPPING_STORAGE')!);
  }

  public setDataSourceFields(mapRecord: GetMapRecordDto): void {
    let fieldList: Field[] | undefined;
    if (
      mapRecord.sourceDataJson.dataSourceEntityType ==
      this.DataSourceEntityType.table
    ) {
      fieldList = mapRecord.dataSource?.dataSourceSchemaJson.tables?.find(
        (t) => t.name == mapRecord.sourceDataJson.dataSourceEntityName
      )?.fields;
    } else
      fieldList =
        mapRecord.dataSource?.dataSourceSchemaJson.featureClasses?.find(
          (f) => f.name == mapRecord.sourceDataJson.dataSourceEntityName
        )?.fields;

    localStorage.setItem(
      'DATA_SOURCE_FIELD_STORAGE',
      JSON.stringify(fieldList)
    );
  }

  getDataSourceFields() {
    return JSON.parse(localStorage.getItem('DATA_SOURCE_FIELD_STORAGE')!);
  }

  setDestinationFields(
    destinationFields:
      | import('src/app/pages/models/destination.field.model').Field[]
      | undefined
  ) {
    localStorage.setItem(
      'DESTINATION_FIELD_STORAGE',
      JSON.stringify(destinationFields)
    );
  }

  getDestinationFields() {
    return JSON.parse(localStorage.getItem('DESTINATION_FIELD_STORAGE')!);
  }

  setContainmentSettings(
    containmentSettingsInput: ContainmentSettingsInputDto
  ) {
    localStorage.setItem(
      'CONTAINMENT_SETTING_STORAGE',
      JSON.stringify(containmentSettingsInput)
    );
  }

  getContainmentSettings() {
    return JSON.parse(localStorage.getItem('CONTAINMENT_SETTING_STORAGE')!);
  }

  setStructureSettings(
    structuralAttachementInput: StructureAttachmentSettingsInputDto
  ) {
    localStorage.setItem(
      'STRUCTURE_SETTING_STORAGE',
      JSON.stringify(structuralAttachementInput)
    );
  }

  getStructureSettings() {
    return JSON.parse(localStorage.getItem('STRUCTURE_SETTING_STORAGE')!);
  }

  mapRecordAdded() {
    throw new Error('Method not implemented.');
  }

  //map Record Added Or Deleted
  private mapRecordAddedMsg = new Subject<boolean>();

  public getmapRecordAddedMsg(): Observable<boolean> {
    return this.mapRecordAddedMsg.asObservable();
  }

  public updatemapRecordAddedMsg(message: boolean): void {
    this.mapRecordAddedMsg.next(message);
  }
  //map Record Added Or Deleted
}
