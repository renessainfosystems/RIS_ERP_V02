import { TestBed } from '@angular/core/testing';
import { MfsService } from './mfs.service';


describe('MfsService', () => {
  let service: MfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
