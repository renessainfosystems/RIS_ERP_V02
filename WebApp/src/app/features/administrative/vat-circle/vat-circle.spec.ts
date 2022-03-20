import { TestBed } from '@angular/core/testing';
import { VatCircleService } from './vat-circle.service';


describe('VatCircleService', () => {
  let service: VatCircleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatCircleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
