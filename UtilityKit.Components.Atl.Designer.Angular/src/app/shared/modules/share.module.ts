import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2/lib_commonjs/inline-svg.module';
import { CreateBlankComponent } from 'src/app/pages/atl/project-container/context/create-blank/create-blank.component';
import { UploadComponent } from '../components/upload/upload.component';
import { TruncatePipe } from '../pipes/TruncatePipe';

@NgModule({
  imports: [
    InlineSVGModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [TruncatePipe, CreateBlankComponent, UploadComponent],
  exports: [TruncatePipe, CreateBlankComponent, UploadComponent],
})
export class SharingModule {}
