using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class AttendancePolicyBenefit
    {
        public int attendance_policy_benefit_id { get; set; }
        public int attendance_policy_id { get; set; }
        public int abp_id { get; set; }
    }
}
