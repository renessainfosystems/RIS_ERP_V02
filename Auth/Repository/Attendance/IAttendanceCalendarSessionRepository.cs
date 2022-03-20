using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IAttendanceCalendarSessionRepository
    {
        Task<dynamic> GetAllCalendarSessions();
        Task<dynamic> GetCalendarHolidaySessionById(int acs_id);
        Task<dynamic> GetAllHolidayByName(string holiday_name);
        Task<dynamic> IUD_CalendarSession(AttendanceCalendarSession attendanceCalendarSession, int dbOperation);
        Task<dynamic> IUD_CalendarSessionHoliday(AttendanceCalendarSessionHoliday attendanceCalendarSessionHoliday, int dbOperation);
    }
}
