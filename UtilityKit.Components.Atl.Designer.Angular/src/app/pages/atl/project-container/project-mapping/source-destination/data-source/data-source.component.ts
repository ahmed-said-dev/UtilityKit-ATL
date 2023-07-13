import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  AddSchemaToATLResponce,
  Schema,
} from 'src/app/pages/models/data-source.model';
import { DataSourceService } from 'src/app/pages/services/data-source.service';
import { SwalService } from 'src/app/shared/services/Swal.service';
import { ProjectMappingService } from '../../../../../services/project-mapping.service';

import { CadDataSourceComponent } from './cad-data-source/cad-data-source.component';
import { GeodatabaseDataSourceComponent } from './geodatabase-data-source/geodatabase-data-source.component';
import { OracleDataSourceComponent } from './oracle-data-source/oracle-data-source.component';
import { SchemaDataSourceComponent } from './schema-data-source/schema-data-source.component';
import { ShapefileDataSourceComponent } from './shapefile-data-source/shapefile-data-source.component';
import { SqlDataSourceComponent } from './sql-data-source/sql-data-source.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss'],
})
export class DataSourceComponent implements OnInit, OnChanges {
  @ViewChild('schemaDataSource', { static: false })
  schemaDataSource: SchemaDataSourceComponent;

  @ViewChild('cadDataSource', { static: false })
  cadDataSource: CadDataSourceComponent;

  @Output() connectDataSource = new EventEmitter<{
    isDataSourceConnected: boolean;
  }>();

  schema: Schema = new Schema();
  schemaConnected: boolean = false;
  @Input() atlProjectId: string;
  addSchemaToATLResponce: AddSchemaToATLResponce[] = [];
  highlightedDataSourceRow: number;

  constructor(
    private modalService: NgbModal,
    private _dataSourceService: DataSourceService,
    private cdr: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _toastrService: ToastrService,
    private _ProjectMappingService: ProjectMappingService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.atlProjectId = this._activatedRoute.snapshot.params['atlId'];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.atlProjectId.currentValue) {
      this.getschema(changes.atlProjectId.currentValue);
    }
  }

  openSchema() {
    this.schemaDataSource.show();
  }

  openCAD() {
    this.cadDataSource.show();
  }

  openGDB() {
    this.modalService.open(GeodatabaseDataSourceComponent);
  }
  openSQL() {
    this.modalService.open(SqlDataSourceComponent);
  }
  openOracle() {
    this.modalService.open(OracleDataSourceComponent);
  }
  openShape() {
    this.modalService.open(ShapefileDataSourceComponent);
  }

  getschema(atlProjectId: any) {
    this._dataSourceService
      .get(atlProjectId)
      .subscribe((result: AddSchemaToATLResponce[]) => {
        if (result.length > 0) {
          this.addSchemaToATLResponce = result;
          this.schemaConnected = true;
          this.connectDataSource.emit({ isDataSourceConnected: true });
        } else {
          this.schemaConnected = false;
          this.connectDataSource.emit({ isDataSourceConnected: false });
        }
        this.cdr.detectChanges();
      });
  }

  handleSchemaConnect() {
    this.getschema(this.atlProjectId);
  }

  handleDisconnectDataSource(
    dataSourceId: string,
    dataSourceName: string,
    hasMapRecord: boolean
  ) {
    if (hasMapRecord) {
      this._toastrService.error(
        `the "${dataSourceName}" data source has map recrod`,
        'Error'
      );
      return;
    }

    this._swalService.confirmation(
      'Disconnect Data Source',
      `Are you sure to disconnect ${dataSourceName}?`,
      () => {
        this._dataSourceService
          .delete(dataSourceId)
          .subscribe((result: boolean) => {
            if (result) {
              this._toastrService.success(
                `"${dataSourceName}" has been disconnected Successfully`,
                'Success'
              );
              this.getschema(this.atlProjectId);
              this.cdr.detectChanges();
            }
          });
      }
    );
  }

  openViewCatalog(dataSourceSchemaJson: Schema, highlightedDataSource: number) {
    this.highlightedDataSourceRow = highlightedDataSource;
    this._ProjectMappingService.updateDataSourceViewCatalogMsg(
      dataSourceSchemaJson
    );
    let url = `atl/project-container/${this.atlProjectId}/project-mapping/content-preview/data-source-view-catalog`;
    this._router.navigateByUrl(url);
  }
}
