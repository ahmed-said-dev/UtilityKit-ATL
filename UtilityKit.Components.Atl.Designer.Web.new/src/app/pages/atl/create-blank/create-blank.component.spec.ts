import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlankComponent } from './create-blank.component';

describe('CreateBlankComponent', () => {
  let component: CreateBlankComponent;
  let fixture: ComponentFixture<CreateBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBlankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
