import { TestBed } from '@angular/core/testing';
import { RegistryAuthorityService } from './registry-authority.service';


describe('RegistryAuthorityService', () => {
  let service: RegistryAuthorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistryAuthorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
