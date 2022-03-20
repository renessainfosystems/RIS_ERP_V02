using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class AttendanceCalendarSessionRepository:IAttendanceCalendarSessionRepository
    {
        protected AttendanceCalendarSessionDataAccess _attendanceCalendarSessionDataAccess { get; set; }

        //Data access initialize
        public AttendanceCalendarSessionRepository(AttendanceCalendarSessionDataAccess attendanceCalendarSessionDataAccess)
        {
            _attendanceCalendarSessionDataAccess = attendanceCalendarSessionDataAccess;
        }

        public async Task<dynamic> GetAllCalendarSessions()
        {
           return await _attendanceCalendarSessionDataAccess.GetAllAttendanceSessionCalendar();
        }

        public async Task<dynamic> GetCalendarHolidaySessionById(int acs_id)
        {
            return await _attendanceCalendarSessionDataAccess.GetCalendarHolidaySessionById(acs_id);
        }

        public async Task<dynamic> IUD_CalendarSession(AttendanceCalendarSession attendanceCalendarSession, int dbOperation)
        {
            return await _attendanceCalendarSessionDataAccess.IUD_AttendanceCalendarSession(attendanceCalendarSession, dbOperation);
        }
        public async Task<dynamic> GetAllHolidayByName(string holiday_name)
        {
            return await _attendanceCalendarSessionDataAccess.GetAllHolidayByName(holiday_name);
        }

        public async Task<dynamic> IUD_CalendarSessionHoliday(AttendanceCalendarSessionHoliday attendanceCalendarSessionHoliday, int dbOperation)
        {
            return await _attendanceCalendarSessionDataAccess.IUD_CalendarSessionHoliday(attendanceCalendarSessionHoliday, dbOperation);
        }
    }
}
