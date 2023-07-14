import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, of, switchMap } from 'rxjs';
import {
  AssetTable,
  ContainmentSettingsInputDto,
  Network,
  ShowHideModeEnum,
  UNDProject,
} from '../../atl-project-model';
import { AtlProjectService } from '../../atl-project.service';
import {
  AddContainmentSettingsToMapRecordRequestDto,
  ContainmentSettingsDto,
  ContainmentTargetDto,
  GetContainmentSettingsMapRecordForEditResponce,
  GetMapRecordDto,
  SpatialRelationShip,
} from '../../map-record.model';
import { MapRecordService } from '../../map-record.service';
import { TreeNodeClass } from '../tree-helper';
import { ConfigureContainmentForm } from './configure-containment.form';
const Empty_Configure_Containment_Configuration: AddContainmentSettingsToMapRecordRequestDto =
  {
    mapRecordId: '',
    containmentSettingsJson: new ContainmentSettingsDto(),
  };
@Component({
  selector: 'app-configure-containment',
  templateUrl: './configure-containment.component.html',
  styleUrls: ['./configure-containment.component.scss'],
})
export class ConfigureContainmentComponent implements OnInit {
  @ViewChild('configureContainmentTemplate')
  configureContainmentTemplate: ConfigureContainmentComponent;
  atlProjectId: any;
  networks: Network[] = [];
  undProject: UNDProject = new UNDProject();
  filteredAssetTables: AssetTable[] = [];
  undProjectId: any;
  ShowHideMode = ShowHideModeEnum;
  selectedAsset: TreeNodeClass[] = [];
  treeDataSource: TreeNodeClass[] = [];
  dataArray: string[];
  saving = false;
  mapRecord: GetMapRecordDto;
  spatialRelationShip = SpatialRelationShip;
  configureContainmentForm: ConfigureContainmentForm;
  addContainmentSettings: AddContainmentSettingsToMapRecordRequestDto =
    new AddContainmentSettingsToMapRecordRequestDto();
  @Output() onCompletenessChanged = new EventEmitter<any>();
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _aTLProjectService: AtlProjectService,
    private cdr: ChangeDetectorRef,
    private _router: Router,
    private _mapRecordService: MapRecordService,
    private _spinnerService: NgxSpinnerService,
    private modal: NgbModal,
    private fb: FormBuilder,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    // this.resetCurrentForm();
    this.intializeForm();
  }

  private intializeForm() {
    this.configureContainmentForm = new ConfigureContainmentForm(
      this.addContainmentSettings
    );
  }

  private resetCurrentForm() {
    this.configureContainmentForm.reset();
  }

  get(containmentSettingsInput: ContainmentSettingsInputDto) {
    this._spinnerService.show();
    let undObservable = this._aTLProjectService.getUndDetailsForContainment(
      containmentSettingsInput
    );

    let containmentSettingsMapRecord =
      this._mapRecordService.getContainmentSettingsForEditQuery(
        this.mapRecord.id
      );

    undObservable
      .pipe(
        catchError((errorMessage) => {
          return of(errorMessage);
        }),
        finalize(() => {
          this._spinnerService.hide();
        }),
        switchMap((undProject: UNDProject) => {
          this.undProject = undProject;
          this.networks.push(...this.undProject.network);

          this.networks.forEach((element) => {
            this.filteredAssetTables.push(...element.assetTables);
          });
          this.formateTreeStructureFromAssetTable(this.filteredAssetTables);

          return containmentSettingsMapRecord;
        })
      )
      .subscribe((result: GetContainmentSettingsMapRecordForEditResponce) => {
        let containmentSettings =
          result.getContainmentSettingsForEdit.containmentSettingsJson;
        if (containmentSettings) {
          this.dataArray = containmentSettings.containmentTargets.map(
            (ct) => ct.key!
          );
          this.spatialRelation?.setValue(containmentSettings.relationShip);
        }

        this.checkNode(this.treeDataSource, this.dataArray);
        this.checkTreeValidation();
        this.cdr.detectChanges();

        this._spinnerService.hide();
        this.modal.open(this.configureContainmentTemplate);
      });
  }

  get tree() {
    return this.configureContainmentForm.get('tree');
  }

  checkTreeValidation() {
    if (this.selectedAsset.length == 0) {
      this.tree?.setValidators(Validators.required);
    } else {
      this.tree?.clearValidators();
    }
    this.tree?.updateValueAndValidity();
  }
  get spatialRelation() {
    return this.configureContainmentForm.get('spatialRelation');
  }

  save() {
    this.saving = true;
    let containmentSettings: AddContainmentSettingsToMapRecordRequestDto =
      new AddContainmentSettingsToMapRecordRequestDto();
    containmentSettings.containmentSettingsJson = this.formbackEdnObject();
    containmentSettings.containmentSettingsJson.relationShip =
      this.spatialRelation?.value;

    containmentSettings.mapRecordId = this.mapRecord.id!;

    // return;
    this._mapRecordService
      .addContainmentSettingsToMapRecord(containmentSettings)
      .pipe(
        finalize(() => {
          this.saving = false;
          // this._spinnerService.hide();
        })
      )
      .subscribe({
        next: (result) => {
          this.saving = false;
          this.close();
          this._toastrService.success(
            'Containment settings has been added to map record Successfully',
            'Success'
          );
          this.resetCurrentForm();
          this.onCompletenessChanged.emit();
        },
        error: (e) => {
          this._toastrService.error(e.error.Message, 'Error');
        },
      });
  }

  formateTreeStructureFromAssetTable(assetTables: AssetTable[]) {
    let treeDataSource: TreeNodeClass[] = [];
    assetTables.forEach((assetTable) => {
      let assetTableVar: TreeNodeClass = new TreeNodeClass();
      assetTableVar.key = assetTable.id;
      assetTableVar.label = assetTable.name;

      assetTable.assetGroups.forEach((assetGroup) => {
        let assetGroupVar: TreeNodeClass = new TreeNodeClass();
        assetGroupVar.key = assetGroup.id;
        assetGroupVar.label = assetGroup.name;
        assetGroupVar.parent = assetTableVar;
        assetTableVar.children?.push(assetGroupVar);

        assetGroup.assetTypes.forEach((assetType) => {
          let assetTypeVar: TreeNodeClass = new TreeNodeClass();
          assetTypeVar.key = assetType.id;
          assetTypeVar.label = assetType.name;
          assetTypeVar.parent = assetGroupVar;

          assetGroupVar.children?.push(assetTypeVar);
        });
      });
      treeDataSource.push(assetTableVar);
    });
    // console.log(treeDataSource);
    // this.treeDataSource = [];
    this.treeDataSource = treeDataSource;
  }

  show(
    containmentSettingsInput: ContainmentSettingsInputDto,
    mapRecord: GetMapRecordDto
  ) {
    this.mapRecord = mapRecord;
    this.get(containmentSettingsInput);
  }

  close() {
    this.treeDataSource = [];
    this.dataArray = [];
    this.selectedAsset = [];
    this.networks = [];
    this.filteredAssetTables = [];
    this.modal.dismissAll();
  }

  nodeSelect() {
    this.checkTreeValidation();
    // this.formbackEdnObject();
    // console.log(this.selectedAsset);
  }

  nodeUnSelect() {
    this.checkTreeValidation();
    // this.formbackEdnObject();
    // console.log(this.selectedAsset);
  }

  formbackEdnObject() {
    let ClonedObject: TreeNodeClass<any>[] = [];
    ClonedObject = [...this.selectedAsset];
    ClonedObject = ClonedObject.filter((sa) => sa.children?.length == 0);

    let containmentSettings: ContainmentSettingsDto =
      new ContainmentSettingsDto();
    ClonedObject.forEach((element) => {
      let containmentTarget: ContainmentTargetDto = new ContainmentTargetDto();
      containmentTarget.assetTableName = element.parent?.parent?.label;
      containmentTarget.assetGroupName = element.parent?.label;
      containmentTarget.assetTypeName = element.label;
      containmentTarget.key = element.key;
      containmentSettings.containmentTargets.push(containmentTarget);
    });
    containmentSettings.relationShip =
      this.configureContainmentForm.controls['spatialRelation']?.value;
    console.log(containmentSettings);
    return containmentSettings;
  }

  checkNode(nodes: TreeNodeClass[], str: string[] = []) {
    for (let i = 0; i < nodes?.length; i++) {
      if (!nodes[i].leaf) {
        for (let j = 0; j < nodes[i].children?.length!; j++) {
          if (str.includes(nodes[i].children[j].key!)) {
            if (!this.selectedAsset.includes(nodes[i].children[j])) {
              this.selectedAsset.push(nodes[i].children[j]);
            }
          }
        }
      } else {
        if (str.includes(nodes[i].key!)) {
          if (!this.selectedAsset.includes(nodes[i])) {
            this.selectedAsset.push(nodes[i]);
          }
        }
      }
      if (nodes[i].leaf) {
        continue;
      } else {
        this.checkNode(nodes[i].children, str);
        const count = nodes[i].children?.length;
        let c = 0;
        for (let j = 0; j < nodes[i].children?.length!; j++) {
          if (this.selectedAsset.includes(nodes[i].children[j])) {
            c++;
          }
          if (nodes[i].children[j].partialSelected) {
            nodes[i].partialSelected = true;
          }
        }
        if (c === 0) {
        } else if (c === count) {
          nodes[i].partialSelected = false;
          if (!this.selectedAsset.includes(nodes[i])) {
            this.selectedAsset.push(nodes[i]);
            // console.log(this.selectedAsset);
          }
        } else {
          nodes[i].partialSelected = true;
        }
      }
    }
  }
}
