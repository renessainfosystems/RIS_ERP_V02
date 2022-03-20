import { TestBed } from '@angular/core/testing';

import { LateEarlyPolicyService } from './late-early-policy.service';

describe('LateEarlyPolicyService', () => {
  let service: LateEarlyPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LateEarlyPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
