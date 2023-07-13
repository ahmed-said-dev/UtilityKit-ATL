import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaDataSourceComponent } from './schema-data-source.component';

describe('SchemaDataSourceComponent', () => {
  let component: SchemaDataSourceComponent;
  let fixture: ComponentFixture<SchemaDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaDataSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemaDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
