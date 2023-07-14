import { TestBed } from '@angular/core/testing';

import { AtlProjectService } from '../atl-project.service';

describe('AtlProjectService', () => {
  let service: AtlProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
