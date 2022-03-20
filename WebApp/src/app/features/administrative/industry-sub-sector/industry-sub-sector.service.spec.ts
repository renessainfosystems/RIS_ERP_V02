import { TestBed } from '@angular/core/testing';
import { IndustrySubSectorService } from './industry-sub-sector.service';


describe('IndustrySubSectorService', () => {
  let service: IndustrySubSectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustrySubSectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
