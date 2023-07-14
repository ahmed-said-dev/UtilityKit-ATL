import {
  AssetTableTypeEnum,
  DataSourceEntityTypeEnum,
  MapModeEnum,
} from './atl-project-model';
import { DataSourceDto } from './data-source.model';

export class CompletenessCriteriaDto {
  actionName: ActionsEnum;
  value: number;
  comment: string;
}

export enum ActionsEnum {
  AddFields = 1,
  AddConfigureThreeD = 2,
  AddContainmentSetting = 3,
  AddAssemblySetting = 4,
  AddStructureAttachmentSetting = 5,
  AddTerminalSetting = 6,
}
export class AddMapRecordRequest {
  mapRecord: MapRecordDto;
}

export class DestinationDto {
  networkId?: string;
  networkName: string;
  assetTableId: string;
  assetTableName: string;
  assetGroupId: string;
  assetGroupName: string;
  assetTypeId?: string;
  assetTypeName?: string;
  assetGroupCode: number;
  assetTypeCode: number;
  assetTableType: AssetTableTypeEnum;
}

export class SourceDataDto {
  constructor() {
    this.dataSourceEntityType = null;
  }
  dataSourceEntityType: DataSourceEntityTypeEnum | null;
  dataSourceEntityName: string | null;
  whereClause?: string;
}

export class TerminalSettingsDto {
  constructor(fromTerminalFieldName?: string, toTerminalFieldName?: string) {
    this.fromTerminalFieldName = fromTerminalFieldName;
    this.toTerminalFieldName = toTerminalFieldName;
  }
  fromTerminalFieldName?: string;
  toTerminalFieldName?: string;
}

export class ZValueSettingsDto {
  constructor(
    zFieldName?: string,
    zDefaultValue?: number,
    zValueSettingType?: ZValueSettingTypeEnum,
    zConditionsJson?: ZConditionDto[]
  ) {
    this.zFieldName = zFieldName;
    this.zDefaultValue = zDefaultValue;
    this.zValueSettingType = zValueSettingType;
    this.zConditionsJson = zConditionsJson;
  }
  zFieldName?: string;
  zDefaultValue?: number;
  zValueSettingType?: ZValueSettingTypeEnum;
  zConditionsJson?: ZConditionDto[];
}

export class MapRecordDto {
  id?: string;
  constructor() {
    this.destinationNetworkJson = new DestinationDto();
    this.sourceDataJson = new SourceDataDto();
  }
  destinationNetworkJson: DestinationDto;
  sourceDataJson: SourceDataDto;
  aTLProjectId: string;
  dataSourceId: string | null;
  zFieldName?: string;
  isActive: boolean;
  mapMode: MapModeEnum | null;
  order: number;
  newOrder?: number;
  fieldMapsJson?: FieldMapDto[];
}

export class GetMapRecordsByAssetGroupIdResponce {
  getMapRecords: GetMapRecordDto[];
}
export class GetAllMapRecordsForExecutionPlanResponce {
  getMapRecords: GetMapRecordDto[];
}
export class GetMapRecordDto extends MapRecordDto {
  dataSource?: DataSourceDto;
  completenessCriteriaJson?: CompletenessCriteriaDto[] = [];
  percentage?: number;
}

export class GetMapRecordResponse {
  mapRecord: MapRecordDto;
}

export class EditMapRecordRequest {
  mapRecord: MapRecordDto;
}

export class FieldMapDto {
  destinationFieldName: string;
  sourceFieldName?: string;
  isNull: boolean | undefined;
  staticValue: string | undefined;
  isMapped: boolean;
  replacementFilters: ReplacementFilterDto[] | undefined;
}

export class AddConfigureTerminalToMapRecordRequestDto {
  constructor() {
    this.terminalSettingsJson = new TerminalSettingsDto();
  }
  mapRecordId: string;
  terminalSettingsJson: TerminalSettingsDto | null;
}

export class AddConfigureThreeDToMapRecordRequestDto {
  constructor() {
    // this.zValueSettingsJson = new ZValueSettingsDto();
  }
  mapRecordId: string;
  zValueSettingsJson: ZValueSettingsDto | null;
}
export class GetConfigureThreeDForEditResponce {
  getConfigureThreeDForEdit: GetConfigureThreeDForEditDto;
}
export class GetConfigureThreeDForEditDto {
  mapRecordId: string;
  zValueSettingsJson: ZValueSettingsDto;
}

export class GetContainmentSettingsMapRecordForEditResponce {
  getContainmentSettingsForEdit: GetContainmentSettingsForEditDto;
}

export class GetContainmentSettingsForEditDto {
  mapRecordId: string;
  containmentSettingsJson: ContainmentSettingsDto;
}

export class GetConfigureTerminalForEditResponce {
  getConfigureTerminalForEdit: GetConfigureTerminalForEditDto;
}

export class GetConfigureTerminalForEditDto {
  mapRecordId: string;
  terminalSettingsJson: TerminalSettingsDto;
}

export class ReplacementFilterDto {
  replace: string;
  with: string;
}

export class MapRecordFieldMapsDto {
  /**
   *
   */
  constructor() {
    this.fieldMapsJson = [];
  }
  mapRecordId: string;
  fieldMapsJson: FieldMapDto[];
}

export class ZConditionDto {
  condition?: string;
  value?: string;
}

export enum ZValueSettingTypeEnum {
  zFieldName = 1,
  zDefaultValue = 2,
  zCondition = 3,
}

export class AddFieldMapsToMapRecordRequestDto {
  constructor() {
    this.mapRecordFieldMaps = new MapRecordFieldMapsDto();
  }
  public mapRecordFieldMaps: MapRecordFieldMapsDto;
}

export class GetFieldMapForEditResponce {
  MapRecordId: string;
  getFieldMapForEdit: GetFieldMapForEditDto[];
}

export class GetFieldMapForEditDto {
  destinationFieldName: string;
  sourceFieldName: string;
  isNull: boolean;
  staticValue?: string;
  isMapped: boolean;
  replacementFilters?: ReplacementFilterDto[];
}

export class ContainmentSettingsDto {
  relationShip?: SpatialRelationShip | null | undefined;
  containmentTargets: ContainmentTargetDto[];
  constructor() {
    this.containmentTargets = [];
  }
}

export class ContainmentTargetDto {
  key?: string;
  assetTableName?: string;
  assetGroupName?: string;
  assetTypeName?: string;
  assetGroupCode?: number;
  assetTypeCode?: number;
  containmentMode?: ContainmentMode;
}

export enum ContainmentMode {
  show = 1,
  hide = 2,
}

export enum SpatialRelationShip {
  contain = 1,
  intersect = 2,
}

export class AddContainmentSettingsToMapRecordRequestDto {
  mapRecordId: string;
  containmentSettingsJson: ContainmentSettingsDto | null;

  constructor() {
    this.containmentSettingsJson = new ContainmentSettingsDto();
  }
}

// StructureSettings
export class AddStructureSettingsToMapRecordRequestDto {
  mapRecordId: string;
  structureSettingsJson: StructureSettingsDto | null;

  constructor() {
    this.structureSettingsJson = new StructureSettingsDto();
  }
}

export class StructureSettingsDto {
  relationShip?: SpatialRelationShip | null | undefined;
  structureTargets: StructureTargetDto[];
  constructor() {
    this.structureTargets = [];
  }
}

export class StructureTargetDto {
  key?: string;
  assetTableName?: string;
  assetGroupName?: string;
  assetTypeName?: string;
  assetGroupCode?: number;
  assetTypeCode?: number;
  structureMode?: StructureMode;
}

export enum StructureMode {
  show = 1,
  hide = 2,
}

export class GetStructureSettingsMapRecordForEditResponce {
  getStructureSettingsForEdit: GetStructureSettingsForEditDto;
}

export class GetStructureSettingsForEditDto {
  mapRecordId: string;
  structureSettingsJson: StructureSettingsDto;
}
// StructureSettings

// AssemblySettings
export class GetAssemblySettingsMapRecordForEditResponce {
  getAssemblySettingsForEdit: GetAssemblySettingsForEditDto;
}

export class GetAssemblySettingsForEditDto {
  mapRecordId: string;
  assemblySettingsJson: AssemblySettingsDto;
}

export class AddAssemblySettingsToMapRecordRequestDto {
  mapRecordId: string;
  assemblySettingsJson: AssemblySettingsDto | null;

  constructor() {
    this.assemblySettingsJson = new AssemblySettingsDto();
  }
}

export class AssemblySettingsDto {
  relationShip?: SpatialRelationShip | null | undefined;
  assemblyTargets: AssemblyTargetDto[];
  constructor() {
    this.assemblyTargets = [];
  }
}

export class AssemblyTargetDto {
  key?: string;
  assetTableName?: string;
  assetGroupName?: string;
  assetTypeName?: string;
  assetGroupCode?: number;
  assetTypeCode?: number;
  assemblyMode?: AssemblyMode;
}

export enum AssemblyMode {
  show = 1,
  hide = 2,
}
// AssemblySettings
