using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class BreakDuration
    {
        public int shift_break_duration_id { get; set; }
        public int shift_id { get; set; }
        public int shift_break_head_id { get; set; }
        public TimeSpan break_start { get; set; }
        public TimeSpan break_end { get; set; }
    }
}
