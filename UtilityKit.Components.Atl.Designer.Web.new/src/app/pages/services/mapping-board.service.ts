import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
// import { AssetTableTypeEnum, AssetType, DataSourceEntityTypeEnum } from '../atl-project-model';
// import { GetMapRecordDto } from '../map-record.model';

import {
  AssetTableTypeEnum,
  AssetType,
  DataSourceEntityTypeEnum,
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
  // public getAssetGroupMappingDataMsg(): Observable<AssetGroupMappingData> {
  //   return this.assetGroupMappingDataMsg.asObservable();
  // }

  // this for local storage stratigy
  getCurrentAssetGroupMapping() {
    return JSON.parse(localStorage.getItem('ASSET_GROUP_MAPPING_STORAGE')!);
  }

  getDataSourceFields(mapRecord: GetMapRecordDto): Field[] | undefined {
    if (
      mapRecord.sourceDataJson.dataSourceEntityType ==
      this.DataSourceEntityType.table
    ) {
      return mapRecord.dataSource?.dataSourceSchemaJson.tables?.find(
        (t) => t.name == mapRecord.sourceDataJson.dataSourceEntityName
      )?.fields;
    } else
      return mapRecord.dataSource?.dataSourceSchemaJson.featureClasses?.find(
        (f) => f.name == mapRecord.sourceDataJson.dataSourceEntityName
      )?.fields;
  }
}
