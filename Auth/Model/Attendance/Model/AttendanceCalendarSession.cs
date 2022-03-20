using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class AttendanceCalendarSession
    {
        public AttendanceCalendarSession()
        {

            acs_id = 0;
            attendance_calendar_id = 0;
            session_name = "";
            is_active = true;
            //session_start_date = DateTime.Now;
           // session_end_date = DateTime.Now;

        }
        public int acs_id { get; set; }
        public int attendance_calendar_id { get; set; }
        public string session_name { get; set; }
        public string session_start_date { get; set; }
        public string session_end_date { get; set; }
        public bool is_active { get; set; }
        public List<AttendanceCalendarSessionHoliday> attendanceCalendarSessions_holiday { get; set; }
    }
    public class AttendanceCalendarSessionHoliday
    {
        public AttendanceCalendarSessionHoliday()
        {

            acs_id = 0;
            holiday_id = 0;
            acs_holiday_id = 0;
            is_active = true;
           // session_start_date = DateTime.Now;
          //  session_end_date = DateTime.Now;

        }
        public int acs_holiday_id { get; set; }
        public int acs_id { get; set; }
        public int holiday_id { get; set; }
        public string session_start_date { get; set; }
        public string session_end_date { get; set; }
        public bool is_active { get; set; }
    }
}
