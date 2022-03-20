import { TestBed } from '@angular/core/testing';
import { VatDivisionService } from './vat-division.service';


describe('VatDivisionService', () => {
  let service: VatDivisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatDivisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
