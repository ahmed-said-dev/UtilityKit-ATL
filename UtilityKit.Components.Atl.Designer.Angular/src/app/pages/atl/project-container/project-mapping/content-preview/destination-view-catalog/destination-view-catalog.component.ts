import { Component, OnInit } from '@angular/core';
import { ProjectMappingService } from 'src/app/pages/services/project-mapping.service';
import { AssetTable } from 'src/app/pages/models/atl-project-model';

@Component({
  selector: 'app-destination-view-catalog',
  templateUrl: './destination-view-catalog.component.html',
  styleUrls: ['./destination-view-catalog.component.scss'],
})
export class DestinationViewCatalogComponent implements OnInit {
  tabs = {
    ASSETS_TAB: 0,
    FIELDS_TAB: 1,
    ATTRIBUTES_ASSIGNMENT_TAB: 2,
  };

  destinationViewCatalog: AssetTable = new AssetTable();

  constructor(private _projectMappingService: ProjectMappingService) {}
  tabsNames = ['Assets', 'Fields', 'Attributes Assignment'];
  activeTabId = this.tabs.ASSETS_TAB;

  ngOnInit(): void {
    this._projectMappingService.currentDestinationViewCatalogMsg.subscribe(
      (result: AssetTable) => {
        this.destinationViewCatalog = result;
      }
    );
  }

  changeTab(tabId: number) {
    this.activeTabId = tabId;
  }
}
