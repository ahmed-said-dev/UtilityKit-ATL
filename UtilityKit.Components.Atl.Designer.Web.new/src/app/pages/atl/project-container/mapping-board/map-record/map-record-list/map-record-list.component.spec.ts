import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRecordListComponent } from './map-record-list.component';

describe('MapRecordListComponent', () => {
  let component: MapRecordListComponent;
  let fixture: ComponentFixture<MapRecordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapRecordListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
