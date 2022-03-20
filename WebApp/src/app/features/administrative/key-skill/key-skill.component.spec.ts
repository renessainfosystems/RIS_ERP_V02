import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySkillComponent } from './key-skill.component';

describe('KeySkillComponent', () => {
  let component: KeySkillComponent;
  let fixture: ComponentFixture<KeySkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeySkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
