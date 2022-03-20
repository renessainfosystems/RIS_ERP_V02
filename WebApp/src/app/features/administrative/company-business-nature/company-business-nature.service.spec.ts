import { TestBed } from '@angular/core/testing';
import { CompanyBusinessNatureService } from './company-business-nature.service';


describe('CompanyBusinessNatureService', () => {
  let service:CompanyBusinessNatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyBusinessNatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
