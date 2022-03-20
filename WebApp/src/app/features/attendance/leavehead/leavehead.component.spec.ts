import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveheadComponent } from './leavehead.component';

describe('LeaveheadComponent', () => {
  let component: LeaveheadComponent;
  let fixture: ComponentFixture<LeaveheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
