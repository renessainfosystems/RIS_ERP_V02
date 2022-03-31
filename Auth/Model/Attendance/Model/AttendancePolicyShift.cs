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

        public static implicit operator List<object>(AttendancePolicyShift v)
        {
            throw new NotImplementedException();
        }
    }
}
