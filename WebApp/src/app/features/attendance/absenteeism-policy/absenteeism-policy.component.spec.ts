import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenteeismPolicyComponent } from './absenteeism-policy.component';

describe('AbsenteeismPolicyComponent', () => {
  let component: AbsenteeismPolicyComponent;
  let fixture: ComponentFixture<AbsenteeismPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenteeismPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenteeismPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
