import { Routes } from '@angular/router';
import { AbsenteeismPolicyComponent } from './absenteeism-policy/absenteeism-policy.component';
import { AttendanceCalendarComponent } from './attendance-calendar/attendance-calendar.component';
import { AttendancePolicyAssignmentComponent } from './attendance-policy-assignment/attendance-policy-assignment.component';
import { AttendancePolicyComponent } from './attendance-policy/attendance-policy.component';
import { AttendancebenefitpolicyComponent } from './attendancebenefitpolicy/attendancebenefitpolicy.component';
import { HolidayComponent } from './holiday/holiday.component';
import { LateEarlyPolicyComponent } from './late-early-policy/late-early-policy.component';
import { LeavePolicyComponent } from './leave-policy/leave-policy.component';
import { LeaveheadComponent } from './leavehead/leavehead.component';
import { OvertimepolicyComponent } from './overtimepolicy/overtimepolicy.component';
import { RosterPolicyComponent } from './roster-policy/roster-policy.component';
import { ShiftbreakComponent } from './shiftbreak/shiftbreak.component';
import { ShiftinformationComponent } from './shiftinformation/shiftinformation.component';

export const AttendanceRoutes: Routes = [

  {
    path: 'holidaysetup',
    component: HolidayComponent
  },
  {
    path: 'attendance-calendar',
    component: AttendanceCalendarComponent
  },
  {
    path: 'shift-break',
    component: ShiftbreakComponent
  },
  {
    path: 'overtime-policy',
    component: OvertimepolicyComponent
  },
  {
    path: 'leave-head',
    component: LeaveheadComponent
  },
  {
    path: 'shift-info',
    component: ShiftinformationComponent
  },
  {
    path: 'att-benefitpolicy',
    component: AttendancebenefitpolicyComponent
  },
  {
    path: 'absenteeism-policy',
    component: AbsenteeismPolicyComponent
  },
  {
    path: 'late-early-policy',
    component: LateEarlyPolicyComponent
    },
    {
        path: 'roster-policy',
        component: RosterPolicyComponent
    },
    {
        path: 'leave-policy',
        component: LeavePolicyComponent
    },
    {
        path: 'attendance-policy',
        component: AttendancePolicyComponent
    },
    {
        path: 'attendance-policy-assignment',
        component: AttendancePolicyAssignmentComponent
    }

];
