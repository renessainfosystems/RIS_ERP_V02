import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePolicyAssignmentComponent } from './attendance-policy-assignment.component';

describe('AttendancePolicyAssignmentComponent', () => {
  let component: AttendancePolicyAssignmentComponent;
  let fixture: ComponentFixture<AttendancePolicyAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendancePolicyAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancePolicyAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
