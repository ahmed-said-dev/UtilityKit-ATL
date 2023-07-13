import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapefileDataSourceComponent } from './shapefile-data-source.component';

describe('ShapefileDataSourceComponent', () => {
  let component: ShapefileDataSourceComponent;
  let fixture: ComponentFixture<ShapefileDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapefileDataSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapefileDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
