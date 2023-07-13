import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationViewCatalogComponent } from './destination-view-catalog.component';

describe('DestinationViewCatalogComponent', () => {
  let component: DestinationViewCatalogComponent;
  let fixture: ComponentFixture<DestinationViewCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationViewCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationViewCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
