using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class AttendancePolicyShift
    {
        public int attendance_policy_shift_id { get; set; }
        public int attendance_policy_id { get; set; }
        public int shift_id { get; set; }
       public string shift_name { get; set; }

    }
}
