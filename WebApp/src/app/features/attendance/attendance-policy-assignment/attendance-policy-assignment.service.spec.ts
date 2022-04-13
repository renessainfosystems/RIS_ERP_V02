import { TestBed } from '@angular/core/testing';

import { AttendancePolicyAssignmentService } from './attendance-policy-assignment.service';

describe('AttendancePolicyAssignmentService', () => {
  let service: AttendancePolicyAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendancePolicyAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
