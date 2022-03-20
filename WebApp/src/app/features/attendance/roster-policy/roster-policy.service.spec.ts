import { TestBed } from '@angular/core/testing';

import { RosterPolicyService } from './roster-policy.service';

describe('RosterPolicyService', () => {
  let service: RosterPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RosterPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
