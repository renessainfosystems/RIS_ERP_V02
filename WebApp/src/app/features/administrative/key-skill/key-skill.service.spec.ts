import { TestBed } from '@angular/core/testing';
import { KeySkillService } from './key-skill.service';


describe('KeySkillService', () => {
  let service: KeySkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeySkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
