import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, of, switchMap } from 'rxjs';
import {
  AssetTable,
  Network,
  ShowHideModeEnum,
  StructureAttachmentSettingsInputDto,
  UNDProject,
} from '../../atl-project-model';
import { AtlProjectService } from '../../atl-project.service';
import {
  AddStructureSettingsToMapRecordRequestDto,
  GetMapRecordDto,
  GetStructureSettingsMapRecordForEditResponce,
  SpatialRelationShip,
  StructureSettingsDto,
  StructureTargetDto,
} from '../../map-record.model';
import { MapRecordService } from '../../map-record.service';
import { TreeNodeClass } from '../tree-helper';
import { ConfigureStructureForm } from './configure-structure.form';

@Component({
  selector: 'app-configure-structure',
  templateUrl: './configure-structure.component.html',
  styleUrls: ['./configure-structure.component.scss'],
})
export class ConfigureStructureComponent implements OnInit {
  @ViewChild('configureStructureTemplate')
  configureStructureTemplate: ConfigureStructureComponent;
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
  configureStructureForm: ConfigureStructureForm;
  addStructureSettings: AddStructureSettingsToMapRecordRequestDto =
    new AddStructureSettingsToMapRecordRequestDto();
  @Output() onCompletenessChanged = new EventEmitter<any>();
  constructor(
    private _aTLProjectService: AtlProjectService,
    private cdr: ChangeDetectorRef,
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
    this.configureStructureForm = new ConfigureStructureForm(
      this.addStructureSettings
    );
  }

  private resetCurrentForm() {
    this.configureStructureForm.reset();
  }

  get(structuralAttachementInput: StructureAttachmentSettingsInputDto) {
    this._spinnerService.show();
    let undObservable =
      this._aTLProjectService.getUndDetailsForStructuralAttachement(
        structuralAttachementInput
      );

    let structureSettingsMapRecord =
      this._mapRecordService.getStructureSettingsForEditQuery(
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

          return structureSettingsMapRecord;
        })
      )
      .subscribe((result: GetStructureSettingsMapRecordForEditResponce) => {
        let structureSettings =
          result.getStructureSettingsForEdit.structureSettingsJson;
        if (structureSettings && structureSettings) {
          this.dataArray = structureSettings.structureTargets.map(
            (ct) => ct.key!
          );
          this.spatialRelation?.setValue(structureSettings.relationShip);
        }

        this.checkNode(this.treeDataSource, this.dataArray);
        this.checkTreeValidation();
        this.cdr.detectChanges();

        this._spinnerService.hide();
        this.modal.open(this.configureStructureTemplate);
      });
  }

  get tree() {
    return this.configureStructureForm.get('tree');
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
    return this.configureStructureForm.get('spatialRelation');
  }

  save() {
    this.saving = true;
    let structureSettings: AddStructureSettingsToMapRecordRequestDto =
      new AddStructureSettingsToMapRecordRequestDto();
    structureSettings.structureSettingsJson = this.formbackEdnObject();
    structureSettings.structureSettingsJson.relationShip =
      this.spatialRelation?.value;

    structureSettings.mapRecordId = this.mapRecord.id!;

    // return;
    this._mapRecordService
      .addStructureSettingsToMapRecord(structureSettings)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.saving = false;
          this.close();
          this._toastrService.success(
            'Structure settings has been added to map record Successfully',
            'Success'
          );
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
    structuralAttachementInput: StructureAttachmentSettingsInputDto,
    mapRecord: GetMapRecordDto
  ) {
    this.mapRecord = mapRecord;
    this.get(structuralAttachementInput);
  }

  close() {
    this.treeDataSource = [];
    this.dataArray = [];
    this.selectedAsset = [];
    this.networks = [];
    this.filteredAssetTables = [];
    this.resetCurrentForm();
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

    let structureSettings: StructureSettingsDto = new StructureSettingsDto();
    ClonedObject.forEach((element) => {
      let structureTarget: StructureTargetDto = new StructureTargetDto();
      structureTarget.assetTableName = element.parent?.parent?.label;
      structureTarget.assetGroupName = element.parent?.label;
      structureTarget.assetTypeName = element.label;
      structureTarget.key = element.key;
      structureSettings.structureTargets.push(structureTarget);
    });
    structureSettings.relationShip =
      this.configureStructureForm.controls['spatialRelation']?.value;
    console.log(structureSettings);
    return structureSettings;
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
