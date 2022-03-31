import { TestBed } from '@angular/core/testing';

import { AttendancePolicyService } from './attendance-policy.service';

describe('AttendancePolicyService', () => {
  let service: AttendancePolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendancePolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
