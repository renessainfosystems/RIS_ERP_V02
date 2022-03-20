import { TestBed } from '@angular/core/testing';

import { AbsenteeismPolicyService } from './absenteeism-policy.service';

describe('AbsenteeismPolicyService', () => {
  let service: AbsenteeismPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenteeismPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
