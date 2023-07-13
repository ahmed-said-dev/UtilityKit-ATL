import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MapRecordDto } from 'src/app/pages/models/map-record.model';

export class MapRecordForm extends FormGroup {
  constructor(
    readonly model: MapRecordDto,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        id: [model?.id],
        mapMode: [model?.mapMode, Validators.required],
        dataSourceEntityType: [
          model?.sourceDataJson.dataSourceEntityType,
          Validators.required,
        ],
        dataSourceEntityName: [
          model?.sourceDataJson.dataSourceEntityName,
          Validators.required,
        ],
        whereClause: [model?.sourceDataJson.whereClause],
        assetTypeId: [model?.destinationNetworkJson.assetTypeId, Validators.required],
        dataSourceId: [model?.dataSourceId, Validators.required],
        order: [model?.order],
      }).controls
    );
  }

  getFormValue(): MapRecordDto {
    var model = new MapRecordDto();
    if (this.valid) {
      model.id = this.controls.id.value;
      model.mapMode = this.controls.mapMode.value;
      model.sourceDataJson.dataSourceEntityType = this.controls.dataSourceEntityType.value;
      model.sourceDataJson.dataSourceEntityName = this.controls.dataSourceEntityName.value;
      model.sourceDataJson.whereClause = this.controls.whereClause.value;
      model.destinationNetworkJson.assetTypeId = this.controls.assetTypeId.value;
      model.dataSourceId = this.controls.dataSourceId.value;
      model.order = this.controls.order.value;
    }
    return model;
  }
}
