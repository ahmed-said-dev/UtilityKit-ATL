import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentPreviewComponent } from './content-preview.component';
import { DataSourceViewCatalogComponent } from './data-source-view-catalog/data-source-view-catalog.component';
import { DestinationViewCatalogComponent } from './destination-view-catalog/destination-view-catalog.component';
import { EmptyViewCatalogComponent } from './empty-view-catalog/empty-view-catalog.component';

const routes: Routes = [
  {
    path: '',
    component: ContentPreviewComponent,
    children: [
      {
        path: '',
        component: EmptyViewCatalogComponent,
      },
      {
        path: 'destination-view-catalog',
        component: DestinationViewCatalogComponent,
      },
      {
        path: 'data-source-view-catalog',
        component: DataSourceViewCatalogComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPreviewRoutingModule {}
