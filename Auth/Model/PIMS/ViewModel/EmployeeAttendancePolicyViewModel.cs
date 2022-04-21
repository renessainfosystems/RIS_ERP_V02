using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using static Auth.Utility.PIMS.Enum.GlobalEnumList;

namespace Auth.Model.PIMS.ViewModel
{
    public class EmployeeAttendancePolicyViewModel
    {        
        public EmployeeAttendancePolicyViewModel()
        {
            //Constractor            
        }
        public int? EmployeeId { get; set; }
        public int? AttendancePolicyId { get; set; }
        public int? AttendanceCalendarId { get; set; }
        public int? LateEarlyPolicyId { get; set; }
        public int? AbsenteeismPolicyId { get; set; }
        public int? RosterPolicyId { get; set; }
        public int? ShiftId { get; set; }
        public bool? IsRandomDayoff { get; set; }
        public int? NoOfRandomDayoff { get; set; }
        public bool? IsPersonalized { get; set; }
        public string AttendanceCalendarName { get; set; }
        public string LateEarlyPolicyName { get; set; }
        public string AbsenteeismPolicy_name { get; set; }
        public string RosterPolicyName { get; set; }
        public string ShiftName { get; set; }

        public List<EmployeeDayoffViewModel> EmployeeDayoffViews { get; set; }
        public List<EmployeeBenefitPolicyViewModel> EmployeeBenefitPolicyViews { get; set; }
        public List<EmployeeLeaveLedgerViewModel> EmployeeLeaveLedgerViews { get; set; }


        public static EmployeeAttendancePolicyViewModel ConvertToModel(dynamic oEmployeeAttendancePolicy)
        {
            var oModel = new EmployeeAttendancePolicyViewModel();
            oModel.EmployeeId = oEmployeeAttendancePolicy.employee_id ?? 0;
            oModel.AttendancePolicyId = oEmployeeAttendancePolicy.attendance_policy_id ?? 0;
            oModel.AttendanceCalendarId = oEmployeeAttendancePolicy.attendance_calendar_id ?? 0;
            oModel.LateEarlyPolicyId = oEmployeeAttendancePolicy.late_early_policy_id ?? 0;
            oModel.AbsenteeismPolicyId = oEmployeeAttendancePolicy.absenteeism_policy_id ?? 0;
            oModel.RosterPolicyId = oEmployeeAttendancePolicy.roster_policy_id ?? 0;
            oModel.ShiftId = oEmployeeAttendancePolicy.shift_id ?? 0;
            oModel.IsRandomDayoff = oEmployeeAttendancePolicy.is_random_dayoff ?? false;
            oModel.NoOfRandomDayoff = oEmployeeAttendancePolicy.no_of_random_dayoff ?? 0;            
            oModel.IsPersonalized = oEmployeeAttendancePolicy.is_personalized ?? false;
            oModel.AttendanceCalendarName = oEmployeeAttendancePolicy.attendance_calendar_name ?? "";
            oModel.LateEarlyPolicyName = oEmployeeAttendancePolicy.late_early_policy_name ?? "";
            oModel.AbsenteeismPolicy_name = oEmployeeAttendancePolicy.absenteeism_policy_name ?? "";
            oModel.RosterPolicyName = oEmployeeAttendancePolicy.roster_policy_name ?? "";
            oModel.ShiftName = oEmployeeAttendancePolicy.shift_name ?? "";
            return oModel;
        }

    }
}
