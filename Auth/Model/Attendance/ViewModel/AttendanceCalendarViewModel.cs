using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.ViewModel
{
    public class AttendanceCalendarViewModel
    {
        public int AttendanceCalendarId { get; set; }
        public string AttendanceCalendarName { get; set; }
        public string Remarks { get; set; }
        public bool IsActive { get; set; }
        public static AttendanceCalendarViewModel ConvertToModel(dynamic attCalendar)
        {

            var model = new AttendanceCalendarViewModel();
            model.AttendanceCalendarId = attCalendar.attendance_calendar_id;
            model.AttendanceCalendarName = attCalendar.attendance_calendar_name ?? "";
            model.IsActive = attCalendar.is_active ?? false;
            model.Remarks = attCalendar.remarks ?? "";

            return model;
        }

    }
}
