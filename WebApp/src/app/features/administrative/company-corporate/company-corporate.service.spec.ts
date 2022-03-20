import { TestBed } from '@angular/core/testing';
import { CompanyCorporateService } from './company-corporate.service';

describe('CompanyCorporateService', () => {
  let service: CompanyCorporateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyCorporateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
