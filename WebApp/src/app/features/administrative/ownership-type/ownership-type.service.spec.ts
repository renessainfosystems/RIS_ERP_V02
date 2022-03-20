import { TestBed } from '@angular/core/testing';
import { OwnershipTypeService } from './ownership-type.service';


describe('OwnershipTypeService', () => {
  let service: OwnershipTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnershipTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
