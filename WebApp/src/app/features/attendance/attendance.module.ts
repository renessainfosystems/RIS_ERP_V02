
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AttendanceRoutes } from './attendance.routing';
import { HolidayComponent } from './holiday/holiday.component';

import { AttendanceCalendarComponent } from './attendance-calendar/attendance-calendar.component';
import { ShiftbreakComponent } from './shiftbreak/shiftbreak.component';
import { OvertimepolicyComponent } from './overtimepolicy/overtimepolicy.component';
import { LeaveheadComponent } from './leavehead/leavehead.component';
import { ShiftinformationComponent } from './shiftinformation/shiftinformation.component';
import { AttendancebenefitpolicyComponent } from './attendancebenefitpolicy/attendancebenefitpolicy.component';
import { AbsenteeismPolicyComponent } from './absenteeism-policy/absenteeism-policy.component';
import { LateEarlyPolicyComponent } from './late-early-policy/late-early-policy.component';
import { PrimeNGModule } from '../../root/primengreference.module';
import { LeavePolicyComponent } from './leave-policy/leave-policy.component';
import { RosterPolicyComponent } from './roster-policy/roster-policy.component';
import { AttendancePolicyComponent } from './attendance-policy/attendance-policy.component';
import { AttendancePolicyAssignmentComponent } from './attendance-policy-assignment/attendance-policy-assignment.component';




@NgModule({
  declarations: [
    HolidayComponent,
    AttendanceCalendarComponent,
    ShiftbreakComponent,
    OvertimepolicyComponent,
    LeaveheadComponent,
    ShiftinformationComponent,
    AttendancebenefitpolicyComponent,
    AbsenteeismPolicyComponent,
    LateEarlyPolicyComponent,
    LeavePolicyComponent,
    RosterPolicyComponent,
    AttendancePolicyComponent,
    AttendancePolicyAssignmentComponent,
    
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    RouterModule.forChild(AttendanceRoutes),
  ]
})
export class AttendanceModule { }
