import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceViewCatalogComponent } from './data-source-view-catalog.component';

describe('DataSourceViewCatalogComponent', () => {
  let component: DataSourceViewCatalogComponent;
  let fixture: ComponentFixture<DataSourceViewCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSourceViewCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSourceViewCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
