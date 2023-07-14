import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRecordComponent } from './map-record.component';

describe('MapRecordComponent', () => {
  let component: MapRecordComponent;
  let fixture: ComponentFixture<MapRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
