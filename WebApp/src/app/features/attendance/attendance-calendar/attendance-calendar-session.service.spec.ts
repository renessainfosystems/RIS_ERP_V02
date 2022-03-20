import { TestBed } from '@angular/core/testing';

import { AttendanceCalendarSessionService } from './attendance-calendar-session.service';

describe('AttendanceCalendarSessionService', () => {
  let service: AttendanceCalendarSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceCalendarSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
