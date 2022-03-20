using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class ShiftBreakDuration
    {
		public ShiftBreakDuration()
		{
			shift_break_duration_id = 0;
			shift_id = 0;
			is_allow_start_end = false;
			break_start = "00:00";
			break_end = "00:00";
			break_duration_min = 0;
			shift_break_head_id = 0;

		}
		public int shift_break_duration_id { get; set; }
		public int shift_break_head_id { get; set; }
		public int shift_id { get; set; }
		public bool is_allow_start_end { get; set; }
		public string break_start { get; set; }
		public string break_end { get; set; }
		public int break_duration_min { get; set; }
	}
}
