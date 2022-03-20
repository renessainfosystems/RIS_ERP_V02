import { TestBed } from '@angular/core/testing';

import { AttendancebenefitpolicyService } from './attendancebenefitpolicy.service';

describe('AttendancebenefitpolicyService', () => {
  let service: AttendancebenefitpolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendancebenefitpolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
