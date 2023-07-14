import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureStructureComponent } from './configure-structure.component';

describe('ConfigureStructureComponent', () => {
  let component: ConfigureStructureComponent;
  let fixture: ComponentFixture<ConfigureStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
