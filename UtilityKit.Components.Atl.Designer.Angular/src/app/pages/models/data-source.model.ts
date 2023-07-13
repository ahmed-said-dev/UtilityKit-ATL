export class Schema {
  name: string;
  tables?: Table[];
  featureClasses?: FeatureClass[];
  dataSourceSchemaType: number;
}

export class AtlSchema {
  name: string;
  atlProjectId: string;
}

export class Table {
  name: string;
  fields: Field[];
}

export class Field {
  name: string;
  alias: string;
  type: string;
  length: number;
  isNullable: boolean;
}

export class FeatureClass {
  name: string;
  featureClassType: number;
  fields: Field[];
}

export class AddSchemaToATLRequest {
  constructor() {
    this.schema = new Schema();
  }
  ATLProjectId: string;
  schema?: Schema;
  fileUrl: string;
}
export class AddCadToATLRequest {
  ATLProjectId: string;
  fileUrl: string;
}

export class AddSchemaToATLResponce {
  dataSource: DataSourceDto;
  hasMapRecord: boolean;
}

export class DataSourceDto {
  id: string;

  name: string;

  dataSourceSchemaJson: Schema;

  tablesCount: number;

  featureClassesCount: number;

  aTLProjectId: string;

  dataSourceTypeId: number;
}
