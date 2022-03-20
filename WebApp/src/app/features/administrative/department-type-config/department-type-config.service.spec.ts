import { TestBed } from '@angular/core/testing';
import { DepartmentTypeConfigService } from './department-type-config.service';


describe('DepartmentTypeConfigService', () => {
  let service: DepartmentTypeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentTypeConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
