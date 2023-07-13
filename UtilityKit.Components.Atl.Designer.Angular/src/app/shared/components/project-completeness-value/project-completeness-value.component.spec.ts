import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompletenessValueComponent } from './project-completeness-value.component';

describe('ProjectCompletenessValueComponent', () => {
  let component: ProjectCompletenessValueComponent;
  let fixture: ComponentFixture<ProjectCompletenessValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCompletenessValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCompletenessValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
