import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureContainmentComponent } from './configure-containment.component';

describe('ConfigureContainmentComponent', () => {
  let component: ConfigureContainmentComponent;
  let fixture: ComponentFixture<ConfigureContainmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureContainmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureContainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
