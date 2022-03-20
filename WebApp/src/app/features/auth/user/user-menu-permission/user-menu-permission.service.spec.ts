import { TestBed } from '@angular/core/testing';
import { UsermenupermissionService } from './user-menu-permission.service';


describe('UsermenupermissionService', () => {
  let service: UsermenupermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsermenupermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
