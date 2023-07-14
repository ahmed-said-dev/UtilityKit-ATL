import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementFilterComponent } from './replacement-filter.component';

describe('ReplacementFilterComponent', () => {
  let component: ReplacementFilterComponent;
  let fixture: ComponentFixture<ReplacementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplacementFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplacementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
