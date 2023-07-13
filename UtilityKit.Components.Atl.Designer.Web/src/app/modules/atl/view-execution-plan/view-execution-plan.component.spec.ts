import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExecutionPlanComponent } from './view-execution-plan.component';

describe('ViewExecutionPlanComponent', () => {
  let component: ViewExecutionPlanComponent;
  let fixture: ComponentFixture<ViewExecutionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExecutionPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExecutionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
