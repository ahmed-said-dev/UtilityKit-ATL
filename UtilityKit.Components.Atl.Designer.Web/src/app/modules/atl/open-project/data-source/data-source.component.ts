import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/services/Swal.service';
import {
  AddSchemaToATLResponce,
  DataSourceDto,
  Schema,
} from '../../data-source.model';
import { DataSourceService } from '../../data-source.service';
import { CadDataSourceComponent } from './cad-data-source/cad-data-source.component';
import { GeodatabaseDataSourceComponent } from './geodatabase-data-source/geodatabase-data-source.component';
import { OracleDataSourceComponent } from './oracle-data-source/oracle-data-source.component';
import { SchemaDataSourceComponent } from './schema-data-source/schema-data-source.component';
import { ShapefileDataSourceComponent } from './shapefile-data-source/shapefile-data-source.component';
import { SqlDataSourceComponent } from './sql-data-source/sql-data-source.component';
import { ViewCatalogComponent } from './view-catalog/view-catalog.component';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss'],
})
export class DataSourceComponent implements OnInit {
  @ViewChild('schemaDataSource', { static: false })
  schemaDataSource: SchemaDataSourceComponent;
  @ViewChild('viewCatalog', { static: false })
  viewCatalog: ViewCatalogComponent;
  @Output() connectDataSource = new EventEmitter<{
    isDataSourceConnected: boolean;
  }>();

  schema: Schema = new Schema();
  schemaConnected: boolean = false;
  atlProjectId: string;
  addSchemaToATLResponce: AddSchemaToATLResponce[] = [];

  constructor(
    private modalService: NgbModal,
    private _dataSourceService: DataSourceService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _swalService: SwalService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.atlProjectId = this._activatedRoute.snapshot.params['atlId'];
    this.getschema(this.atlProjectId);
  }

  openSchema() {
    this.schemaDataSource.show();
  }

  openGDB() {
    this.modalService.open(GeodatabaseDataSourceComponent);
  }
  openCAD() {
    this.modalService.open(CadDataSourceComponent);
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
      this._toastrService.error(`the "${dataSourceName}" data source has map recrod`, 'Error');
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

  openViewCatalog(dataSourceSchemaJson: Schema) {
    this.viewCatalog.show(dataSourceSchemaJson);
  }
}
