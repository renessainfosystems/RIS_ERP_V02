using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class AttendanceCalendar
    {
        public int attendance_calendar_id { get; set; }
        public string attendance_calendar_name { get; set; }
        public string remarks { get; set; }
        public bool is_active { get; set; }

    }
}
