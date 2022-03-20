import { TestBed } from '@angular/core/testing';
import { EcommercePlatformService } from './ecommerce-platform.service';


describe('EcommercePlatformService', () => {
  let service: EcommercePlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommercePlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

