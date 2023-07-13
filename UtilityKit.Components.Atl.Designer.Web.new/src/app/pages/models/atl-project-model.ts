import { CompletenessCriteriaDto, MapRecordDto } from './map-record.model';
import { Field } from './destination.field.model';

export class ATLProjectDto {
  id?: string | undefined;
  name: string;
  description?: string;
  undProjectId?: string | null;
  undProject?: UNDProject;
}
export class GetATLProjectWithMapRecordCountResponce {
  atlProject: ATLProjectDto;
  mapRecordsCount: number;
  projectCompletenessValue: number;
}

export class AssetTable {
  id: string;
  name: string;
  tableTypeId: AssetTableTypeEnum;
  assetGroups: AssetGroup[];
  fields: Field[];
  isLine: boolean;
}

export class AssetNode {
  constructor() {
    this.children = [];
    this.id = '';
  }
  id?: string;
  name: string;
  children: AssetNode[];
}

export enum ShowHideModeEnum {
  Show = 1,
  Hide = 2,
}

export class StructureNetwork {
  id: string;
  name: string;
  assetTables: AssetTable[];
  networkType: NetworkTypeEnum;
}

export class AssetType {
  id: string;
  name: string;
  code: number;
}

export class AssetGroup {
  id: string;
  name: string;
  assetTypes: AssetType[];
  aTid: string;
  isMapped: boolean;
  code: number;
}

export class DomainNetwork {
  id: string;
  name: string;
  assetTables: AssetTable[];
  networkType: NetworkTypeEnum;
}

export class TerminalConfiguration {
  id: string;
  name: string;
}
export class AddProjectReportRequestDto {
  undProject: UNDProject;
}
export class UNDProject {
  id?: string;
  projectId: string;
  utilityNetworkId: string;
  name: string;
  description: string;
  createdTime: Date;
  lastModifiedTime: Date;
  createdBy: string;
  datesetName: string;
  serviceAreaFeatureClassName: string;
  arcGISVersion: number;
  network: Network[];
}
export class Network {
  id: string;
  name: string;
  assetTables: AssetTable[];
  networkType: NetworkTypeEnum;
  domain: boolean;
}

export enum NetworkTypeEnum {
  StructureNetwork = 1,
  DomainNetwork = 2,
}

export enum DataSourceEntityTypeEnum {
  table = 1,
  featureClass = 2,
}

export enum MapModeEnum {
  insert = 1,
  update = 2,
}

export enum LineTableTypeId {
  DomainLine = 2,
  StructureLine = 8,
}

export enum AssetTableTypeEnum {
  DomainDevice = 1,
  DomainLine = 2,
  DomainJunction = 3,
  DomainAssembly = 4,
  DomainEdgeObject = 5,
  DomainJunctionObject = 6,
  DomainSubnetLine = 7,
  StructureLine = 8,
  StructureJunction = 9,
  StructureBoundry = 10,
  StructureEdgeObject = 11,
  StructureJunctionObject = 12,
}

class zConditionDto {
  condition: string;
  value: string;
}

export class DataSourceType {
  id: string;
  Name: string;

  // DataSources: DataSource[];
  MapRecords: MapRecordDto[];
}

export class ContainmentSettingsInputDto {
  networkID: string;
  projectId: string;
  assetTableID: string;
  assetGroupID: string;
  assetTypeID: string;
}

export class StructureAttachmentSettingsInputDto {
  projectId: string;
  networkID: string;
  assetTableID: string;
  assetGroupID: string;
  assetTypeID: string;
}

export class ProjectReportDto {
  undProjectId: string;
  networkId?: string;
  networkName: string;
  assetTableId: string;
  assetTableName: string;
  assetGroupId: string;
  assetGroupName: string;
  assetTypeId?: string;
  assetTypeName?: string;
  assetTableType: AssetTableTypeEnum;
  mapRecordIds: string[];
  completenessCriteriaJson: CompletenessCriteriaDto[];
  mapRecordOrderInsideAssetGroup: number;
}

export class GetATLProjectReportResponce {
  projectReportJson: ProjectReportDto[];
  projectCompletenessValue: number;
}
export enum ViewCatalogType {
  EmptyViewCatalog = 1,
  DataSourceViewCatalog = 2,
  DestinationViewCatalog = 3,
}
