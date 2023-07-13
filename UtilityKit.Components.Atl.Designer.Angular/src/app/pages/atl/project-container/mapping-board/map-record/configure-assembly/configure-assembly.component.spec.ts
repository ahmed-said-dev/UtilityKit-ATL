import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureAssemblyComponent } from './configure-assembly.component';

describe('ConfigureAssemblyComponent', () => {
  let component: ConfigureAssemblyComponent;
  let fixture: ComponentFixture<ConfigureAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureAssemblyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
