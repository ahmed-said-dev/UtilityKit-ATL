import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToUndComponent } from './connect-to-und.component';

describe('ConnectToUndComponent', () => {
  let component: ConnectToUndComponent;
  let fixture: ComponentFixture<ConnectToUndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectToUndComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectToUndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
