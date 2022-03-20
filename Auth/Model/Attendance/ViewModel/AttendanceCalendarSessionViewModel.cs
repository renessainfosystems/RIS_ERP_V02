using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.ViewModel
{
    public class AttendanceCalendarSessionViewModel
    {
        public int AcsId { get; set; }
        public int AcsHolidayId { get; set; }
        public int HolidayId { get; set; }
        public int AttendanceCalendarId { get; set; }
        public string SessionName { get; set; }
        public string AttendanceCalendarName { get; set; }
        public DateTime SessionStartDate { get; set; }
        public DateTime SessionEndDate { get; set; }

        public string SessionStartDateStr { get; set; }
        public string SessionEndDateStr { get; set; }
        public bool IsActive { get; set; }
        public static AttendanceCalendarSessionViewModel ConvertToModelForAllSession(dynamic attCalendar)
        {

            var model = new AttendanceCalendarSessionViewModel();
            
            model.AcsId = attCalendar.acs_id;
            model.AttendanceCalendarId = attCalendar.attendance_calendar_id;
            model.SessionStartDate = attCalendar.session_start_date ?? "";
            model.SessionEndDate = attCalendar.session_end_date ?? "";
            model.SessionName = attCalendar.session_name ?? "";
            model.IsActive = attCalendar.is_active ?? false;

            model.AttendanceCalendarName = attCalendar.attendance_calendar_name;
            model.SessionStartDateStr = attCalendar.session_start_date_str??"";
            model.SessionEndDateStr = attCalendar.session_end_date_str ?? "";
            return model;


        }
        public static AttendanceCalendarSessionViewModel ConvertToModel(dynamic attCalendar)
        {

            var model = new AttendanceCalendarSessionViewModel();

            model.AcsId = attCalendar.acs_id;
            model.AttendanceCalendarId = attCalendar.attendance_calendar_id;
            model.SessionStartDate = attCalendar.session_start_date ?? "";
            model.SessionEndDate = attCalendar.session_end_date ?? "";
            model.SessionName = attCalendar.session_name ?? "";
            model.IsActive = attCalendar.is_active ?? false;


            return model;
        }
        
    }
}
