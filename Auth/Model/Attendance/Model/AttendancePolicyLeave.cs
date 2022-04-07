using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class AttendancePolicyLeave
    {
        public int attendance_policy_leave_id { get; set; }
        public int attendance_policy_id { get; set; }
        public int leave_policy_id { get; set; }
        public string leave_policy_name { get; set; }
        public string leave_head_short_name { get; set; }
        public decimal default_leave_balance_day { get; set; }
        public string activationdays { get; set; }
    }
}
