import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRecordEmptyComponent } from './map-record-empty.component';

describe('MapRecordEmptyComponent', () => {
  let component: MapRecordEmptyComponent;
  let fixture: ComponentFixture<MapRecordEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapRecordEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapRecordEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
