import { TestBed } from '@angular/core/testing';
import { IndustrySectorService } from './industry-sector.service';


describe('IndustrySectorService', () => {
  let service: IndustrySectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustrySectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
