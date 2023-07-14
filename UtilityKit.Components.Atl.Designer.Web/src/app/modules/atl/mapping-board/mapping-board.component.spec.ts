import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingBoardComponent } from './mapping-board.component';

describe('MappingBoardComponent', () => {
  let component: MappingBoardComponent;
  let fixture: ComponentFixture<MappingBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MappingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
