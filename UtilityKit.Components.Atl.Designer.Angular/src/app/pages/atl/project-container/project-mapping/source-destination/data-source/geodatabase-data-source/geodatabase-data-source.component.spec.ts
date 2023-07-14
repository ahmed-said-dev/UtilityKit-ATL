import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeodatabaseDataSourceComponent } from './geodatabase-data-source.component';

describe('GeodatabaseDataSourceComponent', () => {
  let component: GeodatabaseDataSourceComponent;
  let fixture: ComponentFixture<GeodatabaseDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeodatabaseDataSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeodatabaseDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
