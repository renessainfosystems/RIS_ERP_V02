import { TestBed } from '@angular/core/testing';
import { VatCommissionerateService } from './vat-commissionerate.service';


describe('VatCommissionerateService', () => {
  let service: VatCommissionerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatCommissionerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
