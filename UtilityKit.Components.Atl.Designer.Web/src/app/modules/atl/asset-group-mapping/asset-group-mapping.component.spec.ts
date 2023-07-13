import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetGroupMappingComponent } from './asset-group-mapping.component';

describe('AssetGroupMappingComponent', () => {
  let component: AssetGroupMappingComponent;
  let fixture: ComponentFixture<AssetGroupMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetGroupMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetGroupMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
