import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureThreeDComponent } from './configure-three-d.component';

describe('ConfigureThreeDComponent', () => {
  let component: ConfigureThreeDComponent;
  let fixture: ComponentFixture<ConfigureThreeDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureThreeDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureThreeDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
