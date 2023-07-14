import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleDataSourceComponent } from './oracle-data-source.component';

describe('OracleDataSourceComponent', () => {
  let component: OracleDataSourceComponent;
  let fixture: ComponentFixture<OracleDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OracleDataSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OracleDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
