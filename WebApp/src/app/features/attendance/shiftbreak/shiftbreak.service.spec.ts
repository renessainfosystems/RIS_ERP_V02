import { TestBed } from '@angular/core/testing';

import { ShiftbreakService } from './shiftbreak.service';

describe('ShiftbreakService', () => {
  let service: ShiftbreakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftbreakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
