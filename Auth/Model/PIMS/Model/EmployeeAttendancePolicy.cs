using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Auth.Model.PIMS.Model
{
    public class EmployeeAttendancePolicy
    {
        public EmployeeAttendancePolicy()
        {
            employee_id = 0;
            attendance_policy_id = 0;
            attendance_calendar_id = 0;
            late_early_policy_id = 0;
            absenteeism_policy_id = 0;
            roster_policy_id = 0;
            shift_id = 0;
            is_random_dayoff = false;
            no_of_random_dayoff = 0;
            is_allow_benefit_policy = false;
        }

        public long? employee_id { get; set; }
        public int? attendance_policy_id { get; set; }
        public int? attendance_calendar_id { get; set; }
        public int? late_early_policy_id { get; set; }
        public int? absenteeism_policy_id { get; set; }
        public int? roster_policy_id { get; set; }
        public int? shift_id { get; set; }
        public bool? is_random_dayoff { get; set; }
        public int? no_of_random_dayoff { get; set; }
        public bool? is_allow_benefit_policy { get; set; }
    }
}
