import { TestBed } from '@angular/core/testing';

import { SalaryHeadService } from './salary-head.service';

describe('SalaryHeadService', () => {
  let service: SalaryHeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryHeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
