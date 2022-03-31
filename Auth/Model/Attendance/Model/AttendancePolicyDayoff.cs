using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class AttendancePolicyDayoff
    {
        public int attendance_policy_dayoff_id { get; set; }
        public int attendance_policy_id { get; set; }
        public string week_day { get; set; }
        public byte dayoff_type_id { get; set; }
        public byte dayoff_alternative_id { get; set; }
    }
}
