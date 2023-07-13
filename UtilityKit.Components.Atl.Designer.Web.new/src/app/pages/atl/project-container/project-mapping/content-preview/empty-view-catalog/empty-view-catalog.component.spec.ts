import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyViewCatalogComponent } from './empty-view-catalog.component';

describe('EmptyViewCatalogComponent', () => {
  let component: EmptyViewCatalogComponent;
  let fixture: ComponentFixture<EmptyViewCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyViewCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyViewCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
