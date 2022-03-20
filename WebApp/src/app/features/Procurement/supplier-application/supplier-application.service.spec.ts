import { TestBed } from '@angular/core/testing';
import { SupplierApplicationService } from './supplier-application.service';



describe('SupplierApplicationService', () => {
  let service: SupplierApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
