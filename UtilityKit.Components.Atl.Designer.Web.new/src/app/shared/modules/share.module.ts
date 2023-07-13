import { NgModule, ModuleWithProviders } from '@angular/core';
import { TruncatePipe } from '../pipes/TruncatePipe';

@NgModule({
  imports: [],
  declarations: [TruncatePipe],
  exports: [TruncatePipe],
})
export class SharingModule {
  static forRoot(): ModuleWithProviders<SharingModule> {
    return {
      ngModule: SharingModule,
    };
  }
}
