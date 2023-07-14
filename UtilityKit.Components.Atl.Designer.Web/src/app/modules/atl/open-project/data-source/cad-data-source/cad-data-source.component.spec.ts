import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadDataSourceComponent } from './cad-data-source.component';

describe('CadDataSourceComponent', () => {
  let component: CadDataSourceComponent;
  let fixture: ComponentFixture<CadDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadDataSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
