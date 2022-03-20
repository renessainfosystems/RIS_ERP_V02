import { TestBed } from '@angular/core/testing';

import { LeaveheadService } from './leavehead.service';

describe('LeaveheadService', () => {
  let service: LeaveheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
