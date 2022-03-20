import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateEarlyPolicyComponent } from './late-early-policy.component';

describe('LateEarlyPolicyComponent', () => {
  let component: LateEarlyPolicyComponent;
  let fixture: ComponentFixture<LateEarlyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateEarlyPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateEarlyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
