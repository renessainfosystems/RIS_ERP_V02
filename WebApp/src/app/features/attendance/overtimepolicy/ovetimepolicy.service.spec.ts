import { TestBed } from '@angular/core/testing';

import { OvetimepolicyService } from './ovetimepolicy.service';

describe('OvetimepolicyService', () => {
  let service: OvetimepolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OvetimepolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
