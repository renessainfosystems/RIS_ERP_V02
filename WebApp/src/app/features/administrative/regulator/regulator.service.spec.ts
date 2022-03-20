import { TestBed } from '@angular/core/testing';
import { RegulatorService } from './regulator.service';


describe('RegulatorService', () => {
  let service: RegulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
