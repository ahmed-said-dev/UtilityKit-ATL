import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMappingRecordComponent } from './manage-mapping-record.component';

describe('ManageMappingRecordComponent', () => {
  let component: ManageMappingRecordComponent;
  let fixture: ComponentFixture<ManageMappingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMappingRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMappingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
