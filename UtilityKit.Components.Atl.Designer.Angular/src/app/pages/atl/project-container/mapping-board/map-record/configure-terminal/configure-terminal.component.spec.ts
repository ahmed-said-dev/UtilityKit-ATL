import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTerminalComponent } from './configure-terminal.component';

describe('ConfigureTerminalComponent', () => {
  let component: ConfigureTerminalComponent;
  let fixture: ComponentFixture<ConfigureTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureTerminalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
