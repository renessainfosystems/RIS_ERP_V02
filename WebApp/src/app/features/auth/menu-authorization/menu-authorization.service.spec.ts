import { TestBed } from '@angular/core/testing';

import { MenuAuthorizationService } from './menu-authorization.service';

describe('MenuAuthorizationService', () => {
  let service: MenuAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
