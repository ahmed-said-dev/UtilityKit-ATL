import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlDataSourceComponent } from './sql-data-source.component';

describe('SqlDataSourceComponent', () => {
  let component: SqlDataSourceComponent;
  let fixture: ComponentFixture<SqlDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlDataSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
