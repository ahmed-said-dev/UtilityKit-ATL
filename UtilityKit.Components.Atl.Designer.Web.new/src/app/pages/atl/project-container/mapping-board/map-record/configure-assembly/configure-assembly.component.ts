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
} from 'src/app/pages/models/atl-project-model';
import { AtlProjectService } from 'src/app/pages/services/atl-project.service';
import {
  AddAssemblySettingsToMapRecordRequestDto,
  AssemblySettingsDto,
  AssemblyTargetDto,
  GetAssemblySettingsMapRecordForEditResponce,
  GetMapRecordDto,
  SpatialRelationShip,
} from 'src/app/pages/models/map-record.model';
import { MapRecordService } from 'src/app/pages/services/map-record.service';

import { ConfigureAssemblyForm } from './configure-assembly.form';
import { TreeNodeClass } from 'src/app/shared/helpers/tree.helper';
const Empty_Configure_Assembly_Configuration: AddAssemblySettingsToMapRecordRequestDto =
  {
    mapRecordId: '',
    assemblySettingsJson: new AssemblySettingsDto(),
  };
@Component({
  selector: 'app-configure-assembly',
  templateUrl: './configure-assembly.component.html',
  styleUrls: ['./configure-assembly.component.scss'],
})
export class ConfigureAssemblyComponent implements OnInit {
  @ViewChild('configureAssemblyTemplate')
  configureAssemblyTemplate: ConfigureAssemblyComponent;
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
  configureAssemblyForm: ConfigureAssemblyForm;
  addAssemblySettings: AddAssemblySettingsToMapRecordRequestDto =
    new AddAssemblySettingsToMapRecordRequestDto();
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
    this.configureAssemblyForm = new ConfigureAssemblyForm(
      this.addAssemblySettings
    );
  }

  private resetCurrentForm() {
    this.configureAssemblyForm.reset();
  }

  get(undProjectId: string) {
    this._spinnerService.show();
    let undObservable = this._aTLProjectService.getUndDetailsForContainment(
      new ContainmentSettingsInputDto()
    );

    let assemblySettingsMapRecord =
      this._mapRecordService.getAssemblySettingsForEditQuery(this.mapRecord.id);

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

          return assemblySettingsMapRecord;
        })
      )
      .subscribe((result: GetAssemblySettingsMapRecordForEditResponce) => {
        let assemblySettings =
          result.getAssemblySettingsForEdit.assemblySettingsJson;
        if (assemblySettings) {
          this.dataArray = assemblySettings.assemblyTargets.map(
            (ct) => ct.key!
          );
          this.spatialRelation?.setValue(assemblySettings.relationShip);
        }

        this.checkNode(this.treeDataSource, this.dataArray);
        this.checkTreeValidation();
        this.cdr.detectChanges();

        this._spinnerService.hide();
        this.modal.open(this.configureAssemblyTemplate);
      });
  }

  get tree() {
    return this.configureAssemblyForm.get('tree');
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
    return this.configureAssemblyForm.get('spatialRelation');
  }

  save() {
    this.saving = true;
    let assemblySettings: AddAssemblySettingsToMapRecordRequestDto =
      new AddAssemblySettingsToMapRecordRequestDto();
    assemblySettings.assemblySettingsJson = this.formbackEdnObject();
    assemblySettings.assemblySettingsJson.relationShip =
      this.spatialRelation?.value;

    assemblySettings.mapRecordId = this.mapRecord.id!;

    // return;
    this._mapRecordService
      .addAssemblySettingsToMapRecord(assemblySettings)
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
            'Assembly settings has been added to map record Successfully',
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

  show(uNDProjectId: string, mapRecord: GetMapRecordDto) {
    this.mapRecord = mapRecord;
    this.get(uNDProjectId);
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

    let assemblySettings: AssemblySettingsDto = new AssemblySettingsDto();
    ClonedObject.forEach((element) => {
      let assemblyTarget: AssemblyTargetDto = new AssemblyTargetDto();
      assemblyTarget.assetTableName = element.parent?.parent?.label;
      assemblyTarget.assetGroupName = element.parent?.label;
      assemblyTarget.assetTypeName = element.label;
      assemblyTarget.key = element.key;
      assemblySettings.assemblyTargets.push(assemblyTarget);
    });
    assemblySettings.relationShip =
      this.configureAssemblyForm.controls['spatialRelation']?.value;
    console.log(assemblySettings);
    return assemblySettings;
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
