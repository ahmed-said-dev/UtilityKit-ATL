import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Field, Schema } from 'src/app/pages/models/data-source.model';
import { ProjectMappingService } from '../../../../../services/project-mapping.service';

@Component({
  selector: 'app-data-source-view-catalog',
  templateUrl: './data-source-view-catalog.component.html',
  styleUrls: ['./data-source-view-catalog.component.scss'],
})
export class DataSourceViewCatalogComponent implements OnInit {
  // @ViewChild('dataSourceViewCatalogComponent') dataSourceViewCatalogComponent: DataSourceViewCatalogComponent;
  dataSourceCatalog: Schema = new Schema();
  tree: TreeNode[] = [];
  selectedNodeFields: Field[] | undefined = [];
  selectedNode: any;
  isNodeSelected: boolean = false;
  isFeautreClass: boolean = false;
  public subscription: Subscription;
  constructor(
    private modal: NgbModal,
    private _projectMappingService: ProjectMappingService
  ) {}

  public ngOnInit(): void {
    this._projectMappingService.currentDataSourceViewCatalogMsg.subscribe(
      (result: Schema) => {
        this.dataSourceCatalog = result;
        this.tree = this.generateTreeStructure();
      }
    );
  }

  generateTreeStructure(): TreeNode[] {
    let tablesNode: any = {};
    tablesNode.label = 'Tables ' + `(${this.dataSourceCatalog.tables?.length})`;
    tablesNode.data = 'Tables Folder';
    tablesNode.expandedIcon = 'pi pi-folder-open';
    tablesNode.collapsedIcon = 'pi pi-folder';
    tablesNode.selectable = false;

    tablesNode.children = [];
    this.dataSourceCatalog.tables?.forEach((ds) => {
      let treeNodeTable: any = {};
      treeNodeTable.label = ds.name;
      treeNodeTable.type = 'table';
      treeNodeTable.key = ds.name;
      treeNodeTable.expandedIcon = 'pi pi-folder-open';
      treeNodeTable.collapsedIcon = 'pi pi-folder';
      treeNodeTable.selectable = true;
      tablesNode.children.push(treeNodeTable);
    });

    let featureClassNode: any = {};
    featureClassNode.label =
      'Feature Classes ' + `(${this.dataSourceCatalog.featureClasses?.length})`;
    featureClassNode.data = 'Feature Classes Folder';
    featureClassNode.expandedIcon = 'pi pi-folder-open';
    featureClassNode.collapsedIcon = 'pi pi-folder';
    featureClassNode.selectable = false;
    featureClassNode.children = [];
    this.dataSourceCatalog.featureClasses?.forEach((ds) => {
      let treeNodeFatureClass: any = {};
      treeNodeFatureClass.label = ds.name;
      treeNodeFatureClass.type = 'featureClass';
      treeNodeFatureClass.key = ds.name;

      treeNodeFatureClass.expandedIcon = 'pi pi-folder-open';
      treeNodeFatureClass.collapsedIcon = 'pi pi-folder';
      treeNodeFatureClass.selectable = true;
      featureClassNode.children.push(treeNodeFatureClass);
    });

    let tree: TreeNode[] = [];
    tree.push(tablesNode);
    tree.push(featureClassNode);
    return tree;
  }

  close() {
    this.tree = [];
    this.selectedNode = '';
    this.isNodeSelected = false;
    this.isFeautreClass = false;
    this.modal.dismissAll();
  }

  handleNodeSelect(event: any) {
    if (event.node.type == 'table') {
      this.isFeautreClass = false;
      this.selectedNodeFields = this.dataSourceCatalog.tables?.find(
        (t) => t.name.toLowerCase() == event.node.key.toLowerCase()
      )?.fields;
    } else {
      this.selectedNodeFields = this.dataSourceCatalog.featureClasses?.find(
        (t) => t.name.toLowerCase() == event.node.key.toLowerCase()
      )?.fields;
      this.isFeautreClass = true;
    }
    this.isNodeSelected = true;
    this.selectedNode = event.node.label;
  }
}
