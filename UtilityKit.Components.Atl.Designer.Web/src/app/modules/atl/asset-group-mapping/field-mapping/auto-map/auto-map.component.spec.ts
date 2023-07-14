import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoMapComponent } from './auto-map.component';

describe('AutoMapComponent', () => {
  let component: AutoMapComponent;
  let fixture: ComponentFixture<AutoMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
