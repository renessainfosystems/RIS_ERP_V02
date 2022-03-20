import { TestBed } from '@angular/core/testing';

import { ShiftinformationService } from './shiftinformation.service';

describe('ShiftinformationService', () => {
  let service: ShiftinformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftinformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
