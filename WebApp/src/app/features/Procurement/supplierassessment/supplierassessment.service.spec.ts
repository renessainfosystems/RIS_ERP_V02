import { TestBed } from '@angular/core/testing';
import { SupplierAssessmentService } from './supplierassessment.service';


describe('SupplierAssessmentService', () => {
    let service: SupplierAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
      service = TestBed.inject(SupplierAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
