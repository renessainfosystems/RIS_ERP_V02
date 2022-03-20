import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancebenefitpolicyComponent } from './attendancebenefitpolicy.component';

describe('AttendancebenefitpolicyComponent', () => {
  let component: AttendancebenefitpolicyComponent;
  let fixture: ComponentFixture<AttendancebenefitpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendancebenefitpolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancebenefitpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
